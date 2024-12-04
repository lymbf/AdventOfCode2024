import {execute} from "../execute";
import * as fs from "node:fs";

const data = fs.readFileSync('./data.txt').toString().split('\r\n').map(e => e.split(''));
const tempData = fs.readFileSync('./tempData.txt').toString().split('\r\n').map(e => e.split(''));

/*   PART 1   */

const patterns = ['XMAS', 'SAMX']
const compare = (str: string) => patterns.includes(str) ? 1 : 0

const checkVertical = (input: string[][]) => {
    if (input.length != 4) return false
    let arr = [];
    input.forEach((line) => {
        line.forEach((el, i) => {
            !arr[i] && (arr[i] = [])
            arr[i].push(el)
        })
    })
    return arr.reduce((acc, curr) => {
        return acc += compare(curr.join(''))
    }, 0)
}

const checkHorizontal = (input: string[]) => {
    if (input.length < 4) return 0
    return input.reduce((acc, curr, i, arr) => {
        if (i <= arr.length - 4) {
            let temp = curr + arr[i + 1] + arr[i + 2] + arr[i + 3]
            return acc += compare(temp)
        }
        return acc
    }, 0)
}

const checkDiagonal = (input: string[][]) => {
    if (input.length != 4) return false
    let arr = []
    for(let i = 0; i < input[0].length; i++){
        if(i <= input[0].length-4)arr.push([input[0][i], input[1][i+1], input[2][i+2], input[3][i+3]])
        if(i >= 3)arr.push([input[0][i], input[1][i-1], input[2][i-2], input[3][i-3]])
    }
    return arr.reduce((acc, curr)=>{
        return acc += compare(curr.join(''))
    },0)
}

const solve1 = (data: string[][]) => {
    return data.reduce((acc, curr, i, a)=>{
        let x = 0;
        x+=checkHorizontal(curr)
        if(i <= a.length-4){
            x+=checkVertical(a.slice(i, i+4))
            x+=checkDiagonal(a.slice(i, i+4))
        }
      return acc+x
    },0)

}

/*   PART 2   */

type Coordinates = [number, number]

const patterns2 = ['MAS', 'SAM']

const compare2 = (str: string) => patterns2.includes(str) ? 1 : 0

const findIndexesOfA = (data:string[][]):Coordinates[]=>{
    let res = [];
        data.forEach((line, y)=>{
            line.forEach((el, x)=>{
                if(el==='A')res.push([y,x])
            })
        })
    return res.filter(e=>{return(e[0]>0 && e[0] < data.length-1 && e[1]>0 && e[1]<data[0].length)})
}

const crossCheck = ([y,x]:Coordinates, data:string[][]):boolean=>{
    let dl = [data[y-1][x+1], data[y][x], data[y+1][x-1]];
    let dr = [data[y-1][x-1],data[y][x],data[y+1][x+1]]
    if(compare2(dl.join('')) && compare2(dr.join('')))return true
    return false
}

const solve2 = (data: string[][]) => {
    return findIndexesOfA(data).reduce((acc,curr)=>{
        if(crossCheck(curr, data)) {
            return acc + 1
        }
        return acc
    },0)
}

execute(solve2, [data],);
// execute(solve2, [data],);