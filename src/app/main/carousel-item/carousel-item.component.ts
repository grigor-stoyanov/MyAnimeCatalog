import {Component, OnInit, Input} from '@angular/core';
import {IAnime} from '../../../interfaces/anime'


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

  constructor() {
  }

  ngOnInit(): void {
    this.descToShow = (this.desc) ? `${this.desc?.substring(0, 200)}...` : ''
  }

  showDescription() {
    this.descToShow = (this.desc) ? this.desc : ''
    this.btnDetails = false
  }

  hideDescription() {
    this.descToShow = (this.desc) ? `${this.desc?.substring(0, 200)}...` : ''
    this.btnDetails = true
  }
}
