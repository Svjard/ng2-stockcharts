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
var types_1 = require('../types');
var utils_1 = require('../utils');
function tickTransform_svg_axisX(scale, tick) {
    return [~~(0.5 + scale(tick)), 0];
}
function tickTransform_svg_axisY(scale, tick) {
    return [0, ~~(0.5 + scale(tick))];
}
var AxisTickComponent = (function () {
    function AxisTickComponent() {
        this.defaultClassName = 'ng2-stockcharts-axis-tick ';
    }
    AxisTickComponent.prototype.ngOnChanges = function () {
        this.finalTransform = "translate(" + this.transform[0] + ", " + this.transform[1] + ")";
    };
    AxisTickComponent.prototype.setTickClass = function () {
        return this.defaultClassName.concat(this.className || '');
    };
    AxisTickComponent.prototype.drawOnCanvas = function (ctx, result) {
        var scale = result.scale, tickTransform = result.tickTransform, canvas_dy = result.canvas_dy, x = result.x, y = result.y, x2 = result.x2, y2 = result.y2, format = result.format;
        var origin = tickTransform(scale, this);
        ctx.beginPath();
        ctx.moveTo(origin[0], origin[1]);
        ctx.lineTo(origin[0] + x2, origin[1] + y2);
        ctx.stroke();
        ctx.fillText(format(this), origin[0] + x, origin[1] + y + canvas_dy);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AxisTickComponent.prototype, "className", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AxisTickComponent.prototype, "defaultClassName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AxisTickComponent.prototype, "transform", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AxisTickComponent.prototype, "tickStroke", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisTickComponent.prototype, "tickStrokeOpacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AxisTickComponent.prototype, "textAnchor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisTickComponent.prototype, "fontSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AxisTickComponent.prototype, "fontFamily", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisTickComponent.prototype, "x", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisTickComponent.prototype, "y", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisTickComponent.prototype, "x2", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisTickComponent.prototype, "y2", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AxisTickComponent.prototype, "dy", void 0);
    AxisTickComponent = __decorate([
        core_1.Component({
            selector: 'ng-axis-tick',
            template: "\n    <svg:g [ngClass]=\"setTickClass()\" [attr.transform]=\"finalTransform\">\n      <svg:line shape-rendering=\"crispEdges\" [attr.opacity]=\"tickStrokeOpacity\" [attr.stroke]=\"tickStroke\" [attr.x2]=\"x2\" [attr.y2]=\"y2\" />\n      <svg:text\n        [attr.dy]=\"dy\" [attr.x]=\"x\" [attr.y]=\"y\"\n        [attr.fill]=\"tickStroke\"\n        [attr.font-size]=\"fontSize\"\n        [attr.font-family]=\"fontFamily\"\n        [attr.text-anchor]=\"textAnchor\">\n        <ng-content></ng-content>\n      </svg:text>\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AxisTickComponent);
    return AxisTickComponent;
}());
exports.AxisTickComponent = AxisTickComponent;
var AxisTicksComponent = (function () {
    function AxisTicksComponent() {
        this.innerTickSize = 5;
        this.tickPadding = 6;
        this.ticks = [10];
        this.tickStroke = '#000000';
        this.tickStrokeOpacity = 1;
    }
    AxisTicksComponent.prototype.ngOnChanges = function () {
        this.result = this.process();
    };
    AxisTicksComponent.prototype.drawOnCanvas = function (ctx, xScale, yScale) {
        var xAxis = (this.orient === types_1.Orientation.BOTTOM || this.orient === types_1.Orientation.TOP);
        var result = this.process(xAxis ? xScale : yScale);
        var tickStroke = result.tickStroke, tickStrokeOpacity = result.tickStrokeOpacity, textAnchor = result.textAnchor, fontSize = result.fontSize, fontFamily = result.fontFamily;
        ctx.strokeStyle = utils_1.hexToRGBA(this.tickStroke, this.tickStrokeOpacity);
        ctx.font = this.fontSize + "px " + this.fontFamily;
        ctx.fillStyle = this.tickStroke;
        ctx.textAlign = result.textAnchor === 'middle' ? 'center' : result.textAnchor;
        result.ticks.forEach(function (tick) {
            tick.drawOnCanvas(ctx, result);
        });
    };
    AxisTicksComponent.prototype.process = function (_scale) {
        var _this = this;
        var scale = _scale ? _scale : this.scale;
        var ticks = utils_1.isNotDefined(this.tickValues)
            ? (scale.ticks
                ? scale.ticks.apply(scale, this.ticks)
                : scale.domain())
            : this.tickValues;
        var baseFormat = scale.tickFormat
            ? scale.tickFormat.apply(scale, this.ticks)
            : utils_1.identity;
        var format = utils_1.isNotDefined(this.tickFormat)
            ? baseFormat
            : function (d) { return baseFormat(d) ? _this.tickFormat(d) : ''; };
        var sign = this.orient === types_1.Orientation.TOP || this.orient === types_1.Orientation.LEFT ? -1 : 1;
        var tickSpacing = Math.max(this.innerTickSize, 0) + this.tickPadding;
        var tickTransform;
        var x;
        var y;
        var x2;
        var y2;
        var dy;
        var canvas_dy;
        var textAnchor;
        if (this.orient === types_1.Orientation.BOTTOM || this.orient === types_1.Orientation.TOP) {
            tickTransform = tickTransform_svg_axisX;
            x2 = 0;
            y2 = sign * this.innerTickSize;
            x = 0;
            y = sign * tickSpacing;
            dy = sign < 0 ? '0em' : '.71em';
            canvas_dy = sign < 0 ? 0 : (this.fontSize * .71);
            textAnchor = 'middle';
        }
        else {
            tickTransform = tickTransform_svg_axisY;
            x2 = sign * this.innerTickSize;
            y2 = 0;
            x = sign * tickSpacing;
            y = 0;
            dy = '.32em';
            canvas_dy = (this.fontSize * .32);
            textAnchor = sign < 0 ? 'end' : 'start';
        }
        return { ticks: ticks, scale: scale, tickTransform: tickTransform, tickStroke: this.tickStroke, tickStrokeOpacity: this.tickStrokeOpacity, dy: dy, canvas_dy: canvas_dy, x: x, y: y, x2: x2, y2: y2, textAnchor: textAnchor, fontSize: this.fontSize, fontFamily: this.fontFamily, format: format };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisTicksComponent.prototype, "orient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisTicksComponent.prototype, "innerTickSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisTicksComponent.prototype, "tickFormat", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisTicksComponent.prototype, "tickPadding", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AxisTicksComponent.prototype, "ticks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisTicksComponent.prototype, "tickValues", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisTicksComponent.prototype, "scale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AxisTicksComponent.prototype, "tickStroke", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisTicksComponent.prototype, "tickStrokeOpacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AxisTicksComponent.prototype, "fontSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AxisTicksComponent.prototype, "fontFamily", void 0);
    AxisTicksComponent = __decorate([
        core_1.Component({
            selector: 'ng-axis-ticks',
            template: "\n    <svg:g>\n      <ng-axis-tick *ngFor=\"let tick of ticks\" [transform]=\"result.tickTransform(scale, tick)\"\n        [tickStroke]=\"tickStroke\" [tickStrokeOpacity]=\"tickStrokeOpacity\"\n        [dy]=\"result.dy\" [x]=\"result.x\" [y]=\"result.y\"\n        [x2]=\"result.x2\" [y2]=\"result.y2\" [textAnchor]=\"textAnchor\"\n        [fontSize]=\"fontSize\" [fontFamily]=\"fontFamily\">{{result.format(tick)}}</ng-axis-tick>\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AxisTicksComponent);
    return AxisTicksComponent;
}());
exports.AxisTicksComponent = AxisTicksComponent;
;
//# sourceMappingURL=axis-ticks.component.js.map