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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var message_component_1 = require('./message.component');
var MessageModule = (function () {
    function MessageModule() {
    }
    MessageModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule
            ],
            declarations: [
                message_component_1.MessageComponent
            ],
            bootstrap: [
                [message_component_1.MessageComponent]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], MessageModule);
    return MessageModule;
}());
exports.MessageModule = MessageModule;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzL21lc3NhZ2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBK0IsZUFBZSxDQUFDLENBQUE7QUFDL0MsaUNBQStCLDJCQUEyQixDQUFDLENBQUE7QUFDM0Qsc0JBQTRCLGdCQUFnQixDQUFDLENBQUE7QUFFN0Msa0NBQWlDLHFCQUFxQixDQUFDLENBQUE7QUFjdkQ7SUFBQTtJQUE0QixDQUFDO0lBWjdCO1FBQUMsZUFBUSxDQUFDO1lBQ1QsT0FBTyxFQUFFO2dCQUNMLGdDQUFhO2dCQUNiLG1CQUFXO2FBQ1o7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osb0NBQWdCO2FBQ2hCO1lBQ0QsU0FBUyxFQUFHO2dCQUNYLENBQUMsb0NBQWdCLENBQUM7YUFDbEI7U0FDSixDQUFDOztxQkFBQTtJQUMwQixvQkFBQztBQUFELENBQTVCLEFBQTZCLElBQUE7QUFBaEIscUJBQWEsZ0JBQUcsQ0FBQSIsImZpbGUiOiJtZXNzYWdlcy9tZXNzYWdlLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlICB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE1lc3NhZ2VDb21wb25lbnQgfSBmcm9tICcuL21lc3NhZ2UuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcblx0aW1wb3J0czogW1xuICAgIFx0QnJvd3Nlck1vZHVsZSxcbiAgICBcdEZvcm1zTW9kdWxlXG4gIFx0XSxcbiAgXHRkZWNsYXJhdGlvbnM6IFtcbiAgICBcdE1lc3NhZ2VDb21wb25lbnRcbiAgICBdLFxuICAgIGJvb3RzdHJhcDogIFtcblx0ICAgIFtNZXNzYWdlQ29tcG9uZW50XVxuICAgIF0gIFxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlTW9kdWxlIHt9Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
