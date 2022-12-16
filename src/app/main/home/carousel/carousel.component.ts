import {
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {SideScrollService} from "../../../services/side-scroll.service";
import {IAnime} from '../../../interfaces';
import {catchError, EMPTY, Observable, of, Subscription} from 'rxjs';
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  animesList: IAnime[] | null = [];
  scrollX$?: Observable<number>;
  isScrollingRight: boolean = false;
  isScrollingLeft: boolean = true;
  scrollPosition: number = 0;
  maxScrollWidth: number = 0;
  page: number = 1;
  isLoading: boolean | null = true;
  detailsBtnClicked = true;
  mouseDown = false;
  startX!: number;
  scrollLeft!: number;
  bottomValue!: number;
  reachedBottom: boolean = false;

  startDragging(e: MouseEvent, flag: boolean, el: HTMLDivElement) {
    this.mouseDown = true;
    this.startX = e.pageX - el.offsetLeft;
    this.scrollLeft = el.scrollLeft;
  }

  stopDragging(e: MouseEvent, flag: boolean) {
    this.mouseDown = false;
  }

  moveEvent(e: MouseEvent, el: HTMLDivElement) {
    e.preventDefault();
    if (!this.mouseDown) {
      return;
    }
    const x = e.pageX - el.offsetLeft;
    const scroll = x - this.startX;
    el.scrollLeft = this.scrollLeft - scroll;
  }


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

      this.isScrollingRight = value >= 5;

      if (this.reachedBottom) {
        this.isScrollingLeft = value <= this.bottomValue - 15;
      }

      if (this.scrollPosition >= 95 && this.isLoading) {
        this.isLoading = false;
        this.loadOnScroll(value);
      }
    })
  }


  loadOnScroll(scrollValue: number) {
    this.page++;
    this.ApiService.loadAnimes(this.page)
      // .pipe(catchError(() => EMPTY))
      .subscribe({
        next: (data) => {
          this.animesList?.push(...data);
          this.isLoading = true;
        },
        error: () => {
          this.isLoading = null;
          this.reachedBottom = true;
          this.isScrollingLeft = false;
          this.bottomValue = scrollValue;
        }
      })
  }


  set detailsBtnClickedSetter(buttonClicked: boolean) {
    this.detailsBtnClicked = buttonClicked;
  }

  constructor(private ApiService: ApiService,
              private SideScrollService: SideScrollService) {
    this.scrollX$ = this.SideScrollService.scrollX$;
  }

  // TODO Fix Spinner while Awaiting Initial Load Data
  ngOnInit():
    void {
    this.ApiService.loadAnimes().subscribe(
      {
        next: (data) => {
          this.animesList = data;
        },
        error: () => {
          this.isLoading = null;
          this.animesList = []
        },
        complete: () => this.isLoading = true
      }
    )

  }
}
