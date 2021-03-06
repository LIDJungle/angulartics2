import {
  AfterContentInit,
  Directive,
  ElementRef,
  Injectable,
  Input,
  NgModule,
  Renderer2,
} from '@angular/core';
import { Angulartics2 } from './angulartics2';

@Injectable()
@Directive({ selector: '[angulartics2On]' })
export class Angulartics2On implements AfterContentInit {
  @Input('angulartics2On') angulartics2On: string;
  @Input() angularticsAction: string;
  @Input() angularticsCategory: string;
  @Input() angularticsLabel: string;
  @Input() angularticsValue: string;
  @Input() angularticsProperties: any = {};

  constructor(
    private elRef: ElementRef,
    private angulartics2: Angulartics2,
    private renderer: Renderer2
  ) { }

  ngAfterContentInit() {
    this.renderer.listen(
      this.elRef.nativeElement,
      'click',
      (event: Event) => this.eventTrack(event, 'mouse'),
    );
	this.renderer.listen(
      this.elRef.nativeElement,
      'keydown',
      (event: Event) => this.eventTrack(event, 'keyboard'),
    );
  }

  eventTrack(event: Event, string: eventSource) {
    const action = this.angularticsAction; // || this.inferEventName();
    const properties: any = {
      ...this.angularticsProperties,
      eventType: event.type,
	  dimension1: eventSource
    };

    if (this.angularticsCategory) {
      properties.category = this.angularticsCategory;
    }
    if (this.angularticsLabel) {
      properties.label = this.angularticsLabel;
    }
    if (this.angularticsValue) {
      properties.value = this.angularticsValue;
    }

    this.angulartics2.eventTrack.next({
      action,
      properties,
    });
  }

  /*private isCommand() {
    return ['a:', 'button:', 'button:button', 'button:submit', 'input:button', 'input:submit'].indexOf(
      getDOM().tagName(this.el).toLowerCase() + ':' + (getDOM().type(this.el) || '')) >= 0;
  }

  private inferEventName() {
    if (this.isCommand()) return getDOM().getText(this.el) || getDOM().getValue(this.el);
    return getDOM().getProperty(this.el, 'id') || getDOM().getProperty(this.el, 'name') || getDOM().tagName(this.el);
  }*/
}

@NgModule({
  declarations: [Angulartics2On],
  exports: [Angulartics2On],
})
export class Angulartics2OnModule {}
