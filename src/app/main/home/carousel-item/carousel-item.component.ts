import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {IAnime} from '../../../interfaces/anime'
import {LoaderService} from "../../../shared/loader.service";


@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent implements OnInit {
  @Input() anime?: IAnime | null;
  @Input() desc?: string | null;
  descToShow: string = '';
  btnDetails: boolean = true;
  card?: HTMLDivElement;
  @Output() moreDetailsClicked = new EventEmitter<boolean>()
  isLoading = this.loaderService.loader$

  constructor(public loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.descToShow = (this.desc) ? `${this.desc?.substring(0, 200)}...` : ''
  }

  showDescription() {
    this.descToShow = (this.desc) ? this.desc : ''
    this.btnDetails = false
    this.moreDetailsClicked.emit(this.btnDetails)
  }

  hideDescription() {
    this.descToShow = (this.desc) ? `${this.desc?.substring(0, 200)}...` : ''
    this.btnDetails = true
    this.moreDetailsClicked.emit(this.btnDetails)
  }
}
