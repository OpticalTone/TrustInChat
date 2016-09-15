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
                app_routing_1.routing
            ],
            declarations: [
                app_component_1.AppComponent,
                message_component_1.MessageComponent,
                message_list_component_1.MessageListComponent,
                homepage_component_1.HomepageComponent,
                message_input_component_1.MessageInputComponent,
                messages_component_1.MessagesComponent,
                header_component_1.HeaderComponent
            ],
            providers: [
                message_service_1.MessageService,
                app_routing_1.appRoutingProviders
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUErQixlQUFlLENBQUMsQ0FBQTtBQUMvQyxpQ0FBK0IsMkJBQTJCLENBQUMsQ0FBQTtBQUMzRCxzQkFBNEIsZ0JBQWdCLENBQUMsQ0FBQTtBQUM3QyxzQkFBb0MsZ0JBQWdCLENBQUMsQ0FBQTtBQUNyRCw0QkFBNkMsZUFBZSxDQUFDLENBQUE7QUFFN0QsOEJBQStCLGlCQUFpQixDQUFDLENBQUE7QUFDakQsa0NBQWlDLDhCQUE4QixDQUFDLENBQUE7QUFDaEUsdUNBQXFDLG1DQUFtQyxDQUFDLENBQUE7QUFDekUsd0NBQXNDLG9DQUFvQyxDQUFDLENBQUE7QUFDM0UsbUNBQWtDLCtCQUErQixDQUFDLENBQUE7QUFDbEUsbUNBQWtDLCtCQUErQixDQUFDLENBQUE7QUFDbEUsaUNBQWdDLG9CQUFvQixDQUFDLENBQUE7QUFDckQsZ0NBQStCLDRCQUE0QixDQUFDLENBQUE7QUEwQjVEO0lBQUE7SUFBd0IsQ0FBQztJQXhCekI7UUFBQyxlQUFRLENBQUM7WUFDVCxPQUFPLEVBQUU7Z0JBQ0wsZ0NBQWE7Z0JBQ2IsbUJBQVc7Z0JBQ1gsMkJBQW1CO2dCQUNoQixxQkFBTzthQUNYO1lBQ0EsWUFBWSxFQUFFO2dCQUNWLDRCQUFZO2dCQUNaLG9DQUFnQjtnQkFDaEIsNkNBQW9CO2dCQUNwQixzQ0FBaUI7Z0JBQ2pCLCtDQUFxQjtnQkFDckIsc0NBQWlCO2dCQUNqQixrQ0FBZTthQUNsQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxnQ0FBYztnQkFDZCxpQ0FBbUI7YUFDdEI7WUFDRCxTQUFTLEVBQUc7Z0JBQ1gsQ0FBQyw0QkFBWSxDQUFDO2FBQ2Q7U0FDSixDQUFDOztpQkFBQTtJQUNzQixnQkFBQztBQUFELENBQXhCLEFBQXlCLElBQUE7QUFBWixpQkFBUyxZQUFHLENBQUEiLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlICB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgcm91dGluZywgYXBwUm91dGluZ1Byb3ZpZGVycyB9IGZyb20gJy4vYXBwLnJvdXRpbmcnO1xuXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSAgIGZyb20gJy4vYXBwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZXNzYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9tZXNzYWdlcy9tZXNzYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZXNzYWdlTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbWVzc2FnZXMvbWVzc2FnZS1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZXNzYWdlSW5wdXRDb21wb25lbnQgfSBmcm9tICcuL21lc3NhZ2VzL21lc3NhZ2UtaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IEhvbWVwYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9ob21lcGFnZS9ob21lcGFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVzc2FnZXNDb21wb25lbnQgfSBmcm9tICcuL21lc3NhZ2VzL21lc3NhZ2VzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2hlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UgfSBmcm9tICcuL21lc3NhZ2VzL21lc3NhZ2Uuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG5cdGltcG9ydHM6IFtcbiAgICBcdEJyb3dzZXJNb2R1bGUsXG4gICAgXHRGb3Jtc01vZHVsZSxcbiAgICBcdFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIHJvdXRpbmdcbiAgXHRdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBcHBDb21wb25lbnQsXG4gICAgICAgIE1lc3NhZ2VDb21wb25lbnQsXG4gICAgICAgIE1lc3NhZ2VMaXN0Q29tcG9uZW50LFxuICAgICAgICBIb21lcGFnZUNvbXBvbmVudCxcbiAgICAgICAgTWVzc2FnZUlucHV0Q29tcG9uZW50LFxuICAgICAgICBNZXNzYWdlc0NvbXBvbmVudCxcbiAgICAgICAgSGVhZGVyQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTWVzc2FnZVNlcnZpY2UsXG4gICAgICAgIGFwcFJvdXRpbmdQcm92aWRlcnNcbiAgICBdLCAgXG4gICAgYm9vdHN0cmFwOiAgW1xuXHQgICAgW0FwcENvbXBvbmVudF1cbiAgICBdICBcbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHt9Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
