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
var message_service_1 = require('./message.service');
var MessageListComponent = (function () {
    function MessageListComponent(_messageService) {
        this._messageService = _messageService;
    }
    MessageListComponent.prototype.ngOnInit = function () {
        this.messages = this._messageService.getMessages();
    };
    MessageListComponent = __decorate([
        core_1.Component({
            selector: 'chat-message-list',
            template: "\n\t\t<section class=\"col-md-8 col-md-offset-2\">\n\t\t\t<chat-message *ngFor=\"let message of messages\" [message]=\"message\" (editClicked)=\"message.content = $event\"></chat-message>\n\t\t</section>\n\t",
            directives: [message_component_1.MessageComponent]
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService])
    ], MessageListComponent);
    return MessageListComponent;
}());
exports.MessageListComponent = MessageListComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzL21lc3NhZ2UtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFnQyxlQUFlLENBQUMsQ0FBQTtBQUNoRCxrQ0FBK0IscUJBQXFCLENBQUMsQ0FBQTtBQUNyRCxnQ0FBNkIsbUJBQW1CLENBQUMsQ0FBQTtBQVlqRDtJQUVDLDhCQUFvQixlQUErQjtRQUEvQixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7SUFBRyxDQUFDO0lBSXZELHVDQUFRLEdBQVI7UUFDQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEQsQ0FBQztJQWpCRjtRQUFDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFFBQVEsRUFBRSxpTkFJVDtZQUNELFVBQVUsRUFBRSxDQUFDLG9DQUFnQixDQUFDO1NBQzlCLENBQUM7OzRCQUFBO0lBV0YsMkJBQUM7QUFBRCxDQVZBLEFBVUMsSUFBQTtBQVZZLDRCQUFvQix1QkFVaEMsQ0FBQSIsImZpbGUiOiJtZXNzYWdlcy9tZXNzYWdlLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7TWVzc2FnZUNvbXBvbmVudH0gZnJvbSAnLi9tZXNzYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQge01lc3NhZ2VTZXJ2aWNlfSBmcm9tICcuL21lc3NhZ2Uuc2VydmljZSc7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gJy4vbWVzc2FnZSc7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ2NoYXQtbWVzc2FnZS1saXN0Jyxcblx0dGVtcGxhdGU6IGBcblx0XHQ8c2VjdGlvbiBjbGFzcz1cImNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMlwiPlxuXHRcdFx0PGNoYXQtbWVzc2FnZSAqbmdGb3I9XCJsZXQgbWVzc2FnZSBvZiBtZXNzYWdlc1wiIFttZXNzYWdlXT1cIm1lc3NhZ2VcIiAoZWRpdENsaWNrZWQpPVwibWVzc2FnZS5jb250ZW50ID0gJGV2ZW50XCI+PC9jaGF0LW1lc3NhZ2U+XG5cdFx0PC9zZWN0aW9uPlxuXHRgLFxuXHRkaXJlY3RpdmVzOiBbTWVzc2FnZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgX21lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSkge31cblxuXHRtZXNzYWdlczogTWVzc2FnZVtdO1xuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMubWVzc2FnZXMgPSB0aGlzLl9tZXNzYWdlU2VydmljZS5nZXRNZXNzYWdlcygpO1xuXHR9XG5cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
