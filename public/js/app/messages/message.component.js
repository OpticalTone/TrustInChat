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
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', message_1.Message)
    ], MessageComponent.prototype, "message", void 0);
    MessageComponent = __decorate([
        core_1.Component({
            selector: 'chat-message',
            template: "\n\t\t<article class=\"panel panel-default\">\n\t\t\t<div class=\"panel-body\">\n\t\t\t\t{{message.content}}\n\t\t\t</div>\n\t\t\t<footer class=\"panel-footer\">\n\t\t\t\t<div class=\"author\">\n\t\t\t\t\t{{message.userId}}\n\t\t\t\t</div>\n\t\t\t\t<div class=\"config\">\n\t\t\t\t\t<a href=\"#\">Edit</a>\n\t\t\t\t\t<a href=\"#\">Delete</a>\n\t\t\t\t</div>\n\t\t\t</footer>\t\t\n\t\t</article>\n\t",
            styles: ["\n\t\t.author {\n\t\t\tdisplay: inline-block;\n\t\t\tfont-style: italic;\n\t\t\tfont-size: 12px;\n\t\t\twidth: 80%;\n\t\t}\n\t\t.config {\n\t\t\tdisplay: inline-block;\n\t\t\ttext-align: right;\n\t\t\tfont-size: 12px;\n\t\t\twidth: 19%\n\t\t}\n\t"]
        }), 
        __metadata('design:paramtypes', [])
    ], MessageComponent);
    return MessageComponent;
}());
exports.MessageComponent = MessageComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzL21lc3NhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBK0IsZUFBZSxDQUFDLENBQUE7QUFDL0Msd0JBQXNCLFdBQVcsQ0FBQyxDQUFBO0FBQ2xDLHdDQUF3QztBQW9DeEM7SUFBQTtJQUlBLENBQUM7SUFGQTtRQUFDLFlBQUssRUFBRTs7cURBQUE7SUFuQ1Q7UUFBQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGNBQWM7WUFDeEIsUUFBUSxFQUFFLGdaQWVUO1lBQ0QsTUFBTSxFQUFFLENBQUMsd1BBYVIsQ0FBQztTQUNGLENBQUM7O3dCQUFBO0lBS0YsdUJBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUpZLHdCQUFnQixtQkFJNUIsQ0FBQSIsImZpbGUiOiJtZXNzYWdlcy9tZXNzYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gJy4vbWVzc2FnZSc7XG4vL2ltcG9ydCB7VXNlcn0gZnJvbSAnLi4vaG9tZXBhZ2UvdXNlcic7XG5cblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnY2hhdC1tZXNzYWdlJyxcblx0dGVtcGxhdGU6IGBcblx0XHQ8YXJ0aWNsZSBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XG5cdFx0XHRcdHt7bWVzc2FnZS5jb250ZW50fX1cblx0XHRcdDwvZGl2PlxuXHRcdFx0PGZvb3RlciBjbGFzcz1cInBhbmVsLWZvb3RlclwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYXV0aG9yXCI+XG5cdFx0XHRcdFx0e3ttZXNzYWdlLnVzZXJJZH19XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY29uZmlnXCI+XG5cdFx0XHRcdFx0PGEgaHJlZj1cIiNcIj5FZGl0PC9hPlxuXHRcdFx0XHRcdDxhIGhyZWY9XCIjXCI+RGVsZXRlPC9hPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZm9vdGVyPlx0XHRcblx0XHQ8L2FydGljbGU+XG5cdGAsXG5cdHN0eWxlczogW2Bcblx0XHQuYXV0aG9yIHtcblx0XHRcdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0XHRcdGZvbnQtc3R5bGU6IGl0YWxpYztcblx0XHRcdGZvbnQtc2l6ZTogMTJweDtcblx0XHRcdHdpZHRoOiA4MCU7XG5cdFx0fVxuXHRcdC5jb25maWcge1xuXHRcdFx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHRcdFx0dGV4dC1hbGlnbjogcmlnaHQ7XG5cdFx0XHRmb250LXNpemU6IDEycHg7XG5cdFx0XHR3aWR0aDogMTklXG5cdFx0fVxuXHRgXVxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQ29tcG9uZW50IHtcblxuXHRASW5wdXQoKSBtZXNzYWdlOk1lc3NhZ2U7XG5cdFxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
