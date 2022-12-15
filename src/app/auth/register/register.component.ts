import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  changeName(ev: any) {
    try {
      ev.target.parentNode.dataset['text'] = ev.target.files[0].name
    } catch (err) {
      ev.target.parentNode.dataset['text'] = 'Upload Avatar (Optional)'
    }
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
