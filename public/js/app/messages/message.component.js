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
//import {User} from '../homepage/user';
var MessageComponent = (function () {
    function MessageComponent() {
        this.editClicked = new core_1.EventEmitter();
    }
    MessageComponent.prototype.onClick = function () {
        this.editClicked.emit('Changed');
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
            template: "\n\t\t<article class=\"panel panel-default\">\n\t\t\t<div class=\"panel-body\">\n\t\t\t\t{{message.content}}\n\t\t\t</div>\n\t\t\t<footer class=\"panel-footer\">\n\t\t\t\t<div class=\"author\">\n\t\t\t\t\t{{message.userId}}\n\t\t\t\t</div>\n\t\t\t\t<div class=\"config\">\n\t\t\t\t\t<a href=\"#\" (click)=\"onClick()\">Edit</a>\n\t\t\t\t\t<a href=\"#\">Delete</a>\n\t\t\t\t</div>\n\t\t\t</footer>\t\t\n\t\t</article>\n\t",
            styles: ["\n\t\t.author {\n\t\t\tdisplay: inline-block;\n\t\t\tfont-style: italic;\n\t\t\tfont-size: 12px;\n\t\t\twidth: 80%;\n\t\t}\n\t\t.config {\n\t\t\tdisplay: inline-block;\n\t\t\ttext-align: right;\n\t\t\tfont-size: 12px;\n\t\t\twidth: 19%\n\t\t}\n\t"]
        }), 
        __metadata('design:paramtypes', [])
    ], MessageComponent);
    return MessageComponent;
}());
exports.MessageComponent = MessageComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzL21lc3NhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBcUQsZUFBZSxDQUFDLENBQUE7QUFDckUsd0JBQXNCLFdBQVcsQ0FBQyxDQUFBO0FBQ2xDLHdDQUF3QztBQW9DeEM7SUFBQTtRQUlXLGdCQUFXLEdBQUcsSUFBSSxtQkFBWSxFQUFVLENBQUM7SUFNcEQsQ0FBQztJQUpBLGtDQUFPLEdBQVA7UUFDQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBTkQ7UUFBQyxZQUFLLEVBQUU7O3FEQUFBO0lBRVI7UUFBQyxhQUFNLEVBQUU7O3lEQUFBO0lBckNWO1FBQUMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSxzYUFlVDtZQUNELE1BQU0sRUFBRSxDQUFDLHdQQWFSLENBQUM7U0FDRixDQUFDOzt3QkFBQTtJQVdGLHVCQUFDO0FBQUQsQ0FWQSxBQVVDLElBQUE7QUFWWSx3QkFBZ0IsbUJBVTVCLENBQUEiLCJmaWxlIjoibWVzc2FnZXMvbWVzc2FnZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSAnLi9tZXNzYWdlJztcbi8vaW1wb3J0IHtVc2VyfSBmcm9tICcuLi9ob21lcGFnZS91c2VyJztcblxuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdjaGF0LW1lc3NhZ2UnLFxuXHR0ZW1wbGF0ZTogYFxuXHRcdDxhcnRpY2xlIGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cblx0XHRcdFx0e3ttZXNzYWdlLmNvbnRlbnR9fVxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8Zm9vdGVyIGNsYXNzPVwicGFuZWwtZm9vdGVyXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJhdXRob3JcIj5cblx0XHRcdFx0XHR7e21lc3NhZ2UudXNlcklkfX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJjb25maWdcIj5cblx0XHRcdFx0XHQ8YSBocmVmPVwiI1wiIChjbGljayk9XCJvbkNsaWNrKClcIj5FZGl0PC9hPlxuXHRcdFx0XHRcdDxhIGhyZWY9XCIjXCI+RGVsZXRlPC9hPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZm9vdGVyPlx0XHRcblx0XHQ8L2FydGljbGU+XG5cdGAsXG5cdHN0eWxlczogW2Bcblx0XHQuYXV0aG9yIHtcblx0XHRcdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0XHRcdGZvbnQtc3R5bGU6IGl0YWxpYztcblx0XHRcdGZvbnQtc2l6ZTogMTJweDtcblx0XHRcdHdpZHRoOiA4MCU7XG5cdFx0fVxuXHRcdC5jb25maWcge1xuXHRcdFx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHRcdFx0dGV4dC1hbGlnbjogcmlnaHQ7XG5cdFx0XHRmb250LXNpemU6IDEycHg7XG5cdFx0XHR3aWR0aDogMTklXG5cdFx0fVxuXHRgXVxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQ29tcG9uZW50IHtcblxuXHRASW5wdXQoKSBtZXNzYWdlOk1lc3NhZ2U7XG5cblx0QE91dHB1dCgpIGVkaXRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cblx0b25DbGljaygpIHtcblx0XHR0aGlzLmVkaXRDbGlja2VkLmVtaXQoJ0NoYW5nZWQnKTtcblx0fVxuXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
