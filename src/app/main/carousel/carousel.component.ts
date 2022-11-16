import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../api.service";
import {IAnime} from '../../../interfaces/anime'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  animesList: IAnime[] | null = null

  constructor(private ApiService: ApiService) {
  }

  ngOnInit():
    void {
    this.ApiService.loadAnimes().subscribe(
      {
        next: (data) => this.animesList = data,
        error: (err) => console.log(err),
      }
    )
  }

}
