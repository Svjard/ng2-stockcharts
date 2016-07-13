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
System.register("types", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var YMousePointerDisplayLocation, Orientation, XAxisOrientation, YAxisOrientation, XAxisAlignment, YAxisAlignment, ChartType;
    return {
        setters:[],
        execute: function() {
            (function (YMousePointerDisplayLocation) {
                YMousePointerDisplayLocation[YMousePointerDisplayLocation["LEFT"] = 1] = "LEFT";
                YMousePointerDisplayLocation[YMousePointerDisplayLocation["RIGHT"] = 2] = "RIGHT";
            })(YMousePointerDisplayLocation || (YMousePointerDisplayLocation = {}));
            exports_1("YMousePointerDisplayLocation", YMousePointerDisplayLocation);
            ;
            (function (Orientation) {
                Orientation[Orientation["TOP"] = 1] = "TOP";
                Orientation[Orientation["BOTTOM"] = 2] = "BOTTOM";
                Orientation[Orientation["LEFT"] = 3] = "LEFT";
                Orientation[Orientation["RIGHT"] = 4] = "RIGHT";
            })(Orientation || (Orientation = {}));
            exports_1("Orientation", Orientation);
            ;
            (function (XAxisOrientation) {
                XAxisOrientation[XAxisOrientation["TOP"] = 1] = "TOP";
                XAxisOrientation[XAxisOrientation["BOTTOM"] = 2] = "BOTTOM";
            })(XAxisOrientation || (XAxisOrientation = {}));
            exports_1("XAxisOrientation", XAxisOrientation);
            ;
            (function (YAxisOrientation) {
                YAxisOrientation[YAxisOrientation["LEFT"] = 1] = "LEFT";
                YAxisOrientation[YAxisOrientation["RIGHT"] = 2] = "RIGHT";
            })(YAxisOrientation || (YAxisOrientation = {}));
            exports_1("YAxisOrientation", YAxisOrientation);
            ;
            (function (XAxisAlignment) {
                XAxisAlignment[XAxisAlignment["TOP"] = 1] = "TOP";
                XAxisAlignment[XAxisAlignment["MIDDLE"] = 2] = "MIDDLE";
                XAxisAlignment[XAxisAlignment["BOTTOM"] = 3] = "BOTTOM";
            })(XAxisAlignment || (XAxisAlignment = {}));
            exports_1("XAxisAlignment", XAxisAlignment);
            ;
            (function (YAxisAlignment) {
                YAxisAlignment[YAxisAlignment["LEFT"] = 1] = "LEFT";
                YAxisAlignment[YAxisAlignment["MIDDLE"] = 2] = "MIDDLE";
                YAxisAlignment[YAxisAlignment["RIGHT"] = 3] = "RIGHT";
            })(YAxisAlignment || (YAxisAlignment = {}));
            exports_1("YAxisAlignment", YAxisAlignment);
            ;
            (function (ChartType) {
                ChartType[ChartType["SVG"] = 1] = "SVG";
                ChartType[ChartType["HYBRID"] = 2] = "HYBRID";
            })(ChartType || (ChartType = {}));
            exports_1("ChartType", ChartType);
            ;
        }
    }
});
System.register("utils/index", ['d3'], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var d3;
    var first, isArray;
    //export * from './accumulatingWindow';
    //export * from './mappedSlidingWindow';
    //export * from './merge';
    //export * from './slidingWindow';
    //export * from './zipper';
    function getClosestItemIndexes2(array, value, accessor) {
        var left = d3.bisector(accessor).left(array, value);
        left = Math.max(left - 1, 0);
        var right = Math.min(left + 1, array.length - 1);
        var item = accessor(array[left]);
        if (item >= value && item <= value) {
            right = left;
        }
        return { left: left, right: right };
    }
    exports_2("getClosestItemIndexes2", getClosestItemIndexes2);
    function getClosestItemIndexes(array, value, accessor) {
        var lo = 0;
        var hi = array.length - 1;
        while (hi - lo > 1) {
            var mid = Math.round((lo + hi) / 2);
            if (accessor(array[mid]) <= value) {
                lo = mid;
            }
            else {
                hi = mid;
            }
        }
        // for Date object === does not work, so using the <= in combination with >=
        // the same code works for both dates and numbers
        if (accessor(array[lo]) >= value && accessor(array[lo]) <= value) {
            hi = lo;
        }
        if (accessor(array[hi]) >= value && accessor(array[hi]) <= value) {
            lo = hi;
        }
        if (accessor(array[lo]) < value && accessor(array[hi]) < value) {
            lo = hi;
        }
        if (accessor(array[lo]) > value && accessor(array[hi]) > value) {
            hi = lo;
        }
        return { left: lo, right: hi };
    }
    exports_2("getClosestItemIndexes", getClosestItemIndexes);
    function getClosestItem(array, value, accessor) {
        var _a = getClosestItemIndexes(array, value, accessor), left = _a.left, right = _a.right;
        if (left === right) {
            return array[left];
        }
        var closest = (Math.abs(accessor(array[left]) - value) < Math.abs(accessor(array[right]) - value))
            ? array[left]
            : array[right];
        return closest;
    }
    exports_2("getClosestItem", getClosestItem);
    //export const overlayColors = d3.scale.category10();
    function rebind(target, source, mappings) {
        if (typeof (mappings) !== 'object') {
            return d3.rebind.apply(d3, arguments);
        }
        Object.keys(mappings)
            .forEach(function (targetName) {
            var method = source[mappings[targetName]];
            if (typeof method !== 'function') {
                throw new Error("The method " + mappings[targetName] + " does not exist on the source object");
            }
            target[targetName] = function () {
                var value = method.apply(source, arguments);
                return value === source ? target : value;
            };
        });
        return target;
    }
    exports_2("rebind", rebind);
    function head(array, accessor) {
        if (accessor && array) {
            var value = void 0;
            for (var i = 0; i < array.length; i++) {
                value = array[i];
                if (isDefined(accessor(value)))
                    break;
            }
            return value;
        }
        return array ? array[0] : undefined;
    }
    exports_2("head", head);
    function last(array, accessor) {
        if (accessor && array) {
            var value = void 0;
            for (var i = array.length - 1; i >= 0; i--) {
                value = array[i];
                if (isDefined(accessor(value)))
                    break;
            }
            return value;
        }
        var length = array ? array.length : 0;
        return length ? array[length - 1] : undefined;
    }
    exports_2("last", last);
    function isDefined(d) {
        return d !== null && typeof d != 'undefined';
    }
    exports_2("isDefined", isDefined);
    function isNotDefined(d) {
        return !isDefined(d);
    }
    exports_2("isNotDefined", isNotDefined);
    function isObject(d) {
        return isDefined(d) && typeof d === 'object' && !Array.isArray(d);
    }
    exports_2("isObject", isObject);
    function touchPosition(touch, e) {
        var container = e.target;
        var rect = container.getBoundingClientRect();
        var x = touch.clientX - rect.left - container.clientLeft;
        var y = touch.clientY - rect.top - container.clientTop;
        var xy = [Math.round(x), Math.round(y)];
        return xy;
    }
    exports_2("touchPosition", touchPosition);
    function mousePosition(e) {
        var container = e.currentTarget;
        var rect = container.getBoundingClientRect();
        var x = e.clientX - rect.left - container.clientLeft;
        var y = e.clientY - rect.top - container.clientTop;
        var xy = [Math.round(x), Math.round(y)];
        return xy;
    }
    exports_2("mousePosition", mousePosition);
    function clearCanvas(canvasList) {
        canvasList.forEach(function (each) {
            each.setTransform(1, 0, 0, 1, 0, 0);
            each.clearRect(-1, -1, each.canvas.width + 2, each.canvas.height + 2);
        });
    }
    exports_2("clearCanvas", clearCanvas);
    function hexToRGBA(inputHex, opacity) {
        var hex = inputHex.replace('#', '');
        if (inputHex.indexOf('#') > -1 && (hex.length === 3 || hex.length === 6)) {
            var multiplier = (hex.length === 3) ? 1 : 2;
            var r = parseInt(hex.substring(0, 1 * multiplier), 16);
            var g = parseInt(hex.substring(1 * multiplier, 2 * multiplier), 16);
            var b = parseInt(hex.substring(2 * multiplier, 3 * multiplier), 16);
            var result = "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
            return result;
        }
        return inputHex;
    }
    exports_2("hexToRGBA", hexToRGBA);
    function isDate(date) {
        return Object.prototype.toString.call(date) === "[object Date]";
    }
    function isEqual(val1, val2) {
        return (isDate(val1) && isDate(val2))
            ? val1.getTime() === val2.getTime()
            : val1 === val2;
    }
    function shallowEqual(a, b) {
        if (!a && !b) {
            return true;
        }
        if (!a && b || a && !b) {
            return false;
        }
        var numKeysA = 0;
        var numKeysB = 0;
        var key;
        for (key in b) {
            numKeysB++;
            if (!a.hasOwnProperty(key) || !isEqual(a[key], b[key])) {
                return false;
            }
        }
        for (key in a) {
            numKeysA++;
        }
        return numKeysA === numKeysB;
    }
    exports_2("shallowEqual", shallowEqual);
    function identity(arg) {
        return arg;
    }
    exports_2("identity", identity);
    function noop() { }
    exports_2("noop", noop);
    return {
        setters:[
            function (d3_1) {
                d3 = d3_1;
            }],
        execute: function() {
            exports_2("first", first = head);
            exports_2("isArray", isArray = Array.isArray);
        }
    }
});
System.register("scale/evaluator", ["utils/index"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var utils_1;
    var Evaluator;
    return {
        setters:[
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            ;
            Evaluator = (function () {
                function Evaluator() {
                }
                Evaluator.evaluate = function (data, config) {
                    var mappedData = data.map(config.map);
                    var composedCalculator = Evaluator.compose(config.calculator);
                    var calculatedData = composedCalculator(mappedData);
                    if (config.scaleProvider) {
                        var _a = config.scaleProvider(calculatedData, config.xAccessor, config.indexAccessor, config.indexMutator), finalData = _a.data, modifiedXScale = _a.xScale, realXAccessor = _a.xAccessor, displayXAccessor = _a.displayXAccessor;
                        return {
                            filterData: Evaluator.extentsWrapper(finalData, config.xAccessor, realXAccessor, config.width, config.useWholeData),
                            xScale: modifiedXScale,
                            xAccessor: realXAccessor,
                            displayXAccessor: displayXAccessor,
                            lastItem: utils_1.last(finalData)
                        };
                    }
                    return {
                        filterData: Evaluator.extentsWrapper(calculatedData, config.xAccessor, config.xAccessor, config.width, config.useWholeData),
                        xScale: config.xScale,
                        xAccessor: config.xAccessor,
                        displayXAccessor: config.xAccessor,
                        lastItem: utils_1.last(calculatedData)
                    };
                };
                Evaluator.canShowTheseManyPeriods = function (width, arrayLength) {
                    var threshold = 0.75; // number of datapoints per 1 px
                    return arrayLength < width * threshold && arrayLength > 1;
                };
                Evaluator.getDomain = function (inputDomain, width, filteredData, predicate, currentDomain, canShowTheseMany, realXAccessor) {
                    if (canShowTheseMany(width, filteredData.length)) {
                        var domain = predicate
                            ? inputDomain
                            : [realXAccessor(utils_1.first(filteredData)), realXAccessor(utils_1.last(filteredData))]; // TODO fix me later
                        return domain;
                    }
                    return currentDomain;
                };
                Evaluator.extentsWrapper = function (data, inputXAccessor, realXAccessor, width, useWholeData) {
                    function domain(inputDomain, xAccessor, currentPlotData, currentDomain) {
                        if (useWholeData) {
                            return { plotData: data, domain: inputDomain };
                        }
                        var left = utils_1.first(inputDomain);
                        var right = utils_1.last(inputDomain);
                        var filteredData = Evaluator.getFilteredResponse(data, left, right, xAccessor);
                        var plotData, domain;
                        if (Evaluator.canShowTheseManyPeriods(width, filteredData.length)) {
                            plotData = filteredData;
                            domain = realXAccessor === xAccessor ? inputDomain : [realXAccessor(utils_1.first(plotData)), realXAccessor(utils_1.last(plotData))];
                        }
                        else {
                            plotData = currentPlotData || filteredData.slice(filteredData.length - Evaluator.showMax(width));
                            domain = currentDomain || [realXAccessor(utils_1.first(plotData)), realXAccessor(utils_1.last(plotData))];
                        }
                        return { plotData: plotData, domain: domain };
                    }
                    // domain.isItemVisibleInDomain = function(d, domain) {};
                    return domain;
                };
                Evaluator.showMax = function (width) {
                    var threshold = 0.75; // number of datapoints per 1 px
                    return Math.floor(width * threshold);
                };
                Evaluator.getFilteredResponse = function (data, left, right, xAccessor) {
                    var newLeftIndex = utils_1.getClosestItemIndexes(data, left, xAccessor).right;
                    var newRightIndex = utils_1.getClosestItemIndexes(data, right, xAccessor).left;
                    var filteredData = data.slice(newLeftIndex, newRightIndex + 1);
                    return filteredData;
                };
                Evaluator.compose = function (funcs) {
                    if (funcs.length === 0) {
                        return utils_1.identity;
                    }
                    if (funcs.length === 1) {
                        return funcs[0];
                    }
                    var head = funcs[0], tail = funcs.slice(1);
                    return function (args) { return tail.reduce(function (composed, f) { return f(composed); }, head(args)); };
                };
                return Evaluator;
            }());
            exports_3("Evaluator", Evaluator);
        }
    }
});
System.register("canvas-container.component", ['@angular/core', "chart-canvas.component", "types"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_1, chart_canvas_component_1, types_1;
    var CanvasContainerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (chart_canvas_component_1_1) {
                chart_canvas_component_1 = chart_canvas_component_1_1;
            },
            function (types_1_1) {
                types_1 = types_1_1;
            }],
        execute: function() {
            ;
            CanvasContainerComponent = (function () {
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
            exports_4("CanvasContainerComponent", CanvasContainerComponent);
            ;
        }
    }
});
System.register("chart-canvas.component", ['@angular/core', "types", "utils/index", "scale/evaluator", 'd3', "canvas-container.component"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_2, types_2, utils_2, evaluator_1, d3, canvas_container_component_1;
    var SECOND, MINUTE, HOUR, DAILY, CANDIDATES_FOR_RESET, cursorStyle, tooltipStyle, ChartCanvasComponent;
    function getDimensions(component) {
        return {
            height: component.height - component.margin.top - component.margin.bottom,
            width: component.width - component.margin.left - component.margin.right,
        };
    }
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (types_2_1) {
                types_2 = types_2_1;
            },
            function (utils_2_1) {
                utils_2 = utils_2_1;
            },
            function (evaluator_1_1) {
                evaluator_1 = evaluator_1_1;
            },
            function (d3_2) {
                d3 = d3_2;
            },
            function (canvas_container_component_1_1) {
                canvas_container_component_1 = canvas_container_component_1_1;
            }],
        execute: function() {
            SECOND = 1000;
            MINUTE = 60 * SECOND;
            HOUR = 60 * MINUTE;
            DAILY = 24 * HOUR;
            CANDIDATES_FOR_RESET = [
                'data',
                'calculator',
                'indexAccessor',
                'indexMutator',
                'map',
                'seriesName',
                'xExtents',
                'xScaleProvider',
            ];
            cursorStyle = "\n  .ng2-stockcharts-grabbing-cursor {\n    cursor: grabbing;\n    cursor: -moz-grabbing;\n    cursor: -webkit-grabbing;\n  }\n\n  .ng2-stockcharts-crosshair-cursor {\n    cursor: crosshair;\n  }\n\n  .ng2-stockcharts-tooltip-hover {\n    pointer-events: all;\n    cursor: pointer;\n  }";
            tooltipStyle = "\n  .ng2-stockcharts-default-cursor {\n    cursor: default;\n  }\n  .ng2-stockcharts-move-cursor {\n    cursor: move;\n  }\n  .ng2-stockcharts-ns-resize-cursor {\n    cursor: ns-resize;\n  }\n  .ng2-stockcharts-ew-resize-cursor {\n    cursor: ew-resize;\n  }";
            ChartCanvasComponent = (function () {
                function ChartCanvasComponent(elRef, cdr, zone) {
                    this.elRef = elRef;
                    this.cdr = cdr;
                    this.zone = zone;
                    this.width = 60;
                    this.margin = { top: 20, right: 30, bottom: 30, left: 80 };
                    this.type = types_2.ChartType.HYBRID;
                    this.responsive = true;
                    this.calculator = [];
                    this.xAccessor = utils_2.identity;
                    this.xExtents = [d3.min, d3.max];
                    this.defaultClassName = 'ng2-stockcharts ';
                    this.zIndex = 1;
                    this.postCalculator = utils_2.identity;
                    this.flipXScale = false;
                    this.padding = 0;
                    this.indexAccessor = function (d) { return d.idx; };
                    this.indexMutator = function (d, idx) { return Object.assign({}, d, { idx: idx }); };
                    this.map = utils_2.identity;
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
                        if (CANDIDATES_FOR_RESET.indexOf(k) !== -1 && !changes[k].isFirstChange() && !utils_2.shallowEqual(changes[k].currentValue, changes[k].previousValue)) {
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
                    return this.type == types_2.ChartType.HYBRID;
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
                    var wholeData = utils_2.isDefined(this.plotFull) ? this.plotFull : this.xAccessor === utils_2.identity;
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
                    core_2.Input(), 
                    __metadata('design:type', Number)
                ], ChartCanvasComponent.prototype, "width", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Number)
                ], ChartCanvasComponent.prototype, "height", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Object)
                ], ChartCanvasComponent.prototype, "margin", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Number)
                ], ChartCanvasComponent.prototype, "type", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Array)
                ], ChartCanvasComponent.prototype, "data", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Boolean)
                ], ChartCanvasComponent.prototype, "responsive", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Object)
                ], ChartCanvasComponent.prototype, "calculator", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Function)
                ], ChartCanvasComponent.prototype, "xAccessor", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Object)
                ], ChartCanvasComponent.prototype, "xExtents", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', String)
                ], ChartCanvasComponent.prototype, "className", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', String)
                ], ChartCanvasComponent.prototype, "defaultClassName", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', String)
                ], ChartCanvasComponent.prototype, "seriesName", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Number)
                ], ChartCanvasComponent.prototype, "zIndex", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Object)
                ], ChartCanvasComponent.prototype, "postCalculator", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Boolean)
                ], ChartCanvasComponent.prototype, "flipXScale", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Object)
                ], ChartCanvasComponent.prototype, "padding", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Object)
                ], ChartCanvasComponent.prototype, "xScaleProvider", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Object)
                ], ChartCanvasComponent.prototype, "xScale", void 0);
                __decorate([
                    core_2.ViewChild(core_2.forwardRef(function () { return canvas_container_component_1.CanvasContainerComponent; })), 
                    __metadata('design:type', canvas_container_component_1.CanvasContainerComponent)
                ], ChartCanvasComponent.prototype, "canvases", void 0);
                ChartCanvasComponent = __decorate([
                    core_2.Component({
                        selector: 'ng-chart-canvas',
                        template: "\n    <div [ngStyle]=\"setContainerStyles()\" [className]=\"setSvgClass()\">\n      <ng-canvas-container [width]=\"width\" [height]=\"height\" [type]=\"type\" [zIndex]=\"zIndex\"></ng-canvas-container>\n      <svg [ngClass]=\"setSvgClass()\" [attr.width]=\"width\" [attr.height]=\"height\" [ngStyle]=\"setSvgStyles()\">\n        <style>{{getCursorStyle()}}</style>\n        <svg:defs>\n          <svg:clipPath id=\"chart-area-clip\">\n            <svg:rect x=\"0\" y=\"0\" [attr.width]=\"dimensions.width\" [attr.height]=\"dimensions.height\" />\n          </svg:clipPath>\n        </svg:defs>\n        <svg:g [attr.transform]=\"finalTransform\">\n        </svg:g>\n      </svg>\n    </div>\n  ",
                        directives: [core_2.forwardRef(function () { return canvas_container_component_1.CanvasContainerComponent; })],
                        changeDetection: core_2.ChangeDetectionStrategy.OnPush
                    }), 
                    __metadata('design:paramtypes', [core_2.ElementRef, core_2.ChangeDetectorRef, core_2.NgZone])
                ], ChartCanvasComponent);
                return ChartCanvasComponent;
            }());
            exports_5("ChartCanvasComponent", ChartCanvasComponent);
            ;
        }
    }
});
System.register("chart.component", ['@angular/core', "chart-canvas.component", 'd3', "types"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_3, chart_canvas_component_2, d3, types_3;
    var ChartComponent;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (chart_canvas_component_2_1) {
                chart_canvas_component_2 = chart_canvas_component_2_1;
            },
            function (d3_3) {
                d3 = d3_3;
            },
            function (types_3_1) {
                types_3 = types_3_1;
            }],
        execute: function() {
            ChartComponent = (function () {
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
                    core_3.Input(), 
                    __metadata('design:type', Number)
                ], ChartComponent.prototype, "height", void 0);
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', Number)
                ], ChartComponent.prototype, "width", void 0);
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', Object)
                ], ChartComponent.prototype, "origin", void 0);
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', Object)
                ], ChartComponent.prototype, "id", void 0);
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', Object)
                ], ChartComponent.prototype, "yExtents", void 0);
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', Object)
                ], ChartComponent.prototype, "yScale", void 0);
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', Number)
                ], ChartComponent.prototype, "yMousePointerDisplayLocation", void 0);
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', Object)
                ], ChartComponent.prototype, "yMousePointerDisplayFormat", void 0);
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', Boolean)
                ], ChartComponent.prototype, "flipYScale", void 0);
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', Object)
                ], ChartComponent.prototype, "padding", void 0);
                ChartComponent = __decorate([
                    core_3.Component({
                        selector: 'ng-chart',
                        template: "\n    <g [attr.transform]=\"transform\">\n      <ng-content></ng-content>\n    </g>\n  ",
                        styleUrls: ['./chart.component.css']
                    }),
                    __param(0, core_3.Host()), 
                    __metadata('design:paramtypes', [chart_canvas_component_2.ChartCanvasComponent])
                ], ChartComponent);
                return ChartComponent;
            }());
            exports_6("ChartComponent", ChartComponent);
        }
    }
});
System.register("axes/axis-line.component", ['@angular/core', "utils/index", "types"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_4, utils_3, types_4;
    var AxisLineComponent;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (utils_3_1) {
                utils_3 = utils_3_1;
            },
            function (types_4_1) {
                types_4 = types_4_1;
            }],
        execute: function() {
            AxisLineComponent = (function () {
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
                    this.sign = this.orient === types_4.Orientation.TOP || this.orient === types_4.Orientation.LEFT ? -1 : 1;
                    if (this.orient === types_4.Orientation.BOTTOM || this.orient === types_4.Orientation.TOP) {
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
                    var sign = this.orient === types_4.Orientation.TOP || this.orient === types_4.Orientation.LEFT ? -1 : 1;
                    var xAxis = (this.orient === types_4.Orientation.BOTTOM || this.orient === types_4.Orientation.TOP);
                    ctx.lineWidth = this.strokeWidth;
                    ctx.strokeStyle = utils_3.hexToRGBA(this.stroke, this.opacity);
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
                    core_4.Input(), 
                    __metadata('design:type', String)
                ], AxisLineComponent.prototype, "className", void 0);
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', String)
                ], AxisLineComponent.prototype, "shapeRendering", void 0);
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', Number)
                ], AxisLineComponent.prototype, "orient", void 0);
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', Number)
                ], AxisLineComponent.prototype, "outerTickSize", void 0);
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', String)
                ], AxisLineComponent.prototype, "fill", void 0);
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', String)
                ], AxisLineComponent.prototype, "stroke", void 0);
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', Number)
                ], AxisLineComponent.prototype, "strokeWidth", void 0);
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', Number)
                ], AxisLineComponent.prototype, "opacity", void 0);
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', Array)
                ], AxisLineComponent.prototype, "range", void 0);
                AxisLineComponent = __decorate([
                    core_4.Component({
                        selector: 'ng-axis-line',
                        template: "\n    <svg:path\n      [ngClass]=\"setPathClass()\"\n      [attr.shape-rendering]=\"shapeRendering\"\n      [attr.d]=\"d\"\n      [attr.fill]=\"fill\"\n      [attr.opacity]=\"opacity\"\n      [attr.stroke]=\"stroke\"\n      [attr.stroke-width]=\"strokeWidth\">\n    </svg:path>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AxisLineComponent);
                return AxisLineComponent;
            }());
            exports_7("AxisLineComponent", AxisLineComponent);
            ;
        }
    }
});
System.register("axes/axis-ticks.component", ['@angular/core', "types", "utils/index"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_5, types_5, utils_4;
    var AxisTickComponent, AxisTicksComponent;
    function tickTransform_svg_axisX(scale, tick) {
        return [~~(0.5 + scale(tick)), 0];
    }
    function tickTransform_svg_axisY(scale, tick) {
        return [0, ~~(0.5 + scale(tick))];
    }
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (types_5_1) {
                types_5 = types_5_1;
            },
            function (utils_4_1) {
                utils_4 = utils_4_1;
            }],
        execute: function() {
            AxisTickComponent = (function () {
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
                    core_5.Input(), 
                    __metadata('design:type', String)
                ], AxisTickComponent.prototype, "className", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', String)
                ], AxisTickComponent.prototype, "defaultClassName", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', Array)
                ], AxisTickComponent.prototype, "transform", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', String)
                ], AxisTickComponent.prototype, "tickStroke", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', Number)
                ], AxisTickComponent.prototype, "tickStrokeOpacity", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', String)
                ], AxisTickComponent.prototype, "textAnchor", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', Number)
                ], AxisTickComponent.prototype, "fontSize", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', String)
                ], AxisTickComponent.prototype, "fontFamily", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', Number)
                ], AxisTickComponent.prototype, "x", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', Number)
                ], AxisTickComponent.prototype, "y", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', Number)
                ], AxisTickComponent.prototype, "x2", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', Number)
                ], AxisTickComponent.prototype, "y2", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', String)
                ], AxisTickComponent.prototype, "dy", void 0);
                AxisTickComponent = __decorate([
                    core_5.Component({
                        selector: 'ng-axis-tick',
                        template: "\n    <svg:g [ngClass]=\"setTickClass()\" [attr.transform]=\"finalTransform\">\n      <svg:line shape-rendering=\"crispEdges\" [attr.opacity]=\"tickStrokeOpacity\" [attr.stroke]=\"tickStroke\" [attr.x2]=\"x2\" [attr.y2]=\"y2\" />\n      <svg:text\n        [attr.dy]=\"dy\" [attr.x]=\"x\" [attr.y]=\"y\"\n        [attr.fill]=\"tickStroke\"\n        [attr.font-size]=\"fontSize\"\n        [attr.font-family]=\"fontFamily\"\n        [attr.text-anchor]=\"textAnchor\">\n        <ng-content></ng-content>\n      </svg:text>\n    </svg:g>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AxisTickComponent);
                return AxisTickComponent;
            }());
            exports_8("AxisTickComponent", AxisTickComponent);
            AxisTicksComponent = (function () {
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
                    var xAxis = (this.orient === types_5.Orientation.BOTTOM || this.orient === types_5.Orientation.TOP);
                    var result = this.process(xAxis ? xScale : yScale);
                    var tickStroke = result.tickStroke, tickStrokeOpacity = result.tickStrokeOpacity, textAnchor = result.textAnchor, fontSize = result.fontSize, fontFamily = result.fontFamily;
                    ctx.strokeStyle = utils_4.hexToRGBA(this.tickStroke, this.tickStrokeOpacity);
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
                    var ticks = utils_4.isNotDefined(this.tickValues)
                        ? (scale.ticks
                            ? scale.ticks.apply(scale, this.ticks)
                            : scale.domain())
                        : this.tickValues;
                    var baseFormat = scale.tickFormat
                        ? scale.tickFormat.apply(scale, this.ticks)
                        : utils_4.identity;
                    var format = utils_4.isNotDefined(this.tickFormat)
                        ? baseFormat
                        : function (d) { return baseFormat(d) ? _this.tickFormat(d) : ''; };
                    var sign = this.orient === types_5.Orientation.TOP || this.orient === types_5.Orientation.LEFT ? -1 : 1;
                    var tickSpacing = Math.max(this.innerTickSize, 0) + this.tickPadding;
                    var tickTransform;
                    var x;
                    var y;
                    var x2;
                    var y2;
                    var dy;
                    var canvas_dy;
                    var textAnchor;
                    if (this.orient === types_5.Orientation.BOTTOM || this.orient === types_5.Orientation.TOP) {
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
                    core_5.Input(), 
                    __metadata('design:type', Number)
                ], AxisTicksComponent.prototype, "orient", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', Number)
                ], AxisTicksComponent.prototype, "innerTickSize", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', Object)
                ], AxisTicksComponent.prototype, "tickFormat", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', Number)
                ], AxisTicksComponent.prototype, "tickPadding", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', Array)
                ], AxisTicksComponent.prototype, "ticks", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', Object)
                ], AxisTicksComponent.prototype, "tickValues", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', Object)
                ], AxisTicksComponent.prototype, "scale", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', String)
                ], AxisTicksComponent.prototype, "tickStroke", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', Number)
                ], AxisTicksComponent.prototype, "tickStrokeOpacity", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', Number)
                ], AxisTicksComponent.prototype, "fontSize", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', String)
                ], AxisTicksComponent.prototype, "fontFamily", void 0);
                AxisTicksComponent = __decorate([
                    core_5.Component({
                        selector: 'ng-axis-ticks',
                        template: "\n    <svg:g>\n      <ng-axis-tick *ngFor=\"let tick of ticks\" [transform]=\"result.tickTransform(scale, tick)\"\n        [tickStroke]=\"tickStroke\" [tickStrokeOpacity]=\"tickStrokeOpacity\"\n        [dy]=\"result.dy\" [x]=\"result.x\" [y]=\"result.y\"\n        [x2]=\"result.x2\" [y2]=\"result.y2\" [textAnchor]=\"textAnchor\"\n        [fontSize]=\"fontSize\" [fontFamily]=\"fontFamily\">{{result.format(tick)}}</ng-axis-tick>\n    </svg:g>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AxisTicksComponent);
                return AxisTicksComponent;
            }());
            exports_8("AxisTicksComponent", AxisTicksComponent);
            ;
        }
    }
});
System.register("axes/axis.component", ['@angular/core', "utils/index", "types", "chart.component", "axes/axis-line.component", "axes/axis-ticks.component"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_6, utils_5, types_6, chart_component_1, axis_line_component_1, axis_ticks_component_1;
    var AxisComponent;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (utils_5_1) {
                utils_5 = utils_5_1;
            },
            function (types_6_1) {
                types_6 = types_6_1;
            },
            function (chart_component_1_1) {
                chart_component_1 = chart_component_1_1;
            },
            function (axis_line_component_1_1) {
                axis_line_component_1 = axis_line_component_1_1;
            },
            function (axis_ticks_component_1_1) {
                axis_ticks_component_1 = axis_ticks_component_1_1;
            }],
        execute: function() {
            AxisComponent = (function () {
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
                    if (this.chart.chartCanvas.isChartHybrid() && utils_5.isDefined(this.chart.chartCanvas.getCanvases)) {
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
                    core_6.Input(), 
                    __metadata('design:type', String)
                ], AxisComponent.prototype, "className", void 0);
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', String)
                ], AxisComponent.prototype, "defaultClassName", void 0);
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', Array)
                ], AxisComponent.prototype, "transform", void 0);
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', Number)
                ], AxisComponent.prototype, "orient", void 0);
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', Number)
                ], AxisComponent.prototype, "innerTickSize", void 0);
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', Number)
                ], AxisComponent.prototype, "outerTickSize", void 0);
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', Object)
                ], AxisComponent.prototype, "tickFormat", void 0);
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', Number)
                ], AxisComponent.prototype, "tickPadding", void 0);
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', Number)
                ], AxisComponent.prototype, "tickSize", void 0);
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', Array)
                ], AxisComponent.prototype, "ticks", void 0);
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', Object)
                ], AxisComponent.prototype, "tickValues", void 0);
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', Object)
                ], AxisComponent.prototype, "scale", void 0);
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', Boolean)
                ], AxisComponent.prototype, "showDomain", void 0);
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', Boolean)
                ], AxisComponent.prototype, "showTicks", void 0);
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', String)
                ], AxisComponent.prototype, "fontFamily", void 0);
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', Number)
                ], AxisComponent.prototype, "fontSize", void 0);
                __decorate([
                    core_6.ViewChild(axis_ticks_component_1.AxisTicksComponent), 
                    __metadata('design:type', axis_ticks_component_1.AxisTicksComponent)
                ], AxisComponent.prototype, "axisTicks", void 0);
                __decorate([
                    core_6.ViewChild(axis_line_component_1.AxisLineComponent), 
                    __metadata('design:type', axis_line_component_1.AxisLineComponent)
                ], AxisComponent.prototype, "axisLine", void 0);
                AxisComponent = __decorate([
                    core_6.Component({
                        selector: 'ng-axis',
                        template: "\n    <svg:g *ngIf=\"!chartCanvas.isChartHybrid()\" [ngClass]=\"setAxisClass()\" [attr.transform]=\"finalTransform\">\n      <ng-axis-tick #axisTicks *ngIf=\"showTicks\"></ng-axis-tick>\n      <ng-axis-line #axisLine *ngIf=\"showDomain\"></ng-axis-line>\n    </svg:g>\n  ",
                        directives: [axis_line_component_1.AxisLineComponent, axis_ticks_component_1.AxisTicksComponent]
                    }),
                    __param(0, core_6.Host()), 
                    __metadata('design:paramtypes', [chart_component_1.ChartComponent])
                ], AxisComponent);
                return AxisComponent;
            }());
            exports_9("AxisComponent", AxisComponent);
        }
    }
});
System.register("axes/xaxis.component", ['@angular/core', "types", "chart.component", "chart-canvas.component"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var core_7, types_7, chart_component_2, chart_canvas_component_3;
    var XAxis;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (types_7_1) {
                types_7 = types_7_1;
            },
            function (chart_component_2_1) {
                chart_component_2 = chart_component_2_1;
            },
            function (chart_canvas_component_3_1) {
                chart_canvas_component_3 = chart_canvas_component_3_1;
            }],
        execute: function() {
            XAxis = (function () {
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
                    if (this.axisAt === types_7.XAxisAlignment.TOP) {
                        axisLocation = 0;
                    }
                    else if (this.axisAt === types_7.XAxisAlignment.BOTTOM) {
                        axisLocation = this.chart.height;
                    }
                    else if (this.axisAt === types_7.XAxisAlignment.MIDDLE) {
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
                    core_7.Input(), 
                    __metadata('design:type', Object)
                ], XAxis.prototype, "axisAt", void 0);
                __decorate([
                    core_7.Input(), 
                    __metadata('design:type', Number)
                ], XAxis.prototype, "orient", void 0);
                __decorate([
                    core_7.Input(), 
                    __metadata('design:type', Number)
                ], XAxis.prototype, "innerTickSize", void 0);
                __decorate([
                    core_7.Input(), 
                    __metadata('design:type', Number)
                ], XAxis.prototype, "outerTickSize", void 0);
                __decorate([
                    core_7.Input(), 
                    __metadata('design:type', Object)
                ], XAxis.prototype, "tickFormat", void 0);
                __decorate([
                    core_7.Input(), 
                    __metadata('design:type', Number)
                ], XAxis.prototype, "tickPadding", void 0);
                __decorate([
                    core_7.Input(), 
                    __metadata('design:type', Number)
                ], XAxis.prototype, "tickSize", void 0);
                __decorate([
                    core_7.Input(), 
                    __metadata('design:type', Number)
                ], XAxis.prototype, "ticks", void 0);
                __decorate([
                    core_7.Input(), 
                    __metadata('design:type', Array)
                ], XAxis.prototype, "tickValues", void 0);
                __decorate([
                    core_7.Input(), 
                    __metadata('design:type', Boolean)
                ], XAxis.prototype, "showTicks", void 0);
                __decorate([
                    core_7.Input(), 
                    __metadata('design:type', Boolean)
                ], XAxis.prototype, "showGrid", void 0);
                __decorate([
                    core_7.Input(), 
                    __metadata('design:type', String)
                ], XAxis.prototype, "className", void 0);
                XAxis = __decorate([
                    core_7.Component({
                        selector: 'ng-xaxis',
                        template: "\n    <ng-axis\n      [className]=\"className\"\n      [range]=\"range\"\n      [transform]=\"transform\"\n      [showTicks]=\"showTicks\" [tickFormat]=\"tickFormat\" [ticks]=\"[ticks]\"\n      [scale]=\"chartCanvas.xScale\"></ng-axis>"
                    }),
                    __param(0, core_7.Host()),
                    __param(1, core_7.Host()), 
                    __metadata('design:paramtypes', [chart_canvas_component_3.ChartCanvasComponent, chart_component_2.ChartComponent])
                ], XAxis);
                return XAxis;
            }());
            exports_10("XAxis", XAxis);
            ;
        }
    }
});
System.register("axes/yaxis.component", ['@angular/core', "types", "axes/axis.component", "chart.component"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_8, types_8, axis_component_1, chart_component_3;
    var YAxis;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (types_8_1) {
                types_8 = types_8_1;
            },
            function (axis_component_1_1) {
                axis_component_1 = axis_component_1_1;
            },
            function (chart_component_3_1) {
                chart_component_3 = chart_component_3_1;
            }],
        execute: function() {
            YAxis = (function () {
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
                    if (this.axisAt === types_8.YAxisAlignment.LEFT) {
                        axisLocation = 0;
                    }
                    else if (this.axisAt === types_8.YAxisAlignment.RIGHT) {
                        axisLocation = this.chart.width;
                    }
                    else if (this.axisAt === types_8.YAxisAlignment.MIDDLE) {
                        axisLocation = (this.chart.width) / 2;
                    }
                    this.range = [0, this.chart.height];
                    this.transform = [axisLocation, 0];
                };
                __decorate([
                    core_8.Input(), 
                    __metadata('design:type', Object)
                ], YAxis.prototype, "axisAt", void 0);
                __decorate([
                    core_8.Input(), 
                    __metadata('design:type', Number)
                ], YAxis.prototype, "orient", void 0);
                __decorate([
                    core_8.Input(), 
                    __metadata('design:type', Number)
                ], YAxis.prototype, "innerTickSize", void 0);
                __decorate([
                    core_8.Input(), 
                    __metadata('design:type', Number)
                ], YAxis.prototype, "outerTickSize", void 0);
                __decorate([
                    core_8.Input(), 
                    __metadata('design:type', Object)
                ], YAxis.prototype, "tickFormat", void 0);
                __decorate([
                    core_8.Input(), 
                    __metadata('design:type', Number)
                ], YAxis.prototype, "tickPadding", void 0);
                __decorate([
                    core_8.Input(), 
                    __metadata('design:type', Number)
                ], YAxis.prototype, "tickSize", void 0);
                __decorate([
                    core_8.Input(), 
                    __metadata('design:type', Number)
                ], YAxis.prototype, "ticks", void 0);
                __decorate([
                    core_8.Input(), 
                    __metadata('design:type', Array)
                ], YAxis.prototype, "tickValues", void 0);
                __decorate([
                    core_8.Input(), 
                    __metadata('design:type', Boolean)
                ], YAxis.prototype, "percentScale", void 0);
                __decorate([
                    core_8.Input(), 
                    __metadata('design:type', Boolean)
                ], YAxis.prototype, "showTicks", void 0);
                __decorate([
                    core_8.Input(), 
                    __metadata('design:type', Boolean)
                ], YAxis.prototype, "showGrid", void 0);
                __decorate([
                    core_8.Input(), 
                    __metadata('design:type', Boolean)
                ], YAxis.prototype, "showDomain", void 0);
                __decorate([
                    core_8.Input(), 
                    __metadata('design:type', String)
                ], YAxis.prototype, "className", void 0);
                YAxis = __decorate([
                    core_8.Component({
                        selector: 'ng-yaxis',
                        template: "\n    <ng-axis\n      [className]=\"className\"\n      [transform]=\"transform\"\n      [range]=\"range\"\n      [tickFormat]=\"tickFormat\" ticks=\"[ticks]\" tickValues=\"tickValues\"\n      [scale]=\"yScale\"></ng-axis>",
                        directives: [axis_component_1.AxisComponent]
                    }),
                    __param(0, core_8.Host()), 
                    __metadata('design:paramtypes', [chart_component_3.ChartComponent])
                ], YAxis);
                return YAxis;
            }());
            exports_11("YAxis", YAxis);
        }
    }
});
System.register("ng2-stockcharts", ["chart-canvas.component", "chart.component", "axes/xaxis.component", "axes/yaxis.component"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_12(exports);
    }
    return {
        setters:[
            function (chart_canvas_component_4_1) {
                exportStar_1(chart_canvas_component_4_1);
            },
            function (chart_component_4_1) {
                exportStar_1(chart_component_4_1);
            },
            function (xaxis_component_1_1) {
                exportStar_1(xaxis_component_1_1);
            },
            function (yaxis_component_1_1) {
                exportStar_1(yaxis_component_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=ng2-stockcharts-bundle.js.map