import { animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, style } from '@angular/animations';
import { AfterContentInit, Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Directive({
  selector: '[SlideInOut]',
})
export class SlideInOutDirectiveDirective {
  @Output() destroyed = new EventEmitter<boolean>()
  @Input()
  set hidden(hidden: boolean) {
    const metadata = hidden ? this.slideIn() : this.slideOut();
    const factory = this.builder.build(metadata);
    const player = factory.create(this.el.nativeElement);
    player.play();
    if(!hidden){
      this.destroyed.emit(false)
    }
  }



  constructor(private builder: AnimationBuilder, private el: ElementRef) {
  }

  private slideIn(): AnimationMetadata[] {
    return [
      style({ opacity: 0, transform: 'translateY(-100px)' }),
      animate('400ms ease-in', style({ opacity: 1, transform: 'none' })),
    ];
  }

  private slideOut(): AnimationMetadata[] {
    return [
      style({ opacity: '*', transform: 'none' }),
      animate('400ms ease-in', style({ opacity: 0, transform: 'translateY(-100px)' })),
    ];
  }
}