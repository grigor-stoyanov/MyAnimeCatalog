import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IAnime} from "../../../interfaces";
import {LoaderService} from "../../../shared/loader.service";

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.scss']
})
export class AnimeDetailsComponent implements OnInit {
  anime!: IAnime;

  constructor(private activatedRoute: ActivatedRoute, router: Router, private loaderService: LoaderService) {
    this.loaderService.hideLoader()
    this.anime = this.activatedRoute.snapshot.data['anime']
    if (!this.anime) {
      router.navigate(['error'])
    }

  }


  ngOnInit(): void {
  }

}
