"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var chart_canvas_component_1 = require('./chart-canvas.component');
var types_1 = require('./types');
;
var CanvasContainerComponent = (function () {
    function CanvasContainerComponent(chartCanvas) {
        this.chartCanvas = chartCanvas;
        this.type = types_1.ChartType.SVG;
    }
    CanvasContainerComponent.prototype.getCanvasContexts = function () {
        if (!this.chartCanvas.isChartHybrid()) {
            return;
        }
        return {
            axes: this.canvas_axes.nativeElement.getContext('2d'),
            mouseCoord: this.canvas_mouse_coordinates.nativeElement.getContext('2d'),
            interactive: this.canvas_interactive.nativeElement.getContext('2d'),
            bg: this.bg.nativeElement.getContext('2d')
        };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CanvasContainerComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CanvasContainerComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CanvasContainerComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CanvasContainerComponent.prototype, "zIndex", void 0);
    __decorate([
        core_1.ViewChild('bg'), 
        __metadata('design:type', core_1.ElementRef)
    ], CanvasContainerComponent.prototype, "bg", void 0);
    __decorate([
        core_1.ViewChild('canvas_axes'), 
        __metadata('design:type', core_1.ElementRef)
    ], CanvasContainerComponent.prototype, "canvas_axes", void 0);
    __decorate([
        core_1.ViewChild('canvas_mouse_coordinates'), 
        __metadata('design:type', core_1.ElementRef)
    ], CanvasContainerComponent.prototype, "canvas_mouse_coordinates", void 0);
    __decorate([
        core_1.ViewChild('canvas_interactive'), 
        __metadata('design:type', core_1.ElementRef)
    ], CanvasContainerComponent.prototype, "canvas_interactive", void 0);
    CanvasContainerComponent = __decorate([
        core_1.Component({
            selector: 'ng-canvas-container',
            template: "\n    <div *ngIf=\"chartCanvas.isChartHybrid()\">\n      <canvas #bg class=\"ng2-stockcharts-canvas\" [attr.width]=\"width\" [attr.height]=\"height\"></canvas>\n      <canvas #canvas_axes class=\"ng2-stockcharts-canvas\" [attr.width]=\"width\" [attr.height]=\"height\"></canvas>\n      <canvas #canvas_mouse_coordinates class=\"ng2-stockcharts-canvas\" [attr.width]=\"width\" [attr.height]=\"height\"></canvas>\n      <canvas #canvas_interactive class=\"ng2-stockcharts-canvas\" [attr.width]=\"width\" [attr.height]=\"height\"></canvas>\n    </div>\n  ",
            styles: ["\n    .ng2-stockcharts-canvas {\n      position: absolute;\n      top: 0;\n      left: 0;\n    }\n  "]
        }),
        __param(0, core_1.Host()),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return chart_canvas_component_1.ChartCanvasComponent; }))), 
        __metadata('design:paramtypes', [chart_canvas_component_1.ChartCanvasComponent])
    ], CanvasContainerComponent);
    return CanvasContainerComponent;
}());
exports.CanvasContainerComponent = CanvasContainerComponent;
;
//# sourceMappingURL=canvas-container.component.js.map