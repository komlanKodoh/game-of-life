"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const directive_1 = __importDefault(require("./directive"));
(0, ava_1.default)('Parser should produce correct cells', (ctx) => {
    let sample = `
1,2
`.trim();
    let parser = new directive_1.default.Parser();
    parser.feed(sample);
    ctx.deepEqual(parser.next_cell(), [0, 1]);
});
(0, ava_1.default)('Should process jump expression successfully', (ctx) => {
    let sample = `
->9, 1,2
`.trim();
    let parser = new directive_1.default.Parser();
    parser.feed(sample);
    ctx.deepEqual(parser.next_cell(), [9, 1]);
});
(0, ava_1.default)('Should process nested directive successfully', (ctx) => {
    let square = `
1,2,3,
1,  3,
1,2,3,
`.trim();
    let sample = `
-|square.2,
`.trim();
    let parser = new directive_1.default.Parser();
    parser.register_directive('square', square);
    parser.feed(sample);
    ctx.deepEqual(parser.next_cell(), [0, 3]);
    ctx.deepEqual(parser.next_cell(), [0, 4]);
    ctx.deepEqual(parser.next_cell(), [0, 5]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL0NvbmZpZ3VyYXRpb24vcGFyc2VyLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBdUI7QUFDdkIsNERBQW9DO0FBRXBDLElBQUEsYUFBSSxFQUFDLHFDQUFxQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDbEQsSUFBSSxNQUFNLEdBQUc7O0NBRWQsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNQLElBQUksTUFBTSxHQUFHLElBQUksbUJBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXBCLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUMsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFBLGFBQUksRUFBQyw2Q0FBNkMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQzFELElBQUksTUFBTSxHQUFHOztDQUVkLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDUCxJQUFJLE1BQU0sR0FBRyxJQUFJLG1CQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVwQixHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVDLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBQSxhQUFJLEVBQUMsOENBQThDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUMzRCxJQUFJLE1BQU0sR0FBRzs7OztDQUlkLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDUCxJQUFJLE1BQU0sR0FBRzs7Q0FFZCxDQUFDLElBQUksRUFBRSxDQUFDO0lBRVAsSUFBSSxNQUFNLEdBQUcsSUFBSSxtQkFBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRXBDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVwQixHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QyxDQUFDLENBQUMsQ0FBQyJ9