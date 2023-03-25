import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ApiService } from "../../../services/fetch/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LocalService } from "../../../services/storage/local-storage.service";
import { IReview } from "../../../interfaces";
import { data } from "jquery";
import { trigger, transition, style, stagger, animate, query, animateChild } from "@angular/animations"
const InlineEditor = require('@ckeditor/ckeditor5-build-inline')


@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewReviewComponent implements OnInit {
  hidden = false;
  destroy = false;
  dropdownHandler(){
    this.hidden = !this.hidden
    this.destroy = true;
  }
  Editor = InlineEditor
  public model = {
    editorData: ''
  };
  error: string | undefined;

  @Input() postsList!: IReview[];

  postHandler(form: NgForm) {

    if (!this.hidden) {
      this.hidden = true;
      this.destroy = true;
      return
    }
    const auth = this.localService.getSessionOrLocalData('auth')
    if (!auth) {
      return
    }

    let id = this.activatedRoute.snapshot.params['id']
    id = parseInt(id)
    const { content } = form.value
    this.apiService.postReview(content, auth.username, auth.tag, id)
      .subscribe({
        next: (value) => { this.postsList.unshift(value); this.hidden = !this.hidden },
        error: (err) => { this.error = err; }
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
