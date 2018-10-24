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
const server_1 = require("./server");
exports.default = (config) => __awaiter(this, void 0, void 0, function* () {
    return server_1.default(config);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2hhdGJvdHMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHFDQUEwRDtBQUUxRCxrQkFBZSxDQUFPLE1BQXlCLEVBQXdCLEVBQUU7SUFDdkUsT0FBTyxnQkFBTSxDQUFFLE1BQU0sQ0FBRSxDQUFBO0FBQ3pCLENBQUMsQ0FBQSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNoYXRTZXJ2ZXJDb25maWcgfSBmcm9tICcuLi9jb25maWcnXG5pbXBvcnQgeyBkZWZhdWx0IGFzIHNlcnZlciwgSUNoYXRTZXJ2ZXIgfSBmcm9tICcuL3NlcnZlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChjb25maWc6IElDaGF0U2VydmVyQ29uZmlnKTogUHJvbWlzZTxJQ2hhdFNlcnZlcj4gPT4ge1xuICByZXR1cm4gc2VydmVyKCBjb25maWcgKVxufVxuIl19