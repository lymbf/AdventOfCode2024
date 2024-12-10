import {execute} from "../execute";
import * as fs from "node:fs";

type Set = (bigint | bigint[])[]
type Data = Set[]

const parseData = (str: string): Data => {
    return str.split('\r\n').map((e, i) => {
        return e.split(': ').map((el, j) => {
            if (j === 0) return BigInt(parseInt(el))
            return el.split(' ').map((el2) => {
                return BigInt(parseInt(el2))
            })
        })
    })
}


const data: Data = parseData(fs.readFileSync('./data.txt').toString())
const tempData: Data = parseData(fs.readFileSync('./tempData.txt').toString())

console.log('data: ', tempData)

const perform = (e: number, a: bigint, b: bigint) => {
    if (e === 0) return a + b
    if (e === 1) return a * b
    else return BigInt(parseInt(a.toString() + b.toString()))
}

const count = (numbers: bigint[], equastions: number[]): bigint => {
    return numbers.reduce((acc, curr, i) => {
        if (i != 0) return perform(equastions[i - 1], acc, curr)
        return acc
    }, BigInt(numbers[0]))
}


const count2 = (numbers: bigint[], equastions: number[]): bigint => {
    return numbers.reduce((acc, curr, i) => {
        if (i != 0) return perform(equastions[i - 1], acc, curr)
        return acc
    }, BigInt(numbers[0]))
}

/*   PART 1   */

const solve1 = (data: any) => {
    return data.reduce((acc, line, index) => {
        let result: bigint = line[0]
        let numbers = [...line[1]];
        let variants: number[][] = []
        let n = Math.pow(2, numbers.length - 1)

        for (let i = 0; i < n; i++) {
            let temp = i.toString(2).split('');
            while (temp.length != numbers.length - 1) {
                temp.unshift('0')
            }
            variants.push(temp.map(el => parseInt(el)))
        }

        for (let i = 0; i < variants.length; i++) {
            if (count(numbers, variants[i]) === result) {
                return acc + result
            }
        }
        return acc
    }, BigInt(0))
}

const solve2 = (data: any) => {
    return data.reduce((acc, line, index) => {
        let result: bigint = line[0]
        let numbers = [...line[1]];
        let variants: number[][] = []
        let n = Math.pow(3, numbers.length - 1)

        for (let i = 0; i < n; i++) {
            let temp = i.toString(3).split('');
            while (temp.length != numbers.length - 1) {
                temp.unshift('0')
            }
            variants.push(temp.map(el => parseInt(el)))
        }

        for (let i = 0; i < variants.length; i++) {
            if (count2(numbers, variants[i]) === result) {
                return acc + result
            }
        }
        return acc
    }, BigInt(0))
}


// execute(solve1, [data],);
execute(solve2, [data],);

