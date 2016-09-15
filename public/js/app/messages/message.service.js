"use strict";
var message_1 = require("./message");
var MessageService = (function () {
    function MessageService() {
        this.messages = [];
    }
    MessageService.prototype.addMessage = function (message) {
        this.messages.push(message);
        console.log(this.messages);
    };
    MessageService.prototype.getMessages = function () {
        return this.messages;
    };
    MessageService.prototype.editMessage = function (message) {
        this.messages[this.messages.indexOf(message)] = new message_1.Message('Edited', null, '1');
    };
    MessageService.prototype.deleteMessage = function (message) {
        this.messages.splice(this.messages.indexOf(message), 1);
    };
    return MessageService;
}());
exports.MessageService = MessageService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzL21lc3NhZ2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsd0JBQXNCLFdBQVcsQ0FBQyxDQUFBO0FBRWxDO0lBQUE7UUFDQyxhQUFRLEdBQWMsRUFBRSxDQUFDO0lBa0IxQixDQUFDO0lBaEJBLG1DQUFVLEdBQVYsVUFBVyxPQUFnQjtRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxvQ0FBVyxHQUFYLFVBQVksT0FBZ0I7UUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksaUJBQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRCxzQ0FBYSxHQUFiLFVBQWMsT0FBZ0I7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNGLHFCQUFDO0FBQUQsQ0FuQkEsQUFtQkMsSUFBQTtBQW5CWSxzQkFBYyxpQkFtQjFCLENBQUEiLCJmaWxlIjoibWVzc2FnZXMvbWVzc2FnZS5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNZXNzYWdlfSBmcm9tIFwiLi9tZXNzYWdlXCI7XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlU2VydmljZSB7XG5cdG1lc3NhZ2VzOiBNZXNzYWdlW10gPSBbXTtcblxuXHRhZGRNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2UpIHtcblx0XHR0aGlzLm1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG5cdFx0Y29uc29sZS5sb2codGhpcy5tZXNzYWdlcyk7XG5cdH1cblxuXHRnZXRNZXNzYWdlcygpIHtcblx0XHRyZXR1cm4gdGhpcy5tZXNzYWdlcztcblx0fVxuXG5cdGVkaXRNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2UpIHtcblx0XHR0aGlzLm1lc3NhZ2VzW3RoaXMubWVzc2FnZXMuaW5kZXhPZihtZXNzYWdlKV0gPSBuZXcgTWVzc2FnZSgnRWRpdGVkJywgbnVsbCwgJzEnKTtcblx0fVxuXG5cdGRlbGV0ZU1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZSkge1xuXHRcdHRoaXMubWVzc2FnZXMuc3BsaWNlKHRoaXMubWVzc2FnZXMuaW5kZXhPZihtZXNzYWdlKSwgMSk7XG5cdH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
