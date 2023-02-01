// Angular Imports
import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/interfaces/hero';

// Data imports
import { HeroService } from 'src/app/services/hero.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent  implements OnInit{

  heroes: Hero[] = [];
 
  constructor(private heroService: HeroService, private messageService: MessagesService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {

    // getHeroes returns a observable stream to which we then have to call the subscribe method.
    // The subscribe method then takes a callback function inside which the param will be the data which is then  
    // assigned to heroes
    this.heroService.getHeroes().subscribe(hereos => this.heroes = hereos);
  }

  add(name: string): void {
    name = name.trim();

    if(!name) return;

    this
      .heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this
      .heroService
      .deleteHero(hero)
      .subscribe();
  }
}
