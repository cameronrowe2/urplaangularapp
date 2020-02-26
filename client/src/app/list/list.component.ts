import { Component, OnInit } from "@angular/core";
import { HeroService } from "../common/services/hero.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  heroes: any;
  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(data => {
      this.heroes = data;
      console.log(this.heroes);
    });
  }
}
