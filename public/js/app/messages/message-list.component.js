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
var core_1 = require("@angular/core");
var message_component_1 = require('./message.component');
var message_1 = require('./message');
var MessageListComponent = (function () {
    function MessageListComponent() {
        this.messages = [
            new message_1.Message('A new message', null, '1'),
            new message_1.Message('Another message', null, '2')
        ];
    }
    MessageListComponent = __decorate([
        core_1.Component({
            selector: 'chat-message-list',
            template: "\n\t\t<section class=\"col-md-8 col-md-offset-2\">\n\t\t\t<chat-message *ngFor=\"let message of messages\" [message]=\"message\" (editClicked)=\"message.content = $event\"></chat-message>\n\t\t</section>\n\t",
            directives: [message_component_1.MessageComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], MessageListComponent);
    return MessageListComponent;
}());
exports.MessageListComponent = MessageListComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzL21lc3NhZ2UtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4QyxrQ0FBK0IscUJBQXFCLENBQUMsQ0FBQTtBQUNyRCx3QkFBc0IsV0FBVyxDQUFDLENBQUE7QUFXbEM7SUFBQTtRQUVDLGFBQVEsR0FBYztZQUNyQixJQUFJLGlCQUFPLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUM7WUFDdkMsSUFBSSxpQkFBTyxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxHQUFHLENBQUM7U0FDekMsQ0FBQztJQUVILENBQUM7SUFoQkQ7UUFBQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixRQUFRLEVBQUUsaU5BSVQ7WUFDRCxVQUFVLEVBQUUsQ0FBQyxvQ0FBZ0IsQ0FBQztTQUM5QixDQUFDOzs0QkFBQTtJQVFGLDJCQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7QUFQWSw0QkFBb0IsdUJBT2hDLENBQUEiLCJmaWxlIjoibWVzc2FnZXMvbWVzc2FnZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtNZXNzYWdlQ29tcG9uZW50fSBmcm9tICcuL21lc3NhZ2UuY29tcG9uZW50JztcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSAnLi9tZXNzYWdlJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnY2hhdC1tZXNzYWdlLWxpc3QnLFxuXHR0ZW1wbGF0ZTogYFxuXHRcdDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG5cdFx0XHQ8Y2hhdC1tZXNzYWdlICpuZ0Zvcj1cImxldCBtZXNzYWdlIG9mIG1lc3NhZ2VzXCIgW21lc3NhZ2VdPVwibWVzc2FnZVwiIChlZGl0Q2xpY2tlZCk9XCJtZXNzYWdlLmNvbnRlbnQgPSAkZXZlbnRcIj48L2NoYXQtbWVzc2FnZT5cblx0XHQ8L3NlY3Rpb24+XG5cdGAsXG5cdGRpcmVjdGl2ZXM6IFtNZXNzYWdlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlTGlzdENvbXBvbmVudCB7XG5cblx0bWVzc2FnZXM6IE1lc3NhZ2VbXSA9IFtcblx0XHRuZXcgTWVzc2FnZSgnQSBuZXcgbWVzc2FnZScsIG51bGwsICcxJyksXG5cdFx0bmV3IE1lc3NhZ2UoJ0Fub3RoZXIgbWVzc2FnZScsIG51bGwsICcyJylcblx0XTtcblxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
