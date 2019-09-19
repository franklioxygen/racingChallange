import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.css"]
})
export class MembersComponent implements OnInit {
  members = [];

  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    if (this.appService.username === null) {
      this.router.navigate(["/login"]);
    }
    this.appService.getMembers().subscribe(members => (this.members = members));
  }

  addMember() {
    this.router.navigate(["/member-details"]);
  }

  editMember(id: number) {
    this.router.navigate(["/member-details/", id]);
  }

  removeMemberById(id: number) {
    var members = this.members;
    this.appService.removeMember(id).subscribe(data => {
      if (data == 1) {
        for (var i = 0; i <= members.length; i++) {
          if (members[i]._id == id) {
            members.splice(i, 1);
          }
        }
      }
      this.appService
        .getMembers()
        .subscribe(members => (this.members = members));
      this.router.navigate(["/members"]);
    });
  }
}
