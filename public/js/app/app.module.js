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
var app_component_1 = require('./app.component');
var message_component_1 = require('./messages/message.component');
var message_list_component_1 = require('./messages/message-list.component');
var message_input_component_1 = require('./messages/message-input.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_2.ReactiveFormsModule
            ],
            declarations: [
                app_component_1.AppComponent,
                message_component_1.MessageComponent,
                message_list_component_1.MessageListComponent,
                message_input_component_1.MessageInputComponent
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUErQixlQUFlLENBQUMsQ0FBQTtBQUMvQyxpQ0FBK0IsMkJBQTJCLENBQUMsQ0FBQTtBQUMzRCxzQkFBNEIsZ0JBQWdCLENBQUMsQ0FBQTtBQUM3QyxzQkFBa0MsZ0JBQWdCLENBQUMsQ0FBQTtBQUVuRCw4QkFBK0IsaUJBQWlCLENBQUMsQ0FBQTtBQUNqRCxrQ0FBaUMsOEJBQThCLENBQUMsQ0FBQTtBQUNoRSx1Q0FBcUMsbUNBQW1DLENBQUMsQ0FBQTtBQUN6RSx3Q0FBc0Msb0NBQW9DLENBQUMsQ0FBQTtBQWtCM0U7SUFBQTtJQUF3QixDQUFDO0lBaEJ6QjtRQUFDLGVBQVEsQ0FBQztZQUNULE9BQU8sRUFBRTtnQkFDTCxnQ0FBYTtnQkFDYixtQkFBVztnQkFDWCwyQkFBbUI7YUFDcEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osNEJBQVk7Z0JBQ1osb0NBQWdCO2dCQUNoQiw2Q0FBb0I7Z0JBQ3BCLCtDQUFxQjthQUNyQjtZQUNELFNBQVMsRUFBRztnQkFDWCxDQUFDLDRCQUFZLENBQUM7YUFDZDtTQUNKLENBQUM7O2lCQUFBO0lBQ3NCLGdCQUFDO0FBQUQsQ0FBeEIsQUFBeUIsSUFBQTtBQUFaLGlCQUFTLFlBQUcsQ0FBQSIsImZpbGUiOiJhcHAubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7UmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSAgIGZyb20gJy4vYXBwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZXNzYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9tZXNzYWdlcy9tZXNzYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZXNzYWdlTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbWVzc2FnZXMvbWVzc2FnZS1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZXNzYWdlSW5wdXRDb21wb25lbnQgfSBmcm9tICcuL21lc3NhZ2VzL21lc3NhZ2UtaW5wdXQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcblx0aW1wb3J0czogW1xuICAgIFx0QnJvd3Nlck1vZHVsZSxcbiAgICBcdEZvcm1zTW9kdWxlLFxuICAgIFx0UmVhY3RpdmVGb3Jtc01vZHVsZVxuICBcdF0sXG4gIFx0ZGVjbGFyYXRpb25zOiBbXG4gICAgXHRBcHBDb21wb25lbnQsXG4gICAgXHRNZXNzYWdlQ29tcG9uZW50LFxuICAgIFx0TWVzc2FnZUxpc3RDb21wb25lbnQsXG4gICAgXHRNZXNzYWdlSW5wdXRDb21wb25lbnRcbiAgICBdLFxuICAgIGJvb3RzdHJhcDogIFtcblx0ICAgIFtBcHBDb21wb25lbnRdXG4gICAgXSAgXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7fSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
