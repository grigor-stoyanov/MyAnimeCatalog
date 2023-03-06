import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ApiService} from "../../../services/fetch/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LocalService} from "../../../services/storage/local-storage.service";
import {IReview} from "../../../interfaces";
import {data} from "jquery";

const InlineEditor = require('@ckeditor/ckeditor5-build-inline')


@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewReviewComponent implements OnInit {
  Editor = InlineEditor
  public model = {
    editorData: ''
  };
  error: string | undefined;

  @Input() postsList!: IReview[];

  postHandler(form: NgForm) {
    const auth = this.localService.getData('auth') 
    if (!auth) {
      return
    }
    let id = this.activatedRoute.snapshot.params['id']
    id = parseInt(id)
    const {content} = form.value
    this.apiService.postReview(content, auth.username,auth.tag, id)
      .subscribe({
          next: (value) => this.postsList.unshift(value),
          error: (err) => this.error = err
        }
      )
  }

  constructor(private apiService: ApiService,
              private activatedRoute: ActivatedRoute,
              private localService: LocalService
  ) {
  }

  ngOnInit(): void {
  }

}
