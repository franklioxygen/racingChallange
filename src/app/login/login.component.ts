import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { AppService } from "../app.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appService: AppService
  ) {}

  ngOnInit() {
    // if already logged in
    if (this.appService.username !== null) {
      this.router.navigate(["/members"]);
    }

    this.loginForm = this.formBuilder.group({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  login() {
    localStorage.setItem("username", this.loginForm.value.username);
    this.appService.setUsername(this.loginForm.value.username);
    this.router.navigate(["/members"]);
  }
}
