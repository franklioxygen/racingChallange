import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AppService {
  api: string;
  username: string;
  DEBUG: Boolean = true;
  members = [];

  constructor(private http: HttpClient) {
    if (this.DEBUG) {
      this.api = "http://localhost:3000";
    } else {
      this.api = "http://localhost:8000/api";
    }
  }

  // Returns all members
  getMembers() {
    return this.http
      .get(`${this.api}/members`)
      .pipe(catchError(this.handleError));
  }
  getMemberDetails(id: Number) {
    return this.http
      .get(`${this.api}/members/` + id)
      .pipe(catchError(this.handleError));
  }

  setUsername(name: string): void {
    this.username = name;
  }

  addMember(memberForm) {
    return this.http
      .post(`${this.api}/members`, memberForm)
      .pipe(catchError(this.handleError));
  }

  getTeams() {
    return this.http
      .get(`${this.api}/teams`)
      .pipe(catchError(this.handleError));
  }

  removeMember(id: number) {
    return this.http.delete(`${this.api}/members/` + id);
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
