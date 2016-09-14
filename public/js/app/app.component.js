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
var message_component_1 = require('./messages/message.component');
var message_1 = require('./messages/message');
//import {User} from './homepage/user';
var AppComponent = (function () {
    function AppComponent() {
        this.message = new message_1.Message('A new message', null, '1');
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n\t\t<div class=\"row\">\n\t\t\t<section class=\"col-md-8 col-md-offset-2\">\n\t\t\t\t<chat-message [message]=\"message\" (editClicked)=\"message.content = $event\"></chat-message>\n\t\t\t</section>\n\t\t</div>\n\t",
            directives: [message_component_1.MessageComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4QyxrQ0FBK0IsOEJBQThCLENBQUMsQ0FBQTtBQUM5RCx3QkFBc0Isb0JBQW9CLENBQUMsQ0FBQTtBQUMzQyx1Q0FBdUM7QUFhdkM7SUFBQTtRQUVDLFlBQU8sR0FBWSxJQUFJLGlCQUFPLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUU1RCxDQUFDO0lBZkQ7UUFBQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFFBQVE7WUFDbEIsUUFBUSxFQUFFLHlOQU1UO1lBQ0QsVUFBVSxFQUFFLENBQUMsb0NBQWdCLENBQUM7U0FDOUIsQ0FBQzs7b0JBQUE7SUFLRixtQkFBQztBQUFELENBSkEsQUFJQyxJQUFBO0FBSlksb0JBQVksZUFJeEIsQ0FBQSIsImZpbGUiOiJhcHAuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlQ29tcG9uZW50fSBmcm9tICcuL21lc3NhZ2VzL21lc3NhZ2UuY29tcG9uZW50JztcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSAnLi9tZXNzYWdlcy9tZXNzYWdlJztcbi8vaW1wb3J0IHtVc2VyfSBmcm9tICcuL2hvbWVwYWdlL3VzZXInO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdteS1hcHAnLFxuXHR0ZW1wbGF0ZTogYFxuXHRcdDxkaXYgY2xhc3M9XCJyb3dcIj5cblx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG5cdFx0XHRcdDxjaGF0LW1lc3NhZ2UgW21lc3NhZ2VdPVwibWVzc2FnZVwiIChlZGl0Q2xpY2tlZCk9XCJtZXNzYWdlLmNvbnRlbnQgPSAkZXZlbnRcIj48L2NoYXQtbWVzc2FnZT5cblx0XHRcdDwvc2VjdGlvbj5cblx0XHQ8L2Rpdj5cblx0YCxcblx0ZGlyZWN0aXZlczogW01lc3NhZ2VDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG5cblx0bWVzc2FnZTogTWVzc2FnZSA9IG5ldyBNZXNzYWdlKCdBIG5ldyBtZXNzYWdlJywgbnVsbCwgJzEnKTtcblxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
