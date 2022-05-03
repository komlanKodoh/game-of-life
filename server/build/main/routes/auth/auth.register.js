"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = __importDefault(require("./auth.routes"));
const RegisterRoutes = (appRouter, path) => {
    appRouter.use(path, auth_routes_1.default.routes());
};
const Auth = {
    RegisterRoutes,
};
exports.default = Auth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5yZWdpc3Rlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9yb3V0ZXMvYXV0aC9hdXRoLnJlZ2lzdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsZ0VBQW1DO0FBRW5DLE1BQU0sY0FBYyxHQUFHLENBQUMsU0FBaUIsRUFBRSxJQUFZLEVBQUUsRUFBRTtJQUN2RCxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxxQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDekMsQ0FBQyxDQUFDO0FBRUYsTUFBTSxJQUFJLEdBQUc7SUFDWCxjQUFjO0NBQ2YsQ0FBQztBQUVGLGtCQUFlLElBQUksQ0FBQyJ9