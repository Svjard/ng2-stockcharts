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
var utils_1 = require('../utils');
var types_1 = require('../types');
var chart_component_1 = require('../chart.component');
var axis_line_component_1 = require('./axis-line.component');
var axis_ticks_component_1 = require('./axis-ticks.component');
var AxisComponent = (function () {
    function AxisComponent(chart) {
        this.chart = chart;
        this.defaultClassName = 'ng2-stockcharts-axis ';
        this.showDomain = true;
        this.showTicks = true;
        this.fontFamily = 'Helvetica Neue, Helvetica, Arial, sans-serif';
        this.fontSize = 12;
    }
    AxisComponent.prototype.ngOnChanges = function () {
        this.finalTransform = "translate(" + this.transform[0] + ", " + this.transform[1] + ")";
        if (this.chart.chartCanvas.isChartHybrid() && utils_1.isDefined(this.chart.chartCanvas.getCanvases)) {
            this.drawOnCanvas(this);
        }
    };
    AxisComponent.prototype.setAxisClass = function () {
        return this.defaultClassName.concat(this.className || '');
    };
    AxisComponent.prototype.drawOnCanvas = function (component) {
        var contexts = component.chart.chartCanvas.getCanvases();
        if (contexts) {
            var _a = component.chart.getContext(), canvasOriginX = _a.canvasOriginX, canvasOriginY = _a.canvasOriginY;
            this._drawOnCanvas(component.chart.chartCanvas.margin, [canvasOriginX, canvasOriginY], component.chart.chartCanvas.getCanvases(), component.scale, component.scale);
        }
    };
    AxisComponent.prototype._drawOnCanvas = function (margin, canvasOrigin, ctx, xScale, yScale) {
        var _a = this, transform = _a.transform, showDomain = _a.showDomain, showTicks = _a.showTicks;
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.translate(canvasOrigin[0] + transform[0], canvasOrigin[1] + transform[1]);
        if (showDomain) {
            this.axisLine.drawOnCanvas(ctx);
        }
        if (showTicks) {
            this.axisTicks.drawOnCanvas(ctx, xScale, yScale);
        }
        ctx.restore();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AxisComponent.prototype, "className", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AxisComponent.prototype, "defaultClassName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AxisComponent.prototype, "transform", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisComponent.prototype, "orient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisComponent.prototype, "innerTickSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisComponent.prototype, "outerTickSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisComponent.prototype, "tickFormat", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisComponent.prototype, "tickPadding", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisComponent.prototype, "tickSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AxisComponent.prototype, "ticks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisComponent.prototype, "tickValues", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisComponent.prototype, "scale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AxisComponent.prototype, "showDomain", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AxisComponent.prototype, "showTicks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AxisComponent.prototype, "fontFamily", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisComponent.prototype, "fontSize", void 0);
    __decorate([
        core_1.ViewChild(axis_ticks_component_1.AxisTicksComponent), 
        __metadata('design:type', axis_ticks_component_1.AxisTicksComponent)
    ], AxisComponent.prototype, "axisTicks", void 0);
    __decorate([
        core_1.ViewChild(axis_line_component_1.AxisLineComponent), 
        __metadata('design:type', axis_line_component_1.AxisLineComponent)
    ], AxisComponent.prototype, "axisLine", void 0);
    AxisComponent = __decorate([
        core_1.Component({
            selector: 'ng-axis',
            template: "\n    <svg:g *ngIf=\"!chartCanvas.isChartHybrid()\" [ngClass]=\"setAxisClass()\" [attr.transform]=\"finalTransform\">\n      <ng-axis-tick #axisTicks *ngIf=\"showTicks\"></ng-axis-tick>\n      <ng-axis-line #axisLine *ngIf=\"showDomain\"></ng-axis-line>\n    </svg:g>\n  ",
            directives: [axis_line_component_1.AxisLineComponent, axis_ticks_component_1.AxisTicksComponent]
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [chart_component_1.ChartComponent])
    ], AxisComponent);
    return AxisComponent;
}());
exports.AxisComponent = AxisComponent;
//# sourceMappingURL=axis.component.js.map