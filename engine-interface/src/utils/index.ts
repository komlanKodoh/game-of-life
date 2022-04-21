
/**
 * Returns the next index in a string where the target string is found
 * 
 * @param str string that should be processed
 * @param target the character whose index you desire
 * @param start index from which we should start processing
 */
const next_occurrence = (str : string, target: string, start: number) => {
    for (let i = start; i < str.length; i++){
        if (str[i] === target){ return i}
    }

    return null;
}