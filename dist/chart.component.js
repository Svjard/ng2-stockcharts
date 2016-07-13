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
var d3 = require('d3');
var types_1 = require('./types');
var ChartComponent = (function () {
    function ChartComponent(chartCanvas) {
        this.chartCanvas = chartCanvas;
        this.id = 0;
        this.yScale = d3.scale.linear();
        this.flipYScale = false;
        this.padding = 0;
        this.yMousePointerRectWidth = 60;
        this.yMousePointerRectHeight = 20;
        this.transform = '';
        this.origin = [0, 0];
    }
    ChartComponent.prototype.getYScale = function () {
        return this.yScale.copy();
    };
    ChartComponent.prototype.getContext = function () {
        var chartId = this.id;
        var _a = this, width = _a.width, height = _a.height;
        var canvasOriginX = 0.5 + this.origin[0] + this.chartCanvas.margin.left;
        var canvasOriginY = 0.5 + this.origin[1] + this.chartCanvas.margin.top;
        return { chartId: chartId, canvasOriginX: canvasOriginX, canvasOriginY: canvasOriginY, width: width, height: height };
    };
    ChartComponent.prototype.ngOnChanges = function () {
        this.transform = "translate(" + this.origin[0] + ", " + this.origin[1] + ")";
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ChartComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ChartComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartComponent.prototype, "origin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartComponent.prototype, "yExtents", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartComponent.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ChartComponent.prototype, "yMousePointerDisplayLocation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartComponent.prototype, "yMousePointerDisplayFormat", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ChartComponent.prototype, "flipYScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartComponent.prototype, "padding", void 0);
    ChartComponent = __decorate([
        core_1.Component({
            selector: 'ng-chart',
            template: "\n    <g [attr.transform]=\"transform\">\n      <ng-content></ng-content>\n    </g>\n  ",
            styleUrls: ['./chart.component.css']
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [chart_canvas_component_1.ChartCanvasComponent])
    ], ChartComponent);
    return ChartComponent;
}());
exports.ChartComponent = ChartComponent;
//# sourceMappingURL=chart.component.js.map