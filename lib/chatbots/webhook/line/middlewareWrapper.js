"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (lineMiddleware) => (req, res, next) => {
    try {
        const nextProxy = (err) => {
            if (err instanceof Error) {
                console.log(err.message);
                res.status(500).send(err.message);
            }
            else {
                next();
            }
        };
        // Check Line signature and convert body to JSON
        lineMiddleware(req, res, nextProxy);
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZVdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY2hhdGJvdHMvd2ViaG9vay9saW5lL21pZGRsZXdhcmVXcmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWUsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNwRCxJQUFJO1FBQ0YsTUFBTSxTQUFTLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN4QixJQUFJLEdBQUcsWUFBWSxLQUFLLEVBQUU7Z0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUN4QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7YUFDbEM7aUJBQU07Z0JBQ0wsSUFBSSxFQUFFLENBQUE7YUFDUDtRQUNILENBQUMsQ0FBQTtRQUNELGdEQUFnRDtRQUNoRCxjQUFjLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQTtLQUNwQztJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDMUIsTUFBTSxLQUFLLENBQUE7S0FDWjtBQUNILENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IChsaW5lTWlkZGxld2FyZSkgPT4gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgbmV4dFByb3h5ID0gKGVycikgPT4ge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVyci5tZXNzYWdlKVxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuc2VuZChlcnIubWVzc2FnZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHQoKVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBDaGVjayBMaW5lIHNpZ25hdHVyZSBhbmQgY29udmVydCBib2R5IHRvIEpTT05cbiAgICBsaW5lTWlkZGxld2FyZShyZXEsIHJlcywgbmV4dFByb3h5KVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpXG4gICAgdGhyb3cgZXJyb3JcbiAgfVxufSJdfQ==