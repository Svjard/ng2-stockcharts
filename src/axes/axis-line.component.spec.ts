import { Component, ViewChild } from '@angular/core';
import {
  describe,
  expect,
  beforeEachProviders,
  beforeEach,
  inject,
  it
} from '@angular/core/testing';
import {
  dispatchEvent
} from '@angular/platform-browser/testing';
import {
  ComponentFixture,
  TestComponentBuilder
} from '@angular/compiler/testing';
import {
  AxisLineComponent
} from './axis-line.component';
import { Orientation } from '../utils';
import * as d3 from 'd3';

@Component({
  template: `
  <ng-axis-line
    [className]="className"
    [orient]="orient"
    [outerTickSize]="outerTickSize"
    [strokeWidth]="strokeWidth"
    [opacity]="opacity"
    [range]="range">
  </ng-axis-line>`,
  directives: [AxisLineComponent]
})
export class TestComponent {
  className: string = 'custom-axis-line';
  orient: Orientation = Orientation.BOTTOM;
  outerTickSize: number = 2;
  strokeWidth: number = 1;
  opacity: number = 1;
  range: [number, number] = [0, 100];

  @ViewChild(AxisLineComponent) axisLine: AxisLineComponent;
}

describe('AxisLineComponent:', () => {
  let tcb;

  beforeEachProviders(() => [
    TestComponentBuilder,
    TestComponent
  ]);

  beforeEach(inject([TestComponentBuilder], _tcb => {
    tcb = _tcb;
  }));

  it('should display the correct defaults', done => {
    tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let element: any = fixture.nativeElement;

        fixture.detectChanges();

        expect(element.querySelectorAll('path').length).toBe(1);
        
        let p = element.querySelectorAll('path')[0];
        expect(p.classList).toContain('custom-axis-line');
        expect(p.getAttribute('stroke-width')).toBe('1');
        expect(p.getAttribute('shape-rendering')).toBe('crispEdges');
        expect(p.getAttribute('fill')).toBe('none');
        expect(p.getAttribute('stroke')).toBe('#000000');
        expect(p.getAttribute('opacity')).toBe('1');
        expect(p.getAttribute('d')).toBe('M0,2V0H100V2');

        let axisLine: any = fixture.componentInstance.axisLine;
        expect(axisLine.sign).toBe(1);
        expect(axisLine.d).toBe('M0,2V0H100V2');

        done();
      });
  });

  it('should handle top orientation', done => {
    tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        fixture.detectChanges();

        let component: any = fixture.componentInstance;
        component.orient = Orientation.TOP;

        fixture.detectChanges();

        let element: any = fixture.nativeElement;

        expect(element.querySelectorAll('path').length).toBe(1);
        
        let p = element.querySelectorAll('path')[0];
        expect(p.getAttribute('d')).toBe('M0,-2V0H100V-2');

        let axisLine: any = fixture.componentInstance.axisLine;
        expect(axisLine.sign).toBe(-1);
        expect(axisLine.d).toBe('M0,-2V0H100V-2');

        done();
      });
  });

  it('should handle left orientation', done => {
    tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        fixture.detectChanges();

        let component: any = fixture.componentInstance;
        component.orient = Orientation.LEFT;

        fixture.detectChanges();

        let element: any = fixture.nativeElement;

        expect(element.querySelectorAll('path').length).toBe(1);
        
        let p = element.querySelectorAll('path')[0];
        expect(p.getAttribute('d')).toBe('M-2,0H0V100H-2');

        let axisLine: any = fixture.componentInstance.axisLine;
        expect(axisLine.sign).toBe(-1);
        expect(axisLine.d).toBe('M-2,0H0V100H-2');

        done();
      });
  });

  it('should handle right orientation', done => {
    tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        fixture.detectChanges();

        let component: any = fixture.componentInstance;
        component.orient = Orientation.RIGHT;

        fixture.detectChanges();

        let element: any = fixture.nativeElement;

        expect(element.querySelectorAll('path').length).toBe(1);
        
        let p = element.querySelectorAll('path')[0];
        expect(p.getAttribute('d')).toBe('M2,0H0V100H2');

        let axisLine: any = fixture.componentInstance.axisLine;
        expect(axisLine.sign).toBe(1);
        expect(axisLine.d).toBe('M2,0H0V100H2');

        done();
      });
  });

  it('should throw an error is the range is invalid', done => {
    done();
  });
});
