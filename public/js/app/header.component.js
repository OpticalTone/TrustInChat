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
var HeaderComponent = (function () {
    function HeaderComponent() {
    }
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'chat-header',
            template: "\n\t\t<header class=\"row\">\n\t\t\t<nav class=\"col-md-8 col-md-offset-2\">\n\t\t\t\t<ul class=\"nav nav-pills\">\n\t\t\t\t\t<li><a [routerLink]=\"['/']\">Homepage</a></li>\n\t\t\t\t\t<li><a [routerLink]=\"['/chat']\">Chat</a></li>\n\t\t\t\t\t<li><a href=\"/#\">About</a></li>\n\t\t\t\t\t<li><a href=\"/#\">Help</a></li>\n\t\t\t\t</ul>\n\t\t\t</nav>\n\t\t</header>\n\t",
            styles: ["\n\t\theader {\n\t\t\tmargin-bottom: 20px;\n\t\t}\n\n\t\tul {\n\t\t\ttext-align: center;\n\t\t}\n\n\t\tli {\n\t\t\tfloat: none;\n\t\t\tdisplay: inline-block\n\t\t}\n\t"]
        }), 
        __metadata('design:paramtypes', [])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQStCeEM7SUFBQTtJQUVBLENBQUM7SUEvQkQ7UUFBQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLG1YQVdUO1lBQ0QsTUFBTSxFQUFFLENBQUMseUtBYVIsQ0FBQztTQUNGLENBQUM7O3VCQUFBO0lBR0Ysc0JBQUM7QUFBRCxDQUZBLEFBRUMsSUFBQTtBQUZZLHVCQUFlLGtCQUUzQixDQUFBIiwiZmlsZSI6ImhlYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ2NoYXQtaGVhZGVyJyxcblx0dGVtcGxhdGU6IGBcblx0XHQ8aGVhZGVyIGNsYXNzPVwicm93XCI+XG5cdFx0XHQ8bmF2IGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG5cdFx0XHRcdDx1bCBjbGFzcz1cIm5hdiBuYXYtcGlsbHNcIj5cblx0XHRcdFx0XHQ8bGk+PGEgW3JvdXRlckxpbmtdPVwiWycvJ11cIj5Ib21lcGFnZTwvYT48L2xpPlxuXHRcdFx0XHRcdDxsaT48YSBbcm91dGVyTGlua109XCJbJy9jaGF0J11cIj5DaGF0PC9hPjwvbGk+XG5cdFx0XHRcdFx0PGxpPjxhIGhyZWY9XCIvI1wiPkFib3V0PC9hPjwvbGk+XG5cdFx0XHRcdFx0PGxpPjxhIGhyZWY9XCIvI1wiPkhlbHA8L2E+PC9saT5cblx0XHRcdFx0PC91bD5cblx0XHRcdDwvbmF2PlxuXHRcdDwvaGVhZGVyPlxuXHRgLFxuXHRzdHlsZXM6IFtgXG5cdFx0aGVhZGVyIHtcblx0XHRcdG1hcmdpbi1ib3R0b206IDIwcHg7XG5cdFx0fVxuXG5cdFx0dWwge1xuXHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRcdH1cblxuXHRcdGxpIHtcblx0XHRcdGZsb2F0OiBub25lO1xuXHRcdFx0ZGlzcGxheTogaW5saW5lLWJsb2NrXG5cdFx0fVxuXHRgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWFkZXJDb21wb25lbnQge1xuXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
