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
  CanvasContainerComponent
} from './canvas-container.component';
import {
  ChartType
} from './utils';

@Component({
  template: `
  <ng-canvas-container
    [width]="width"
    [height]="height"
    [type]="type"
    [zindex]="zindex">
  </ng-canvas-container>`,
  directives: [CanvasContainerComponent]
})
export class TestComponent {
  width: number = 320;
  height: number = 320;
  type: ChartType = ChartType.SVG;
  zindex: number = 3;

  @ViewChild(CanvasContainerComponent) canvasContainer: CanvasContainerComponent;
}

describe('CanvasContainerComponent:', () => {
  let tcb;

  beforeEachProviders(() => [
    TestComponentBuilder,
    TestComponent
  ]);

  beforeEach(inject([TestComponentBuilder], _tcb => {
    tcb = _tcb;
  }));

  it('should display the correct default view', done => {
    tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let element: any = fixture.nativeElement;

        fixture.detectChanges();

        expect(element.querySelectorAll('canvas').length).toBe(0);
        let contextObj = fixture.componentInstance.canvasContainer.getCanvasContexts();
        expect(contextObj).toEqual(undefined);

        fixture.componentInstance.type = ChartType.HYBRID;

        fixture.detectChanges();

        let canvases = element.querySelectorAll('canvas');
        expect(canvases.length).toBe(4);
        for (let i of [0, 1, 2, 3]) {
          expect(canvases[i].width).toBe(320);
          expect(canvases[i].height).toBe(320);
        }

        done();
      });
  });

  it('should handle screen resize', done => {
    tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let element: any = fixture.nativeElement;

        fixture.detectChanges();

        fixture.componentInstance.type = ChartType.HYBRID;
        fixture.componentInstance.width = 600;
        fixture.componentInstance.height = 500;

        fixture.detectChanges();

        let canvases = element.querySelectorAll('canvas');
        expect(canvases.length).toBe(4);
        for (let i of [0, 1, 2, 3]) {
          expect(canvases[i].width).toBe(600);
          expect(canvases[i].height).toBe(500);
        }

        done();
      });
  });

  it('should provide each canvas context', done => {
    tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let element: any = fixture.nativeElement;

        fixture.componentInstance.type = ChartType.HYBRID;
        
        fixture.detectChanges();

        let contextObj = fixture.componentInstance.canvasContainer.getCanvasContexts();
        expect(Object.keys(contextObj).length).toBe(4);
        for (let key of Object.keys(contextObj)) {
          expect(contextObj[key]).not.toEqual(undefined);
        }

        done();
      });
  });
});
