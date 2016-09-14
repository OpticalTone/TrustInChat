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
                message_component_1.MessageComponent
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUErQixlQUFlLENBQUMsQ0FBQTtBQUMvQyxpQ0FBK0IsMkJBQTJCLENBQUMsQ0FBQTtBQUMzRCxzQkFBNEIsZ0JBQWdCLENBQUMsQ0FBQTtBQUM3QyxzQkFBa0MsZ0JBQWdCLENBQUMsQ0FBQTtBQUVuRCw4QkFBK0IsaUJBQWlCLENBQUMsQ0FBQTtBQUNqRCxrQ0FBaUMsOEJBQThCLENBQUMsQ0FBQTtBQWdCaEU7SUFBQTtJQUF3QixDQUFDO0lBZHpCO1FBQUMsZUFBUSxDQUFDO1lBQ1QsT0FBTyxFQUFFO2dCQUNMLGdDQUFhO2dCQUNiLG1CQUFXO2dCQUNYLDJCQUFtQjthQUNwQjtZQUNELFlBQVksRUFBRTtnQkFDWiw0QkFBWTtnQkFDWixvQ0FBZ0I7YUFDaEI7WUFDRCxTQUFTLEVBQUc7Z0JBQ1gsQ0FBQyw0QkFBWSxDQUFDO2FBQ2Q7U0FDSixDQUFDOztpQkFBQTtJQUNzQixnQkFBQztBQUFELENBQXhCLEFBQXlCLElBQUE7QUFBWixpQkFBUyxZQUFHLENBQUEiLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlICB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1JlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gICBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVzc2FnZUNvbXBvbmVudCB9IGZyb20gJy4vbWVzc2FnZXMvbWVzc2FnZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuXHRpbXBvcnRzOiBbXG4gICAgXHRCcm93c2VyTW9kdWxlLFxuICAgIFx0Rm9ybXNNb2R1bGUsXG4gICAgXHRSZWFjdGl2ZUZvcm1zTW9kdWxlXG4gIFx0XSxcbiAgXHRkZWNsYXJhdGlvbnM6IFtcbiAgICBcdEFwcENvbXBvbmVudCxcbiAgICBcdE1lc3NhZ2VDb21wb25lbnRcbiAgICBdLFxuICAgIGJvb3RzdHJhcDogIFtcblx0ICAgIFtBcHBDb21wb25lbnRdXG4gICAgXSAgXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7fSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
