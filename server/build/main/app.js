"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const utils_1 = __importDefault(require("./utils"));
const config_1 = __importDefault(require("./config"));
const koa_static_1 = __importDefault(require("koa-static"));
const koa_router_1 = __importDefault(require("koa-router"));
const auth_register_1 = __importDefault(require("./routes/auth/auth.register"));
const error_register_1 = __importDefault(require("./error/error.register"));
const user_register_1 = __importDefault(require("./routes/user/user.register"));
const app = new koa_1.default();
const apiRouter = new koa_router_1.default({
    prefix: "/api"
});
error_register_1.default.Register(app);
auth_register_1.default.RegisterRoutes(apiRouter, "/auth");
user_register_1.default.RegisterRoutes(apiRouter, "/user");
app.use(apiRouter.routes());
app.use((0, koa_static_1.default)(config_1.default.PUBLIC_DIR));
utils_1.default.api.startApp(app);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLDhDQUFzQjtBQUN0QixvREFBNEI7QUFDNUIsc0RBQThCO0FBQzlCLDREQUErQjtBQUMvQiw0REFBZ0M7QUFDaEMsZ0ZBQStDO0FBQy9DLDRFQUFrRDtBQUNsRCxnRkFBK0M7QUFFL0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxhQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFNLFNBQVMsR0FBRyxJQUFJLG9CQUFNLENBQUM7SUFDekIsTUFBTSxFQUFFLE1BQU07Q0FDakIsQ0FBQyxDQUFDO0FBRUgsd0JBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFM0IsdUJBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBRSxDQUFDO0FBQ3pDLHVCQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUl4QyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQzVCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxvQkFBSyxFQUFDLGdCQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUVsQyxlQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyJ9