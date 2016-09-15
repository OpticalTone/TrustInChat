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
var message_list_component_1 = require('./messages/message-list.component');
var message_input_component_1 = require('./messages/message-input.component');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n\t\t<div class=\"row spacing\">\n\t\t\t<chat-message-input></chat-message-input>\n\t\t</div>\n\t\t<div class=\"row spacing\">\n\t\t\t<chat-message-list></chat-message-list>\n\t\t</div>\n\t",
            directives: [message_list_component_1.MessageListComponent, message_input_component_1.MessageInputComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4Qyx1Q0FBbUMsbUNBQW1DLENBQUMsQ0FBQTtBQUN2RSx3Q0FBb0Msb0NBQW9DLENBQUMsQ0FBQTtBQWN6RTtJQUFBO0lBSUEsQ0FBQztJQWhCRDtRQUFDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsUUFBUTtZQUNsQixRQUFRLEVBQUUsZ01BT1Q7WUFDRCxVQUFVLEVBQUUsQ0FBQyw2Q0FBb0IsRUFBRSwrQ0FBcUIsQ0FBQztTQUN6RCxDQUFDOztvQkFBQTtJQUtGLG1CQUFDO0FBQUQsQ0FKQSxBQUlDLElBQUE7QUFKWSxvQkFBWSxlQUl4QixDQUFBIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01lc3NhZ2VMaXN0Q29tcG9uZW50fSBmcm9tICcuL21lc3NhZ2VzL21lc3NhZ2UtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHtNZXNzYWdlSW5wdXRDb21wb25lbnR9IGZyb20gJy4vbWVzc2FnZXMvbWVzc2FnZS1pbnB1dC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdteS1hcHAnLFxuXHR0ZW1wbGF0ZTogYFxuXHRcdDxkaXYgY2xhc3M9XCJyb3cgc3BhY2luZ1wiPlxuXHRcdFx0PGNoYXQtbWVzc2FnZS1pbnB1dD48L2NoYXQtbWVzc2FnZS1pbnB1dD5cblx0XHQ8L2Rpdj5cblx0XHQ8ZGl2IGNsYXNzPVwicm93IHNwYWNpbmdcIj5cblx0XHRcdDxjaGF0LW1lc3NhZ2UtbGlzdD48L2NoYXQtbWVzc2FnZS1saXN0PlxuXHRcdDwvZGl2PlxuXHRgLFxuXHRkaXJlY3RpdmVzOiBbTWVzc2FnZUxpc3RDb21wb25lbnQsIE1lc3NhZ2VJbnB1dENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcblxuXHRcblxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
