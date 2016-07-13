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
var types_1 = require('../types');
var chart_component_1 = require('../chart.component');
var chart_canvas_component_1 = require('../chart-canvas.component');
var XAxis = (function () {
    function XAxis(chartCanvas, chart) {
        this.chartCanvas = chartCanvas;
        this.chart = chart;
        this.ticks = 10;
        this.showTicks = true;
        this.showGrid = false;
        this.className = 'ng2-stockcharts-xaxis';
    }
    XAxis.prototype.ngOnChanges = function () {
        var axisLocation = this.axisAt;
        if (this.axisAt === types_1.XAxisAlignment.TOP) {
            axisLocation = 0;
        }
        else if (this.axisAt === types_1.XAxisAlignment.BOTTOM) {
            axisLocation = this.chart.height;
        }
        else if (this.axisAt === types_1.XAxisAlignment.MIDDLE) {
            axisLocation = (this.chart.height) / 2;
        }
        this.range = [0, this.chart.width];
        this.transform = [0, axisLocation];
        if (this.tickFormat && this.chartCanvas.xScale.isPolyLinear && this.chartCanvas.xScale.isPolyLinear()) {
            console.warn('Cannot set tickFormat on a poly linear scale, ignoring tickFormat on XAxis');
            this.tickFormat = undefined;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "axisAt", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], XAxis.prototype, "orient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], XAxis.prototype, "innerTickSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], XAxis.prototype, "outerTickSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "tickFormat", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], XAxis.prototype, "tickPadding", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], XAxis.prototype, "tickSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], XAxis.prototype, "ticks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], XAxis.prototype, "tickValues", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], XAxis.prototype, "showTicks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], XAxis.prototype, "showGrid", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], XAxis.prototype, "className", void 0);
    XAxis = __decorate([
        core_1.Component({
            selector: 'ng-xaxis',
            template: "\n    <ng-axis\n      [className]=\"className\"\n      [range]=\"range\"\n      [transform]=\"transform\"\n      [showTicks]=\"showTicks\" [tickFormat]=\"tickFormat\" [ticks]=\"[ticks]\"\n      [scale]=\"chartCanvas.xScale\"></ng-axis>"
        }),
        __param(0, core_1.Host()),
        __param(1, core_1.Host()), 
        __metadata('design:paramtypes', [chart_canvas_component_1.ChartCanvasComponent, chart_component_1.ChartComponent])
    ], XAxis);
    return XAxis;
}());
exports.XAxis = XAxis;
;
//# sourceMappingURL=xaxis.component.js.map