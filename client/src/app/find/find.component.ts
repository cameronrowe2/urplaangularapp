import { Component, OnInit } from "@angular/core";
import { HeroService } from "../common/services/hero.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-find",
  templateUrl: "./find.component.html",
  styleUrls: ["./find.component.scss"]
})
export class FindComponent implements OnInit {
  character: any = {};
  constructor(
    private heroService: HeroService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.heroService.getHeroById(params.id).subscribe(data => {
        this.character = data;
        console.log(this.character);
      });
    });
  }
}
