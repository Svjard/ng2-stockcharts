import {Component, AfterViewInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {BasicExampleComponent} from './basic-example-component';

const hljs = require('highlight.js');
require('highlight.js/styles/github-gist.css');
require('./style.scss');

@Component({
  selector: 'demo-app',
  template: require('./demo-app.html'),
  directives: [NgClass, BasicExampleComponent]
})
class DemoAppComponent implements AfterViewInit {

  basicCodeT: string = require('./basic-example-component.html');
  basicCodeC: string = require('!raw!./basic-example-component.ts');
  selectedTab = 'basic';
  basicTab = 'html';

  ngAfterViewInit() {
    this.highlight();
  }

  /**
   * Run highlight.js, giving time for DOM to update.
   */
  private highlight() {
    setTimeout(() => hljs.initHighlighting());
  }
}

bootstrap(DemoAppComponent);
