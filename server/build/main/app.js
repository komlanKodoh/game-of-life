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
const app = new koa_1.default();
error_register_1.default.Register(app);
app.use((0, koa_static_1.default)(config_1.default.PUBLIC_DIR));
const router = new koa_router_1.default();
auth_register_1.default.RegisterRoutes(router, "/auth");
app.use(router.routes());
utils_1.default.api.startApp(app);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLDhDQUFzQjtBQUN0QixvREFBNEI7QUFDNUIsc0RBQThCO0FBQzlCLDREQUErQjtBQUMvQiw0REFBZ0M7QUFDaEMsZ0ZBQStDO0FBQy9DLDRFQUFrRDtBQUVsRCxNQUFNLEdBQUcsR0FBRyxJQUFJLGFBQUcsRUFBRSxDQUFDO0FBRXRCLHdCQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxvQkFBSyxFQUFDLGdCQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUVsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLG9CQUFNLEVBQUUsQ0FBQztBQUM1Qix1QkFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFFLENBQUE7QUFLckMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUN6QixlQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyJ9