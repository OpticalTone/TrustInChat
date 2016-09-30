// map tells the System loader where to look for things
var map = {
  // our app is within the app folder
    'app': 'js/app',

    // angular bundles
    '@angular/core': 'js/vendor/@angular/core/bundles/core.umd.js',
    '@angular/common': 'js/vendor/@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'js/vendor/@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'js/vendor/@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'js/vendor/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'js/vendor/@angular/http/bundles/http.umd.js',
    '@angular/router': 'js/vendor/@angular/router/bundles/router.umd.js',
    '@angular/forms': 'js/vendor/@angular/forms/bundles/forms.umd.js',

    // other libraries
    'rxjs':'js/vendor/rxjs',
    'crypto-js': 'js/vendor/crypto-js'
};

// packages tells the System loader how to load when no filename and/or no extension
var packages = {
    'app': { main: 'boot.js', defaultExtension: 'js' },
    'rxjs': { main: './Rx.js', defaultExtension: 'js' },
    'crypto-js': { format: 'cjs', defaultExtension: 'js', main: 'crypto-js.js' }
}
 var packageNames = [
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/http',
    '@angular/router',
    '@angular/forms'
];

packageNames.forEach(function(pkgName) {
   packages[pkgName] = { defaultExtension: 'js' };
});

var config = {
    map: map,
    packages: packages
};

System.config(config);