// @AngularClass
Error.stackTraceLimit = Infinity;

var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

testing.setBaseTestProviders(
  browser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  browser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
);

var testContext = require.context('./src', true, /\.spec\.ts/);
testContext.keys().forEach(testContext);
