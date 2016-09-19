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
var forms_2 = require('@angular/forms');
var app_routing_1 = require('./app.routing');
var app_component_1 = require('./app.component');
var message_component_1 = require('./messages/message.component');
var message_list_component_1 = require('./messages/message-list.component');
var message_input_component_1 = require('./messages/message-input.component');
var homepage_component_1 = require('./homepage/homepage.component');
var messages_component_1 = require('./messages/messages.component');
var header_component_1 = require('./header.component');
var message_service_1 = require('./messages/message.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_2.ReactiveFormsModule,
                app_routing_1.AppRoutingModule
            ],
            declarations: [
                app_routing_1.routingComponents,
                app_component_1.AppComponent,
                message_component_1.MessageComponent,
                message_list_component_1.MessageListComponent,
                homepage_component_1.HomepageComponent,
                message_input_component_1.MessageInputComponent,
                messages_component_1.MessagesComponent,
                header_component_1.HeaderComponent
            ],
            providers: [
                message_service_1.MessageService
            ],
            bootstrap: [
                [app_component_1.AppComponent]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUErQixlQUFlLENBQUMsQ0FBQTtBQUMvQyxpQ0FBK0IsMkJBQTJCLENBQUMsQ0FBQTtBQUMzRCxzQkFBNEIsZ0JBQWdCLENBQUMsQ0FBQTtBQUM3QyxzQkFBb0MsZ0JBQWdCLENBQUMsQ0FBQTtBQUNyRCw0QkFBb0QsZUFBZSxDQUFDLENBQUE7QUFFcEUsOEJBQStCLGlCQUFpQixDQUFDLENBQUE7QUFDakQsa0NBQWlDLDhCQUE4QixDQUFDLENBQUE7QUFDaEUsdUNBQXFDLG1DQUFtQyxDQUFDLENBQUE7QUFDekUsd0NBQXNDLG9DQUFvQyxDQUFDLENBQUE7QUFDM0UsbUNBQWtDLCtCQUErQixDQUFDLENBQUE7QUFDbEUsbUNBQWtDLCtCQUErQixDQUFDLENBQUE7QUFDbEUsaUNBQWdDLG9CQUFvQixDQUFDLENBQUE7QUFDckQsZ0NBQStCLDRCQUE0QixDQUFDLENBQUE7QUEwQjVEO0lBQUE7SUFBd0IsQ0FBQztJQXhCekI7UUFBQyxlQUFRLENBQUM7WUFDVCxPQUFPLEVBQUU7Z0JBQ0wsZ0NBQWE7Z0JBQ2IsbUJBQVc7Z0JBQ1gsMkJBQW1CO2dCQUNoQiw4QkFBZ0I7YUFDcEI7WUFDQSxZQUFZLEVBQUU7Z0JBQ1YsK0JBQWlCO2dCQUNqQiw0QkFBWTtnQkFDWixvQ0FBZ0I7Z0JBQ2hCLDZDQUFvQjtnQkFDcEIsc0NBQWlCO2dCQUNqQiwrQ0FBcUI7Z0JBQ3JCLHNDQUFpQjtnQkFDakIsa0NBQWU7YUFDbEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsZ0NBQWM7YUFDakI7WUFDRCxTQUFTLEVBQUc7Z0JBQ1gsQ0FBQyw0QkFBWSxDQUFDO2FBQ2Q7U0FDSixDQUFDOztpQkFBQTtJQUNzQixnQkFBQztBQUFELENBQXhCLEFBQXlCLElBQUE7QUFBWixpQkFBUyxZQUFHLENBQUEiLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlICB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSwgcm91dGluZ0NvbXBvbmVudHMgfSBmcm9tICcuL2FwcC5yb3V0aW5nJztcblxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gICBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVzc2FnZUNvbXBvbmVudCB9IGZyb20gJy4vbWVzc2FnZXMvbWVzc2FnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVzc2FnZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL21lc3NhZ2VzL21lc3NhZ2UtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVzc2FnZUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9tZXNzYWdlcy9tZXNzYWdlLWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIb21lcGFnZUNvbXBvbmVudCB9IGZyb20gJy4vaG9tZXBhZ2UvaG9tZXBhZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IE1lc3NhZ2VzQ29tcG9uZW50IH0gZnJvbSAnLi9tZXNzYWdlcy9tZXNzYWdlcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9tZXNzYWdlcy9tZXNzYWdlLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuXHRpbXBvcnRzOiBbXG4gICAgXHRCcm93c2VyTW9kdWxlLFxuICAgIFx0Rm9ybXNNb2R1bGUsXG4gICAgXHRSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlXG4gIFx0XSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgcm91dGluZ0NvbXBvbmVudHMsXG4gICAgICAgIEFwcENvbXBvbmVudCxcbiAgICAgICAgTWVzc2FnZUNvbXBvbmVudCxcbiAgICAgICAgTWVzc2FnZUxpc3RDb21wb25lbnQsXG4gICAgICAgIEhvbWVwYWdlQ29tcG9uZW50LFxuICAgICAgICBNZXNzYWdlSW5wdXRDb21wb25lbnQsXG4gICAgICAgIE1lc3NhZ2VzQ29tcG9uZW50LFxuICAgICAgICBIZWFkZXJDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBNZXNzYWdlU2VydmljZVxuICAgIF0sICBcbiAgICBib290c3RyYXA6ICBbXG5cdCAgICBbQXBwQ29tcG9uZW50XVxuICAgIF0gIFxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge30iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
