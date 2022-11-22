import {Component, HostListener, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {SideScrollService} from "../../../services/side-scroll.service";
import {IAnime} from '../../../../interfaces/anime';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  animesList: IAnime[] | null = null;
  scrollX$?: Observable<number>;
  isScrolling: boolean = false;
  scrollPosition: number = 0;
  maxScrollWidth: number = 0;
  page: number = 1;
  isLoading: boolean = true;

  getXPosition(e: Event): number {
    return (e.target as Element).scrollLeft;
  }

  getMaxScrollWidth(element: HTMLDivElement): number {
    return element.scrollWidth - element.offsetWidth
  }

  @HostListener('scroll ', ['$event'])
  onScroll(e: Event): void {
    e.stopPropagation()
    this.SideScrollService.updateScroll(this.getXPosition(e))
    this.scrollX$?.subscribe((value) => {

      this.maxScrollWidth = this.getMaxScrollWidth(<HTMLDivElement>e.target);
      this.scrollPosition = (value / this.maxScrollWidth) * 100;

      this.isScrolling = (value >= 5);

      if (this.scrollPosition >= 95 && this.isLoading) {
        this.isLoading = false;
        this.loadOnScroll()
      }
    })

  }

  loadOnScroll() {
    this.page++;
    this.ApiService.loadAnimes(this.page).subscribe({
      next: (data) =>{ this.animesList?.push(...data);this.isLoading=true},
      error: (err) => console.log(err)
    })
  }


  constructor(private ApiService: ApiService,
              private SideScrollService: SideScrollService) {
    this.scrollX$ = this.SideScrollService.scrollX$;
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
