import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getSearchValue } from '../+store/selectors';
import { setSearchValue } from '../+store/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 

  constructor() { }

  ngOnInit(): void {
    
  }

}
