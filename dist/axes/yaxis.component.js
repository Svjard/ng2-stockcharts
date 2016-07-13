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
var axis_component_1 = require('./axis.component');
var chart_component_1 = require('../chart.component');
var YAxis = (function () {
    function YAxis(chart) {
        this.chart = chart;
        this.ticks = 10;
        this.showTicks = true;
        this.showGrid = false;
        this.showDomain = false;
        this.className = 'ng2-stockcharts-yaxis';
    }
    YAxis.prototype.ngOnChanges = function () {
        this.yScale = (this.percentScale) ? this.chart.getYScale().domain([0, 1]) : this.chart.yScale;
        this.tickValues = this.tickValues || this.chart.yTicks;
        var axisLocation = this.axisAt;
        if (this.axisAt === types_1.YAxisAlignment.LEFT) {
            axisLocation = 0;
        }
        else if (this.axisAt === types_1.YAxisAlignment.RIGHT) {
            axisLocation = this.chart.width;
        }
        else if (this.axisAt === types_1.YAxisAlignment.MIDDLE) {
            axisLocation = (this.chart.width) / 2;
        }
        this.range = [0, this.chart.height];
        this.transform = [axisLocation, 0];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "axisAt", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], YAxis.prototype, "orient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], YAxis.prototype, "innerTickSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], YAxis.prototype, "outerTickSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "tickFormat", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], YAxis.prototype, "tickPadding", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], YAxis.prototype, "tickSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], YAxis.prototype, "ticks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], YAxis.prototype, "tickValues", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], YAxis.prototype, "percentScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], YAxis.prototype, "showTicks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], YAxis.prototype, "showGrid", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], YAxis.prototype, "showDomain", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], YAxis.prototype, "className", void 0);
    YAxis = __decorate([
        core_1.Component({
            selector: 'ng-yaxis',
            template: "\n    <ng-axis\n      [className]=\"className\"\n      [transform]=\"transform\"\n      [range]=\"range\"\n      [tickFormat]=\"tickFormat\" ticks=\"[ticks]\" tickValues=\"tickValues\"\n      [scale]=\"yScale\"></ng-axis>",
            directives: [axis_component_1.AxisComponent]
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [chart_component_1.ChartComponent])
    ], YAxis);
    return YAxis;
}());
exports.YAxis = YAxis;
//# sourceMappingURL=yaxis.component.js.map