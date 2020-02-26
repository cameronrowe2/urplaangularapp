import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class HeroService {
  constructor(private http: HttpClient) {}

  // Url that your server is running on
  private BASE_URL =
    "https://dmjl81r28i.execute-api.us-east-1.amazonaws.com/dev";

  getHeroes() {
    return this.http.get(this.BASE_URL + "/heroes");
  }

  getHeroById(id: string) {
    return this.http.get(this.BASE_URL + "/heroes/" + id);
  }
}
