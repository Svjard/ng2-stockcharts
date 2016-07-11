import {Component} from '@angular/core';
import {NavbarComponent} from '../../src/ng2-navbar';

@Component({
  selector: 'basic-example',
  template: require('./basic-example-component.html'),
  directives: [NavbarComponent]
})
export class BasicExampleComponent {
  title: string = 'Well Operations Advisor';
}
