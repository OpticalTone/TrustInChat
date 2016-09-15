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
var message_1 = require('./message');
var message_service_1 = require("./message.service");
var MessageComponent = (function () {
    function MessageComponent(_messageService) {
        this._messageService = _messageService;
        this.editClicked = new core_1.EventEmitter();
    }
    MessageComponent.prototype.onEdit = function () {
        this._messageService.editMessage(this.message);
    };
    MessageComponent.prototype.onDelete = function () {
        this._messageService.deleteMessage(this.message);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', message_1.Message)
    ], MessageComponent.prototype, "message", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MessageComponent.prototype, "editClicked", void 0);
    MessageComponent = __decorate([
        core_1.Component({
            selector: 'chat-message',
            template: "\n\t\t<article class=\"panel panel-default\">\n\t\t\t<div class=\"panel-body\">\n\t\t\t\t{{message.content}}\n\t\t\t</div>\n\t\t\t<footer class=\"panel-footer\">\n\t\t\t\t<div class=\"author\">\n\t\t\t\t\t{{message.userId}}\n\t\t\t\t</div>\n\t\t\t\t<div class=\"config\">\n\t\t\t\t\t<a href=\"#\" (click)=\"onEdit()\">Edit</a>\n\t\t\t\t\t<a href=\"#\" (click)=\"onDelete()\">Delete</a>\n\t\t\t\t</div>\n\t\t\t</footer>\t\t\n\t\t</article>\n\t",
            styles: ["\n\t\t.author {\n\t\t\tdisplay: inline-block;\n\t\t\tfont-style: italic;\n\t\t\tfont-size: 12px;\n\t\t\twidth: 80%;\n\t\t}\n\t\t.config {\n\t\t\tdisplay: inline-block;\n\t\t\ttext-align: right;\n\t\t\tfont-size: 12px;\n\t\t\twidth: 19%\n\t\t}\n\t"]
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService])
    ], MessageComponent);
    return MessageComponent;
}());
exports.MessageComponent = MessageComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzL21lc3NhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBcUQsZUFBZSxDQUFDLENBQUE7QUFDckUsd0JBQXNCLFdBQVcsQ0FBQyxDQUFBO0FBQ2xDLGdDQUE2QixtQkFBbUIsQ0FBQyxDQUFBO0FBb0NqRDtJQU1DLDBCQUFvQixlQUErQjtRQUEvQixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFGekMsZ0JBQVcsR0FBRyxJQUFJLG1CQUFZLEVBQVUsQ0FBQztJQUVHLENBQUM7SUFFdkQsaUNBQU0sR0FBTjtRQUNDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBWkQ7UUFBQyxZQUFLLEVBQUU7O3FEQUFBO0lBRVI7UUFBQyxhQUFNLEVBQUU7O3lEQUFBO0lBckNWO1FBQUMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSw0YkFlVDtZQUNELE1BQU0sRUFBRSxDQUFDLHdQQWFSLENBQUM7U0FDRixDQUFDOzt3QkFBQTtJQWlCRix1QkFBQztBQUFELENBaEJBLEFBZ0JDLElBQUE7QUFoQlksd0JBQWdCLG1CQWdCNUIsQ0FBQSIsImZpbGUiOiJtZXNzYWdlcy9tZXNzYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlfSBmcm9tICcuL21lc3NhZ2UnO1xuaW1wb3J0IHtNZXNzYWdlU2VydmljZX0gZnJvbSBcIi4vbWVzc2FnZS5zZXJ2aWNlXCI7XG5cblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnY2hhdC1tZXNzYWdlJyxcblx0dGVtcGxhdGU6IGBcblx0XHQ8YXJ0aWNsZSBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XG5cdFx0XHRcdHt7bWVzc2FnZS5jb250ZW50fX1cblx0XHRcdDwvZGl2PlxuXHRcdFx0PGZvb3RlciBjbGFzcz1cInBhbmVsLWZvb3RlclwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYXV0aG9yXCI+XG5cdFx0XHRcdFx0e3ttZXNzYWdlLnVzZXJJZH19XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY29uZmlnXCI+XG5cdFx0XHRcdFx0PGEgaHJlZj1cIiNcIiAoY2xpY2spPVwib25FZGl0KClcIj5FZGl0PC9hPlxuXHRcdFx0XHRcdDxhIGhyZWY9XCIjXCIgKGNsaWNrKT1cIm9uRGVsZXRlKClcIj5EZWxldGU8L2E+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9mb290ZXI+XHRcdFxuXHRcdDwvYXJ0aWNsZT5cblx0YCxcblx0c3R5bGVzOiBbYFxuXHRcdC5hdXRob3Ige1xuXHRcdFx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHRcdFx0Zm9udC1zdHlsZTogaXRhbGljO1xuXHRcdFx0Zm9udC1zaXplOiAxMnB4O1xuXHRcdFx0d2lkdGg6IDgwJTtcblx0XHR9XG5cdFx0LmNvbmZpZyB7XG5cdFx0XHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG5cdFx0XHR0ZXh0LWFsaWduOiByaWdodDtcblx0XHRcdGZvbnQtc2l6ZTogMTJweDtcblx0XHRcdHdpZHRoOiAxOSVcblx0XHR9XG5cdGBdXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VDb21wb25lbnQge1xuXG5cdEBJbnB1dCgpIG1lc3NhZ2U6TWVzc2FnZTtcblxuXHRAT3V0cHV0KCkgZWRpdENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIF9tZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UpIHt9XG5cblx0b25FZGl0KCkge1xuXHRcdHRoaXMuX21lc3NhZ2VTZXJ2aWNlLmVkaXRNZXNzYWdlKHRoaXMubWVzc2FnZSk7XG5cdH1cblxuXHRvbkRlbGV0ZSgpIHtcblx0XHR0aGlzLl9tZXNzYWdlU2VydmljZS5kZWxldGVNZXNzYWdlKHRoaXMubWVzc2FnZSk7XG5cdH1cblxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
