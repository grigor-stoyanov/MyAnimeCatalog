import {Component, OnInit, ViewEncapsulation} from '@angular/core';

const InlineEditor = require('@ckeditor/ckeditor5-build-inline')


@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewReviewComponent implements OnInit {
  public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;
  Editor = InlineEditor
  public model = {
    editorData: '<p>Hello, world!</p>'
  };


  constructor() {
  }

  ngOnInit(): void {
  }

}
