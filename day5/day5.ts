import {execute} from "../execute";
import * as fs from "node:fs";

const parseData = (str: string): any => {
    return str.split('\r\n\r\n').map((e, i) => {
        if (i === 0) return e.split('\r\n').map(f => f.split('|').map(g => parseInt(g)))
        if (i === 1) return e.split('\r\n').map(f => f.split(',').map(g => parseInt(g)))
    })
}

const data = parseData(fs.readFileSync('./data.txt').toString())
const tempData = parseData(fs.readFileSync('./tempData.txt').toString())

/*   PART 1  */
type Rule = [number, number]
type Page = number
type PageList = Page[]

const checkIfValid = (list: PageList, rules: Rule[]): boolean => {
    let res = true
    for (let i = 0; i < list.length - 1; i++) {
        let [a, b] = [list[i], list[i + 1]];
        let x = rules.filter(rule => rule.includes(a) && rule.includes(b));
        if (x.length === 1) {
            if (x[0][0] != a) {
                res = false;
                break;
            }
        }
    }
    return res
}

const solve1 = (data: any): number => {
    const rules: Rule[] = data[0];
    const pagesLists: PageList[] = data[1]
    return pagesLists.reduce((acc, list) => {
        if (checkIfValid(list, rules)) return acc + list[(list.length - 1) / 2]
        return acc
    }, 0)
}

/*   Part 2   */

const sortList = (list:PageList, rules: Rule[]):PageList => {
    let temp = [...list]
    return temp.sort((a,b)=>{
        let rule = rules.filter(rule => rule.includes(a) && rule.includes(b))[0];
        if(rule[0] === a) return -1
        return 1
    })
}

const solve2 = (data: any): number => {
    const rules: Rule[] = data[0];
    const pagesLists: PageList[] = data[1]
    return pagesLists.reduce((acc, list) => {

        if (!checkIfValid(list, rules)) {
            let sorted = sortList(list, rules)
            // console.log('list: ', list, 'sorted: ', sorted)
            return acc + sorted[(sorted.length-1)/2]
        }
        return acc
    }, 0)
}

execute(solve1, [data],);
execute(solve2, [data],);