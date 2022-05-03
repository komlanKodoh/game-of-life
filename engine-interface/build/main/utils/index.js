"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.next_occurrence = void 0;
/**
 * Returns the next index in a string where the target string is found
 *
 * @param str string that should be processed
 * @param target the character whose index you desire
 * @param start index from which we should start processing
 */
const next_occurrence = (str, target, start) => {
    for (let i = start; i < str.length; i++) {
        if (str[i] === target) {
            return i;
        }
    }
    return null;
};
exports.next_occurrence = next_occurrence;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7OztHQU1HO0FBQ0ksTUFBTSxlQUFlLEdBQUcsQ0FBQyxHQUFXLEVBQUUsTUFBYyxFQUFFLEtBQWEsRUFBRSxFQUFFO0lBQzVFLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3ZDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFBRTtZQUNyQixPQUFPLENBQUMsQ0FBQztTQUNWO0tBQ0Y7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMsQ0FBQztBQVJXLFFBQUEsZUFBZSxtQkFRMUIifQ==