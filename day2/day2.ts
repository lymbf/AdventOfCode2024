import * as fs from "node:fs";
import {execute} from "../execute";

const tempData = fs.readFileSync('./tempData.txt').toString().split('\r\n').map(el => el.split(' ').map(e => parseInt(e)));
const data = fs.readFileSync('./data.txt').toString().split('\r\n').map(el => el.split(' ').map(e => parseInt(e)));


type Line = number[];
type Data = Line[];

const checkCondition = (n1: number, n2: number, dir: -1 | 1) => {
    let dist = (n1 - n2) * dir;
    return dist > 0 && dist <= 3;
}
const checkArray = (line: Line, extend?:boolean) => {
    let dir1: 1 | -1 = line[0] > line[1] ? 1 : -1;
    let dir2:1|-1 = line[1] > line[2] ? 1 : -1;
    let dir3:1|-1 = line[2] > line[3] ? 1 : -1;
    let dir:1|-1 = [dir1, dir2, dir3].filter(el=>el===1).length  > 1 ? 1 : -1
    let r = true;
    let errI: number
    line.forEach((el, i, a) => {
        if ((i != line.length - 1) && !checkCondition(el, a[i + 1], dir)) {
            r = false;
            errI = !extend ? i : i+1
        }
    })
    return {err: !r, i:errI}
}


const solve1 = (data: Data) => {
    let res = 0;
    data.forEach((line: Line, i) => {
        !checkArray(line).err && (res += 1)
    })
    return res
}

const solve2 = (data: Data) => {
    let res = 0;
    data.forEach((line: Line, i, a) => {

        let res1:{err:boolean, i:number} = checkArray(line);
        let res2: {err:boolean, i:number}
        let res3: {err:boolean, i:number}
        if(res1 && res1.err)res2 = checkArray(line.filter((e, j, a)=>res1.i!=j), true)
        if(res2 && res2.err)res3 = checkArray(line.filter((e, j, a)=>res2.i+1!=j), true)
        if(!res1.err || !res2.err || !res3.err) {res+=1; console.log('line: ', i+1, 'answer: ', 'correct')}
        else{console.log('line: ', i+1, 'answer: ', '_INcorrect')}
    })
    return res
}


// solve2();

execute(solve1, [data],);
execute(solve2, [data],);