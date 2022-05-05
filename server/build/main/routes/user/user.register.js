"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./user.routes"));
const RegisterRoutes = (appRouter, path) => {
    appRouter.use(path, user_routes_1.default.routes());
};
const User = {
    RegisterRoutes,
};
exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5yZWdpc3Rlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9yb3V0ZXMvdXNlci91c2VyLnJlZ2lzdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsZ0VBQW1DO0FBRW5DLE1BQU0sY0FBYyxHQUFHLENBQUMsU0FBaUIsRUFBRSxJQUFZLEVBQUUsRUFBRTtJQUN2RCxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxxQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDekMsQ0FBQyxDQUFDO0FBRUYsTUFBTSxJQUFJLEdBQUc7SUFDWCxjQUFjO0NBQ2YsQ0FBQztBQUVGLGtCQUFlLElBQUksQ0FBQyJ9