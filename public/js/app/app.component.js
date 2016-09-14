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
            //moduleId: module.id,
            selector: 'my-app',
            //templateUrl: 'app.component.html'
            template: "\n\t\t\n\t\t<div class=\"row\">\n\t\t\t<section class=\"col-md-8 col-md-offset-2\">\n\t\t\t\t<chat-message [message]=\"message\"></chat-message>\n\t\t\t</section>\n\t\t</div>\n\t",
            directives: [message_component_1.MessageComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4QyxrQ0FBK0IsOEJBQThCLENBQUMsQ0FBQTtBQUM5RCx3QkFBc0Isb0JBQW9CLENBQUMsQ0FBQTtBQUMzQyx1Q0FBdUM7QUFnQnZDO0lBQUE7UUFFQyxZQUFPLEdBQVksSUFBSSxpQkFBTyxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFNUQsQ0FBQztJQWxCRDtRQUFDLGdCQUFTLENBQUM7WUFDVixzQkFBc0I7WUFDdEIsUUFBUSxFQUFFLFFBQVE7WUFDbEIsbUNBQW1DO1lBQ25DLFFBQVEsRUFBRSxvTEFPVDtZQUNELFVBQVUsRUFBRSxDQUFDLG9DQUFnQixDQUFDO1NBQzlCLENBQUM7O29CQUFBO0lBS0YsbUJBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUpZLG9CQUFZLGVBSXhCLENBQUEiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWVzc2FnZUNvbXBvbmVudH0gZnJvbSAnLi9tZXNzYWdlcy9tZXNzYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gJy4vbWVzc2FnZXMvbWVzc2FnZSc7XG4vL2ltcG9ydCB7VXNlcn0gZnJvbSAnLi9ob21lcGFnZS91c2VyJztcblxuQENvbXBvbmVudCh7XG5cdC8vbW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdteS1hcHAnLFxuXHQvL3RlbXBsYXRlVXJsOiAnYXBwLmNvbXBvbmVudC5odG1sJ1xuXHR0ZW1wbGF0ZTogYFxuXHRcdFxuXHRcdDxkaXYgY2xhc3M9XCJyb3dcIj5cblx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG5cdFx0XHRcdDxjaGF0LW1lc3NhZ2UgW21lc3NhZ2VdPVwibWVzc2FnZVwiPjwvY2hhdC1tZXNzYWdlPlxuXHRcdFx0PC9zZWN0aW9uPlxuXHRcdDwvZGl2PlxuXHRgLFxuXHRkaXJlY3RpdmVzOiBbTWVzc2FnZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcblxuXHRtZXNzYWdlOiBNZXNzYWdlID0gbmV3IE1lc3NhZ2UoJ0EgbmV3IG1lc3NhZ2UnLCBudWxsLCAnMScpO1xuXHRcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
