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
var message_1 = require("./message");
var MessageInputComponent = (function () {
    function MessageInputComponent() {
    }
    MessageInputComponent.prototype.onCreate = function (content) {
        var message = new message_1.Message(content, null, '1');
        console.log(message);
    };
    MessageInputComponent = __decorate([
        core_1.Component({
            selector: 'chat-message-input',
            template: "\n\t\t<section class=\"col-md-8 col-md-offset-2\">\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"context\">Content</label>\n\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"content\" #input>\n\t\t\t</div>\n\t\t\t<button type=\"submit\" class=\"btn btn-primary\" (click)=\"onCreate(input.value)\">Send Message</button>\n\t\t</section>\n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], MessageInputComponent);
    return MessageInputComponent;
}());
exports.MessageInputComponent = MessageInputComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzL21lc3NhZ2UtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMsd0JBQXNCLFdBQVcsQ0FBQyxDQUFBO0FBY2xDO0lBQUE7SUFLQSxDQUFDO0lBSkEsd0NBQVEsR0FBUixVQUFTLE9BQWU7UUFDdkIsSUFBTSxPQUFPLEdBQVksSUFBSSxpQkFBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBaEJGO1FBQUMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsUUFBUSxFQUFFLHFXQVFUO1NBQ0QsQ0FBQzs7NkJBQUE7SUFNRiw0QkFBQztBQUFELENBTEEsQUFLQyxJQUFBO0FBTFksNkJBQXFCLHdCQUtqQyxDQUFBIiwiZmlsZSI6Im1lc3NhZ2VzL21lc3NhZ2UtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gXCIuL21lc3NhZ2VcIjtcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnY2hhdC1tZXNzYWdlLWlucHV0Jyxcblx0dGVtcGxhdGU6IGBcblx0XHQ8c2VjdGlvbiBjbGFzcz1cImNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMlwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cblx0XHRcdFx0PGxhYmVsIGZvcj1cImNvbnRleHRcIj5Db250ZW50PC9sYWJlbD5cblx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cImNvbnRlbnRcIiAjaW5wdXQ+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgKGNsaWNrKT1cIm9uQ3JlYXRlKGlucHV0LnZhbHVlKVwiPlNlbmQgTWVzc2FnZTwvYnV0dG9uPlxuXHRcdDwvc2VjdGlvbj5cblx0YFxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlSW5wdXRDb21wb25lbnQge1xuXHRvbkNyZWF0ZShjb250ZW50OiBzdHJpbmcpIHtcblx0XHRjb25zdCBtZXNzYWdlOiBNZXNzYWdlID0gbmV3IE1lc3NhZ2UoY29udGVudCwgbnVsbCwgJzEnKTtcblx0XHRjb25zb2xlLmxvZyhtZXNzYWdlKTtcblx0fVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
