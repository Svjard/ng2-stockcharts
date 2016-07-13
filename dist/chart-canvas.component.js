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
var types_1 = require('./types');
var utils_1 = require('./utils');
var evaluator_1 = require('./scale/evaluator');
var d3 = require('d3');
var canvas_container_component_1 = require('./canvas-container.component');
var SECOND = 1000;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAILY = 24 * HOUR;
var CANDIDATES_FOR_RESET = [
    'data',
    'calculator',
    'indexAccessor',
    'indexMutator',
    'map',
    'seriesName',
    'xExtents',
    'xScaleProvider',
];
function getDimensions(component) {
    return {
        height: component.height - component.margin.top - component.margin.bottom,
        width: component.width - component.margin.left - component.margin.right,
    };
}
var cursorStyle = "\n  .ng2-stockcharts-grabbing-cursor {\n    cursor: grabbing;\n    cursor: -moz-grabbing;\n    cursor: -webkit-grabbing;\n  }\n\n  .ng2-stockcharts-crosshair-cursor {\n    cursor: crosshair;\n  }\n\n  .ng2-stockcharts-tooltip-hover {\n    pointer-events: all;\n    cursor: pointer;\n  }";
var tooltipStyle = "\n  .ng2-stockcharts-default-cursor {\n    cursor: default;\n  }\n  .ng2-stockcharts-move-cursor {\n    cursor: move;\n  }\n  .ng2-stockcharts-ns-resize-cursor {\n    cursor: ns-resize;\n  }\n  .ng2-stockcharts-ew-resize-cursor {\n    cursor: ew-resize;\n  }";
var ChartCanvasComponent = (function () {
    function ChartCanvasComponent(elRef, cdr, zone) {
        this.elRef = elRef;
        this.cdr = cdr;
        this.zone = zone;
        this.width = 60;
        this.margin = { top: 20, right: 30, bottom: 30, left: 80 };
        this.type = types_1.ChartType.HYBRID;
        this.responsive = true;
        this.calculator = [];
        this.xAccessor = utils_1.identity;
        this.xExtents = [d3.min, d3.max];
        this.defaultClassName = 'ng2-stockcharts ';
        this.zIndex = 1;
        this.postCalculator = utils_1.identity;
        this.flipXScale = false;
        this.padding = 0;
        this.indexAccessor = function (d) { return d.idx; };
        this.indexMutator = function (d, idx) { return Object.assign({}, d, { idx: idx }); };
        this.map = utils_1.identity;
    }
    ChartCanvasComponent.ohlcv = function (d) {
        return {
            date: d.date,
            open: d.open,
            high: d.high,
            low: d.low,
            close: d.close,
            volume: d.volume
        };
    };
    ChartCanvasComponent.prototype.ngOnInit = function () {
        if (this.responsive) {
            window.addEventListener('resize', this.handleWindowResize);
            this.handleWindowResize();
        }
    };
    ChartCanvasComponent.prototype.ngOnDestroy = function () {
        if (this.responsive) {
            window.removeEventListener('resize', this.handleWindowResize);
        }
    };
    ChartCanvasComponent.prototype.ngOnChanges = function (changes) {
        this.dimensions = getDimensions(this);
        this.calculateState();
        this.finalTransform = "translate(" + (this.margin.left + 0.5) + ", " + (this.margin.top + 0.5) + ")";
        for (var k in changes) {
            if (CANDIDATES_FOR_RESET.indexOf(k) !== -1 && !changes[k].isFirstChange() && !utils_1.shallowEqual(changes[k].currentValue, changes[k].previousValue)) {
                this.forceUpdate();
                break;
            }
        }
    };
    ChartCanvasComponent.prototype.handleWindowResize = function () {
        this.width = this.elRef.nativeElement.parentNode.clientWidth;
        this.forceUpdate();
    };
    ChartCanvasComponent.prototype.forceUpdate = function () {
        var _this = this;
        this.zone.run(function () {
            _this.cdr.markForCheck();
        });
    };
    ChartCanvasComponent.prototype.setContainerStyles = function () {
        var styles = {
            'position': 'relative',
            'height': this.height + "px",
            'width': this.width + "px"
        };
        return styles;
    };
    ChartCanvasComponent.prototype.setSvgStyles = function () {
        var styles = {
            'position': 'absolute',
            'zIndex': this.zIndex + 5
        };
        return styles;
    };
    ChartCanvasComponent.prototype.getCursorStyle = function () {
        /*if (this.eventHandler) {
          return cursorStyle + tooltipStyle;
        } else {
          return tooltipStyle;
        }*/
        return '';
    };
    ChartCanvasComponent.prototype.getDataInfo = function () {
        //return this.eventHandler.getDataInfo();
        return;
    };
    ChartCanvasComponent.prototype.getCanvases = function () {
        if (this.canvases) {
            return this.canvases.getCanvasContexts();
        }
    };
    ChartCanvasComponent.prototype.setSvgClass = function () {
        return this.defaultClassName.concat(this.className || '');
    };
    ChartCanvasComponent.prototype.isChartHybrid = function () {
        return this.type == types_1.ChartType.HYBRID;
    };
    ChartCanvasComponent.prototype.calculateState = function () {
        var _this = this;
        var extent = typeof this.xExtents === 'function'
            ? this.xExtents(this.data)
            : d3.extent(this.xExtents.map(function (d) { return d3.functor(d); }).map(function (each) { return each(_this.data, _this.xAccessor); }));
        var _a = this.calculateFullData(), xAccessor = _a.xAccessor, displayXAccessor = _a.displayXAccessor, xScale = _a.xScale, filterData = _a.filterData, lastItem = _a.lastItem;
        var _b = filterData(extent, this.xAccessor), plotData = _b.plotData, domain = _b.domain;
        return {
            plotData: plotData,
            filterData: filterData,
            xScale: xScale.domain(domain),
            xAccessor: xAccessor,
            displayXAccessor: displayXAccessor,
            dataAltered: false,
            lastItem: lastItem,
        };
    };
    ChartCanvasComponent.prototype.calculateFullData = function () {
        var wholeData = utils_1.isDefined(this.plotFull) ? this.plotFull : this.xAccessor === utils_1.identity;
        var dimensions = getDimensions(this);
        var _a = evaluator_1.Evaluator.evaluate(this.data, {
            xAccessor: this.xAccessor,
            indexAccessor: this.indexAccessor,
            indexMutator: this.indexMutator,
            map: this.map,
            useWholeData: wholeData,
            width: dimensions.width,
            scaleProvider: this.xScaleProvider,
            xScale: this.xScale,
            calculator: this.calculator
        }), xAccessor = _a.xAccessor, displayXAccessor = _a.displayXAccessor, xScale = _a.xScale, filterData = _a.filterData, lastItem = _a.lastItem;
        return { xAccessor: xAccessor, displayXAccessor: displayXAccessor, xScale: xScale, filterData: filterData, lastItem: lastItem };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ChartCanvasComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ChartCanvasComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartCanvasComponent.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ChartCanvasComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ChartCanvasComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ChartCanvasComponent.prototype, "responsive", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartCanvasComponent.prototype, "calculator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], ChartCanvasComponent.prototype, "xAccessor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartCanvasComponent.prototype, "xExtents", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ChartCanvasComponent.prototype, "className", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ChartCanvasComponent.prototype, "defaultClassName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ChartCanvasComponent.prototype, "seriesName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ChartCanvasComponent.prototype, "zIndex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartCanvasComponent.prototype, "postCalculator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ChartCanvasComponent.prototype, "flipXScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartCanvasComponent.prototype, "padding", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartCanvasComponent.prototype, "xScaleProvider", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartCanvasComponent.prototype, "xScale", void 0);
    __decorate([
        core_1.ViewChild(core_1.forwardRef(function () { return canvas_container_component_1.CanvasContainerComponent; })), 
        __metadata('design:type', canvas_container_component_1.CanvasContainerComponent)
    ], ChartCanvasComponent.prototype, "canvases", void 0);
    ChartCanvasComponent = __decorate([
        core_1.Component({
            selector: 'ng-chart-canvas',
            template: "\n    <div [ngStyle]=\"setContainerStyles()\" [className]=\"setSvgClass()\">\n      <ng-canvas-container [width]=\"width\" [height]=\"height\" [type]=\"type\" [zIndex]=\"zIndex\"></ng-canvas-container>\n      <svg [ngClass]=\"setSvgClass()\" [attr.width]=\"width\" [attr.height]=\"height\" [ngStyle]=\"setSvgStyles()\">\n        <style>{{getCursorStyle()}}</style>\n        <svg:defs>\n          <svg:clipPath id=\"chart-area-clip\">\n            <svg:rect x=\"0\" y=\"0\" [attr.width]=\"dimensions.width\" [attr.height]=\"dimensions.height\" />\n          </svg:clipPath>\n        </svg:defs>\n        <svg:g [attr.transform]=\"finalTransform\">\n        </svg:g>\n      </svg>\n    </div>\n  ",
            directives: [core_1.forwardRef(function () { return canvas_container_component_1.CanvasContainerComponent; })],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.ChangeDetectorRef, core_1.NgZone])
    ], ChartCanvasComponent);
    return ChartCanvasComponent;
}());
exports.ChartCanvasComponent = ChartCanvasComponent;
;
//# sourceMappingURL=chart-canvas.component.js.map