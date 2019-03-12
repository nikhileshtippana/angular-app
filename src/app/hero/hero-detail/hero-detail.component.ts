import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {

        this.heroService.getHero(id)
          .subscribe(hero => this.hero = hero);

    } else {
        this.hero = new Hero;
        this.hero.id = 0;
    }
  }

  isAdd(): boolean {
      return this.hero.id === 0;
  }

  save(): void {
    if (this.isAdd()) {
        this.heroService.addHero(this.hero)
          .subscribe(hero => this.hero = hero);
      this.goBack();
    } else {
        this.heroService.updateHero(this.hero)
          .subscribe(hero => this.hero = hero);
    }
  }

  delete(): void {
      this.heroService.deleteHero(this.hero.id)
          .subscribe(hero => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
