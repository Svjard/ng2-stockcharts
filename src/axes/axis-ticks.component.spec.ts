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
  ComponentFixture,
  TestComponentBuilder
} from '@angular/compiler/testing';
import {
  AxisTickComponent, AxisTicksComponent
} from './axis-ticks.component';
import { Orientation } from '../utils';
import * as d3 from 'd3';

@Component({
  template: `
  <ng-axis-ticks
    [className]="className"
    [orient]="orient"
    [scale]="scale"
    [outerTickSize]="outerTickSize"
    [strokeWidth]="strokeWidth"
    [opacity]="opacity"
    [range]="range">
  </ng-axis-ticks>`,
  directives: [AxisTicksComponent]
})
export class TestComponent {
  className: string = 'custom-axis-line';
  orient: Orientation = Orientation.BOTTOM;
  scale: any = d3.scale.linear();
  outerTickSize: number = 2;
  strokeWidth: number = 1;
  opacity: number = 1;
  range: [number, number] = [0, 100];

  @ViewChild(AxisTicksComponent) axisTicks: AxisTicksComponent;
}

describe('AxisTicksComponent:', () => {
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

        done();
      });
  });

  it('should properly layout varying number of ticks', done => {
    done();
  });

  it('should handle custom tick format', done => {
    done();
  });

  it('should handle multi-tick format', done => {
    done();
  });

  it('should handle callback for tick format', done => {
    done();
  });

  it('should handle a time scale', done => {
    done();
  });

  it('should handle top orientation', done => {
    done();
  });

  it('should handle left orientation', done => {
    done();
  });

  it('should handle right orientation', done => {
    done();
  });

  it('should accept nice domain values with scale.nice', done => {
    done();
  });

  it('should handle an ordinal scale', done => {
    done();
  });

  it('should handle an identity scale', done => {
    done();
  });

  it('should handle a power scale', done => {
    done();
  });

  it('should handle a logarithmic  scale', done => {
    done();
  });

  it('should handle a quantize  scale', done => {
    done();
  });

  it('should handle a quantile  scale', done => {
    done();
  });

  it('should handle a threshold  scale', done => {
    done();
  });
});
