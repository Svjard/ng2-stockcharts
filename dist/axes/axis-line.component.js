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
var core_1 = require('@angular/core');
var utils_1 = require('../utils');
var types_1 = require('../types');
var AxisLineComponent = (function () {
    function AxisLineComponent() {
        this.className = 'ng2-stockcharts-axis-line';
        this.shapeRendering = 'crispEdges';
        this.outerTickSize = 0;
        this.fill = 'none';
        this.stroke = '#000000';
        this.strokeWidth = 1;
        this.opacity = 1;
    }
    AxisLineComponent.prototype.ngOnChanges = function () {
        this.sign = this.orient === types_1.Orientation.TOP || this.orient === types_1.Orientation.LEFT ? -1 : 1;
        if (this.orient === types_1.Orientation.BOTTOM || this.orient === types_1.Orientation.TOP) {
            this.d = "M" + this.range[0] + "," + this.sign * this.outerTickSize + "V0H" + this.range[1] + "V" + this.sign * this.outerTickSize;
        }
        else {
            this.d = "M" + this.sign * this.outerTickSize + "," + this.range[0] + "H0V" + this.range[1] + "H" + this.sign * this.outerTickSize;
        }
    };
    AxisLineComponent.prototype.setPathClass = function () {
        return this.className || '';
    };
    AxisLineComponent.prototype.drawOnCanvas = function (ctx) {
        var sign = this.orient === types_1.Orientation.TOP || this.orient === types_1.Orientation.LEFT ? -1 : 1;
        var xAxis = (this.orient === types_1.Orientation.BOTTOM || this.orient === types_1.Orientation.TOP);
        ctx.lineWidth = this.strokeWidth;
        ctx.strokeStyle = utils_1.hexToRGBA(this.stroke, this.opacity);
        ctx.beginPath();
        if (xAxis) {
            ctx.moveTo(this.range[0], sign * this.outerTickSize);
            ctx.lineTo(this.range[0], 0);
            ctx.lineTo(this.range[1], 0);
            ctx.lineTo(this.range[1], sign * this.outerTickSize);
        }
        else {
            ctx.moveTo(sign * this.outerTickSize, this.range[0]);
            ctx.lineTo(0, this.range[0]);
            ctx.lineTo(0, this.range[1]);
            ctx.lineTo(sign * this.outerTickSize, this.range[1]);
        }
        ctx.stroke();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AxisLineComponent.prototype, "className", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AxisLineComponent.prototype, "shapeRendering", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisLineComponent.prototype, "orient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisLineComponent.prototype, "outerTickSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AxisLineComponent.prototype, "fill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AxisLineComponent.prototype, "stroke", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisLineComponent.prototype, "strokeWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisLineComponent.prototype, "opacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AxisLineComponent.prototype, "range", void 0);
    AxisLineComponent = __decorate([
        core_1.Component({
            selector: 'ng-axis-line',
            template: "\n    <svg:path\n      [ngClass]=\"setPathClass()\"\n      [attr.shape-rendering]=\"shapeRendering\"\n      [attr.d]=\"d\"\n      [attr.fill]=\"fill\"\n      [attr.opacity]=\"opacity\"\n      [attr.stroke]=\"stroke\"\n      [attr.stroke-width]=\"strokeWidth\">\n    </svg:path>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AxisLineComponent);
    return AxisLineComponent;
}());
exports.AxisLineComponent = AxisLineComponent;
;
//# sourceMappingURL=axis-line.component.js.map