"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const initExpress_1 = require("./initExpress");
const express_1 = require("express");
exports.default = (config) => __awaiter(this, void 0, void 0, function* () {
    const routers = require('./routers');
    const botRouter = express_1.Router();
    let express;
    const start = () => __awaiter(this, void 0, void 0, function* () {
        express = yield initExpress_1.default(config);
        express.app.use(botRouter);
        express.app.use((req, res, next) => {
            const err = new Error('Not Found');
            const tmp = err;
            tmp.status = 404;
            next(err);
        });
        express.app.use((err, req, res, next) => {
            const status = err.status || 500;
            res.status(status);
            res.send(`${status} ${err.message}`);
        });
        console.log('server started');
        return this;
    });
    const stop = () => __awaiter(this, void 0, void 0, function* () {
        express.server.close(() => {
            console.log('Http server closed.');
        });
        return this;
    });
    const register = (chatbot) => __awaiter(this, void 0, void 0, function* () {
        console.log(`register bot: ${chatbot.name}`);
        botRouter.use(`/${chatbot.name}`, routers(chatbot));
        return this;
    });
    return {
        start,
        stop,
        register
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoYXRib3RzL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsK0NBQXVDO0FBQ3ZDLHFDQUFnQztBQUVoQyxrQkFBZSxDQUFPLE1BQXlCLEVBQXdCLEVBQUU7SUFDdkUsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ3BDLE1BQU0sU0FBUyxHQUFHLGdCQUFNLEVBQUUsQ0FBQTtJQUMxQixJQUFJLE9BR0gsQ0FBQTtJQUVELE1BQU0sS0FBSyxHQUFHLEdBQVMsRUFBRTtRQUN2QixPQUFPLEdBQUcsTUFBTSxxQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUNqQyxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFVLENBQUE7WUFDdEIsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7WUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ1gsQ0FBQyxDQUFDLENBQUE7UUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ3RDLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFBO1lBQ2hDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDbEIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtRQUN0QyxDQUFDLENBQUMsQ0FBQTtRQUVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUM3QixPQUFPLElBQUksQ0FBQTtJQUNiLENBQUMsQ0FBQSxDQUFBO0lBRUQsTUFBTSxJQUFJLEdBQUcsR0FBUyxFQUFFO1FBQ3RCLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUMsQ0FBQSxDQUFBO0lBRUQsTUFBTSxRQUFRLEdBQUcsQ0FBTyxPQUFpQixFQUFFLEVBQUU7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7UUFDNUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUNuRCxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUMsQ0FBQSxDQUFBO0lBRUQsT0FBTztRQUNMLEtBQUs7UUFDTCxJQUFJO1FBQ0osUUFBUTtLQUNULENBQUE7QUFDSCxDQUFDLENBQUEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDaGF0U2VydmVyQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCBpbml0RXhwcmVzcyBmcm9tICcuL2luaXRFeHByZXNzJ1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcydcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKGNvbmZpZzogSUNoYXRTZXJ2ZXJDb25maWcpOiBQcm9taXNlPElDaGF0U2VydmVyPiA9PiB7XG4gIGNvbnN0IHJvdXRlcnMgPSByZXF1aXJlKCcuL3JvdXRlcnMnKVxuICBjb25zdCBib3RSb3V0ZXIgPSBSb3V0ZXIoKVxuICBsZXQgZXhwcmVzczoge1xuICAgIGFwcDogYW55LFxuICAgIHNlcnZlcjogYW55XG4gIH1cblxuICBjb25zdCBzdGFydCA9IGFzeW5jICgpID0+IHtcbiAgICBleHByZXNzID0gYXdhaXQgaW5pdEV4cHJlc3MoY29uZmlnKVxuICAgIGV4cHJlc3MuYXBwLnVzZShib3RSb3V0ZXIpXG4gICAgZXhwcmVzcy5hcHAudXNlKChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKCdOb3QgRm91bmQnKVxuICAgICAgY29uc3QgdG1wID0gZXJyIGFzIGFueVxuICAgICAgdG1wLnN0YXR1cyA9IDQwNFxuICAgICAgbmV4dChlcnIpXG4gICAgfSlcblxuICAgIGV4cHJlc3MuYXBwLnVzZSgoZXJyLCByZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdHVzID0gZXJyLnN0YXR1cyB8fCA1MDBcbiAgICAgIHJlcy5zdGF0dXMoc3RhdHVzKVxuICAgICAgcmVzLnNlbmQoYCR7c3RhdHVzfSAke2Vyci5tZXNzYWdlfWApXG4gICAgfSlcblxuICAgIGNvbnNvbGUubG9nKCdzZXJ2ZXIgc3RhcnRlZCcpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGNvbnN0IHN0b3AgPSBhc3luYyAoKSA9PiB7XG4gICAgZXhwcmVzcy5zZXJ2ZXIuY2xvc2UoKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0h0dHAgc2VydmVyIGNsb3NlZC4nKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBjb25zdCByZWdpc3RlciA9IGFzeW5jIChjaGF0Ym90OiBJQ2hhdGJvdCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGByZWdpc3RlciBib3Q6ICR7Y2hhdGJvdC5uYW1lfWApXG4gICAgYm90Um91dGVyLnVzZShgLyR7Y2hhdGJvdC5uYW1lfWAsIHJvdXRlcnMoY2hhdGJvdCkpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc3RhcnQsXG4gICAgc3RvcCxcbiAgICByZWdpc3RlclxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNoYXRib3Qge1xuICBuYW1lOiBzdHJpbmdcbiAgcHJvdmlkZXJzQ29uZmlnOiBhbnlcbiAgbWVzc2FnZUhhbmRsZXI6IGFueVxuICBmdWxmaWxsbWVudEhhbmRsZXI6IGFueVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDaGF0U2VydmVyIHtcbiAgc3RhcnRcbiAgc3RvcFxuICByZWdpc3RlclxufSJdfQ==