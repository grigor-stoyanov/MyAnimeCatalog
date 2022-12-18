import {Component, Input, OnInit} from '@angular/core';
import {IComment} from "../../../interfaces/comment";

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit {
  @Input() comments!:IComment[]|undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
