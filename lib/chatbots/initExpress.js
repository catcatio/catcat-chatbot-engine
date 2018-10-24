"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
exports.default = ({ port }) => new Promise((resolve, reject) => {
    console.log('init express');
    const app = express();
    const server = app.listen(port, (err) => {
        if (err) {
            console.log(`Failed to start server on port ${port}`, err);
            reject(err);
        }
        console.log(`Listening http://localhost:${port}`);
        resolve({ app, server });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdEV4cHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2hhdGJvdHMvaW5pdEV4cHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBa0M7QUFHbEMsa0JBQWUsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FDMUIsSUFBSSxPQUFPLENBQTJDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ3hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDM0IsTUFBTSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUE7SUFFckIsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFVLEVBQUUsRUFBRTtRQUM3QyxJQUFJLEdBQUcsRUFBRTtZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLElBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBQzFELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUNaO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUNqRCxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtJQUMxQixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSAnaHR0cCdcblxuZXhwb3J0IGRlZmF1bHQgKHsgcG9ydCB9KSA9PlxuICBuZXcgUHJvbWlzZTx7IGFwcDogZXhwcmVzcy5FeHByZXNzLCBzZXJ2ZXI6IFNlcnZlciB9PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2luaXQgZXhwcmVzcycpXG4gICAgY29uc3QgYXBwID0gZXhwcmVzcygpXG5cbiAgICBjb25zdCBzZXJ2ZXIgPSBhcHAubGlzdGVuKHBvcnQsIChlcnI6IEVycm9yKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBGYWlsZWQgdG8gc3RhcnQgc2VydmVyIG9uIHBvcnQgJHtwb3J0fWAsIGVycilcbiAgICAgICAgcmVqZWN0KGVycilcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coYExpc3RlbmluZyBodHRwOi8vbG9jYWxob3N0OiR7cG9ydH1gKVxuICAgICAgcmVzb2x2ZSh7IGFwcCwgc2VydmVyIH0pXG4gICAgfSlcbiAgfSlcbiJdfQ==