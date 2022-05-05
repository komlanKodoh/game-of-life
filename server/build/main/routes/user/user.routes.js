"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const router = new koa_router_1.default();
router.get("/", (ctx) => {
    ctx.body = {
        token: "Some random cool json ",
    };
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcm91dGVzL3VzZXIvdXNlci5yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSw0REFBZ0M7QUFFaEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxvQkFBTSxFQUFFLENBQUM7QUFFNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUN0QixHQUFHLENBQUMsSUFBSSxHQUFHO1FBQ1QsS0FBSyxFQUFFLHdCQUF3QjtLQUNoQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUM7QUFFSCxrQkFBZSxNQUFNLENBQUMifQ==