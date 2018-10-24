"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs_1 = require("fs");
const path = require("path");
const wrapLazyRequestHandler = (requestHandlerModule, messageHandlerAsync, providerConfig) => {
    const handler = require(`./${requestHandlerModule}`)(providerConfig, messageHandlerAsync);
    return (req, res) => __awaiter(this, void 0, void 0, function* () { return handler(req, res); });
};
const getProviders = (source) => {
    const isDirectory = source => fs_1.lstatSync(source).isDirectory();
    return fs_1.readdirSync(source).filter(d => isDirectory(path.join(source, d)));
};
module.exports = (providerConfigs, messageHandler) => {
    console.log('init webhook');
    const messageHandlerAsync = (handler) => (prasedMessage, originalMessage) => __awaiter(this, void 0, void 0, function* () {
        return yield handler(prasedMessage, originalMessage); // to ensure messageHandler is a promise
    });
    const providers = getProviders(__dirname);
    const router = require('express').Router();
    providers
        .filter(provider => providerConfigs[provider])
        .forEach(provider => {
        console.log(`init chat provider: ${provider}`);
        router.use(`/${provider}`, wrapLazyRequestHandler(provider, messageHandlerAsync(messageHandler), providerConfigs[provider]));
    });
    router.use('/', (req, res) => res.status(401).send('hmm..'));
    return router;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2hhdGJvdHMvd2ViaG9vay9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQkFBMkM7QUFDM0MsNkJBQTRCO0FBSTVCLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxtQkFBbUIsRUFBRSxjQUFjLEVBQUUsRUFBRTtJQUMzRixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsY0FBYyxFQUFFLG1CQUFtQixDQUFDLENBQUE7SUFDekYsT0FBTyxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxnREFBQyxPQUFBLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUEsR0FBQSxDQUFBO0FBQzlDLENBQUMsQ0FBQTtBQUVELE1BQU0sWUFBWSxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUU7SUFDOUIsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxjQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDN0QsT0FBTyxnQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDM0UsQ0FBQyxDQUFBO0FBRUQsaUJBQVMsQ0FBQyxlQUFlLEVBQUUsY0FBYyxFQUFFLEVBQUU7SUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUMzQixNQUFNLG1CQUFtQixHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFPLGFBQTZCLEVBQUUsZUFBb0IsRUFBRSxFQUFFO1FBQ3JHLE9BQU8sTUFBTSxPQUFPLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFBLENBQUMsd0NBQXdDO0lBQy9GLENBQUMsQ0FBQSxDQUFBO0lBRUQsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3pDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUMxQyxTQUFTO1NBQ04sTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzdDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQzlDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLENBQUMsY0FBYyxDQUFDLEVBQUUsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUM5SCxDQUFDLENBQUMsQ0FBQTtJQUVKLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUM1RCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlYWRkaXJTeW5jLCBsc3RhdFN5bmMgfSBmcm9tICdmcydcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcblxuaW1wb3J0IHsgSVBhcnNlZE1lc3NhZ2UgfSBmcm9tICcuL0V2ZW50VHlwZSc7XG5cbmNvbnN0IHdyYXBMYXp5UmVxdWVzdEhhbmRsZXIgPSAocmVxdWVzdEhhbmRsZXJNb2R1bGUsIG1lc3NhZ2VIYW5kbGVyQXN5bmMsIHByb3ZpZGVyQ29uZmlnKSA9PiB7XG4gIGNvbnN0IGhhbmRsZXIgPSByZXF1aXJlKGAuLyR7cmVxdWVzdEhhbmRsZXJNb2R1bGV9YCkocHJvdmlkZXJDb25maWcsIG1lc3NhZ2VIYW5kbGVyQXN5bmMpXG4gIHJldHVybiBhc3luYyAocmVxLCByZXMpID0+IGhhbmRsZXIocmVxLCByZXMpXG59XG5cbmNvbnN0IGdldFByb3ZpZGVycyA9IChzb3VyY2UpID0+IHtcbiAgY29uc3QgaXNEaXJlY3RvcnkgPSBzb3VyY2UgPT4gbHN0YXRTeW5jKHNvdXJjZSkuaXNEaXJlY3RvcnkoKVxuICByZXR1cm4gcmVhZGRpclN5bmMoc291cmNlKS5maWx0ZXIoZCA9PiBpc0RpcmVjdG9yeShwYXRoLmpvaW4oc291cmNlLCBkKSkpXG59XG5cbmV4cG9ydCA9IChwcm92aWRlckNvbmZpZ3MsIG1lc3NhZ2VIYW5kbGVyKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdpbml0IHdlYmhvb2snKVxuICBjb25zdCBtZXNzYWdlSGFuZGxlckFzeW5jID0gKGhhbmRsZXIpID0+IGFzeW5jIChwcmFzZWRNZXNzYWdlOiBJUGFyc2VkTWVzc2FnZSwgb3JpZ2luYWxNZXNzYWdlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gYXdhaXQgaGFuZGxlcihwcmFzZWRNZXNzYWdlLCBvcmlnaW5hbE1lc3NhZ2UpIC8vIHRvIGVuc3VyZSBtZXNzYWdlSGFuZGxlciBpcyBhIHByb21pc2VcbiAgfVxuXG4gIGNvbnN0IHByb3ZpZGVycyA9IGdldFByb3ZpZGVycyhfX2Rpcm5hbWUpXG4gIGNvbnN0IHJvdXRlciA9IHJlcXVpcmUoJ2V4cHJlc3MnKS5Sb3V0ZXIoKVxuICBwcm92aWRlcnNcbiAgICAuZmlsdGVyKHByb3ZpZGVyID0+IHByb3ZpZGVyQ29uZmlnc1twcm92aWRlcl0pXG4gICAgLmZvckVhY2gocHJvdmlkZXIgPT4ge1xuICAgICAgY29uc29sZS5sb2coYGluaXQgY2hhdCBwcm92aWRlcjogJHtwcm92aWRlcn1gKVxuICAgICAgcm91dGVyLnVzZShgLyR7cHJvdmlkZXJ9YCwgd3JhcExhenlSZXF1ZXN0SGFuZGxlcihwcm92aWRlciwgbWVzc2FnZUhhbmRsZXJBc3luYyhtZXNzYWdlSGFuZGxlciksIHByb3ZpZGVyQ29uZmlnc1twcm92aWRlcl0pKVxuICAgIH0pXG5cbiAgcm91dGVyLnVzZSgnLycsIChyZXEsIHJlcykgPT4gcmVzLnN0YXR1cyg0MDEpLnNlbmQoJ2htbS4uJykpXG4gIHJldHVybiByb3V0ZXJcbn0iXX0=