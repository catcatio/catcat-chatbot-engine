"use strict";
const express_1 = require("express");
module.exports = ({ providerConfigs, messageHandler, fulfillmentHandler }) => {
    const router = express_1.Router();
    console.log('init routers');
    if (messageHandler) {
        const handler = require('../webhook')(providerConfigs, messageHandler);
        router.use('/webhook', (req, res) => handler(req, res));
    }
    if (fulfillmentHandler) {
        const handler = require('../fulfillment')(fulfillmentHandler);
        router.use('/fulfillment', (req, res) => handler(req, res));
    }
    router.use('/', (req, res) => res.send('hmm..'));
    return router;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2hhdGJvdHMvcm91dGVycy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUNBQWdDO0FBRWhDLGlCQUFTLENBQUMsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLEVBQUUsRUFBRTtJQUNuRSxNQUFNLE1BQU0sR0FBRyxnQkFBTSxFQUFFLENBQUE7SUFFdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUMzQixJQUFJLGNBQWMsRUFBRTtRQUNsQixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFBO1FBQ3RFLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO0tBQ3hEO0lBQ0QsSUFBSSxrQkFBa0IsRUFBRTtRQUN0QixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1FBQzdELE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO0tBQzVEO0lBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDaEQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJ1xuXG5leHBvcnQgPSAoeyBwcm92aWRlckNvbmZpZ3MsIG1lc3NhZ2VIYW5kbGVyLCBmdWxmaWxsbWVudEhhbmRsZXIgfSkgPT4ge1xuICBjb25zdCByb3V0ZXIgPSBSb3V0ZXIoKVxuXG4gIGNvbnNvbGUubG9nKCdpbml0IHJvdXRlcnMnKVxuICBpZiAobWVzc2FnZUhhbmRsZXIpIHtcbiAgICBjb25zdCBoYW5kbGVyID0gcmVxdWlyZSgnLi4vd2ViaG9vaycpKHByb3ZpZGVyQ29uZmlncywgbWVzc2FnZUhhbmRsZXIpXG4gICAgcm91dGVyLnVzZSgnL3dlYmhvb2snLCAocmVxLCByZXMpID0+IGhhbmRsZXIocmVxLCByZXMpKVxuICB9XG4gIGlmIChmdWxmaWxsbWVudEhhbmRsZXIpIHtcbiAgICBjb25zdCBoYW5kbGVyID0gcmVxdWlyZSgnLi4vZnVsZmlsbG1lbnQnKShmdWxmaWxsbWVudEhhbmRsZXIpXG4gICAgcm91dGVyLnVzZSgnL2Z1bGZpbGxtZW50JywgKHJlcSwgcmVzKSA9PiBoYW5kbGVyKHJlcSwgcmVzKSlcbiAgfVxuXG4gIHJvdXRlci51c2UoJy8nLCAocmVxLCByZXMpID0+IHJlcy5zZW5kKCdobW0uLicpKVxuICByZXR1cm4gcm91dGVyXG59Il19