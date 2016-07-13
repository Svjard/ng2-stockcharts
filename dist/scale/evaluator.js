"use strict";
var utils_1 = require('../utils');
;
var Evaluator = (function () {
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
exports.Evaluator = Evaluator;
//# sourceMappingURL=evaluator.js.map