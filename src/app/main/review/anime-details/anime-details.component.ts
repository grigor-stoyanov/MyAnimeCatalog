import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IAnime} from "../../../interfaces";

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.scss']
})
export class AnimeDetailsComponent implements OnInit {
  anime?: IAnime;
  genres: string[] | undefined = [];

  constructor(private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      ({anime}) => {
        this.anime = anime;
        for (let value of this.anime?.genres?.values()!) {
          this.genres = this.anime?.genres
        }
      })
  }

}