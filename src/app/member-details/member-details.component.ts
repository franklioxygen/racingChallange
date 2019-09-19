import { Component, OnInit, OnChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppService } from "../app.service";
import { Router } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MembersComponent } from "src/app/members/members.component";
import { ActivatedRoute } from "@angular/router";
//
import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle
} from "@angular/router";
import { RouterModule } from "@angular/router";

// This interface may be useful in the times ahead...
interface Member {
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: "app-member-details",
  templateUrl: "./member-details.component.html",
  styleUrls: ["./member-details.component.css"]
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];
  //
  memberDetails = [];

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router,
    private _route: ActivatedRoute
  ) {
    this.memberForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      jobTitle: ["", Validators.required],
      team: ["", Validators.required],
      status: ["", Validators.required]
    });
  }

  ngOnInit() {
    // if not logged in
    if (this.appService.username === null) {
      this.router.navigate(["/login"]);
    }
    let id = parseInt(this._route.snapshot.paramMap.get("id"));
    if (id === NaN) {
      this.memberForm = this.formBuilder.group({
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        jobTitle: ["", Validators.required],
        team: ["", Validators.required],
        status: ["", Validators.required]
      });
    } else {
      // get member details
      this.appService
        .getMemberDetails(id)
        .subscribe(member => (this.memberDetails = member));
      console.log(this.memberDetails);
    }
    this.appService.getTeams().subscribe(teams => (this.teams = teams));
  }

  get formVal() {
    return this.memberForm.controls;
  }

  ngOnChanges() {}

  onSubmit(form: FormGroup) {
    // validata form
    this.submitted = true;
    if (this.memberForm.invalid) {
      return;
    }

    this.memberModel = form.value;
    this.appService.addMember(this.memberModel).subscribe(member => {
      this.appService.members.push(member);
      this.router.navigate(["/members/"]);
    });
  }
}
