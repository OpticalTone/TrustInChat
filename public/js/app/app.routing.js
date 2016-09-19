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
var router_1 = require('@angular/router');
var homepage_component_1 = require('./homepage/homepage.component');
var messages_component_1 = require('./messages/messages.component');
var appRoutes = [
    { path: '', component: homepage_component_1.HomepageComponent },
    { path: 'chat', component: messages_component_1.MessagesComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(appRoutes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
exports.routingComponents = [homepage_component_1.HomepageComponent, messages_component_1.MessagesComponent];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5yb3V0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsdUJBQXFDLGlCQUFpQixDQUFDLENBQUE7QUFDdkQsbUNBQWdDLCtCQUErQixDQUFDLENBQUE7QUFDaEUsbUNBQWdDLCtCQUErQixDQUFDLENBQUE7QUFFaEUsSUFBTSxTQUFTLEdBQVc7SUFDekIsRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxzQ0FBaUIsRUFBQztJQUN4QyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLHNDQUFpQixFQUFFO0NBQzdDLENBQUE7QUFNRDtJQUFBO0lBQWdDLENBQUM7SUFKakM7UUFBQyxlQUFRLENBQUM7WUFDVCxPQUFPLEVBQUUsQ0FBQyxxQkFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMxQyxPQUFPLEVBQUUsQ0FBQyxxQkFBWSxDQUFDO1NBQ3ZCLENBQUM7O3dCQUFBO0lBQzhCLHVCQUFDO0FBQUQsQ0FBaEMsQUFBaUMsSUFBQTtBQUFwQix3QkFBZ0IsbUJBQUksQ0FBQTtBQUVwQix5QkFBaUIsR0FBRyxDQUFDLHNDQUFpQixFQUFFLHNDQUFpQixDQUFDLENBQUMiLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnOyAgXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge0hvbWVwYWdlQ29tcG9uZW50fSBmcm9tICcuL2hvbWVwYWdlL2hvbWVwYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQge01lc3NhZ2VzQ29tcG9uZW50fSBmcm9tICcuL21lc3NhZ2VzL21lc3NhZ2VzLmNvbXBvbmVudCc7XG5cbmNvbnN0IGFwcFJvdXRlczogUm91dGVzID0gW1xuXHR7cGF0aDogJycsIGNvbXBvbmVudDogSG9tZXBhZ2VDb21wb25lbnR9LFxuXHR7cGF0aDogJ2NoYXQnLCBjb21wb25lbnQ6IE1lc3NhZ2VzQ29tcG9uZW50IH1cbl1cblxuQE5nTW9kdWxlKHtcblx0aW1wb3J0czogW1JvdXRlck1vZHVsZS5mb3JSb290KGFwcFJvdXRlcyldLFxuXHRleHBvcnRzOiBbUm91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHsgfVxuXG5leHBvcnQgY29uc3Qgcm91dGluZ0NvbXBvbmVudHMgPSBbSG9tZXBhZ2VDb21wb25lbnQsIE1lc3NhZ2VzQ29tcG9uZW50XTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
