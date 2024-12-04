import {execute} from "../execute";
import * as fs from "node:fs";

const data = fs.readFileSync('./data.txt').toString();
const tempData = fs.readFileSync('./tempData.txt').toString();

const allowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];

const cutEquation = (str:string): { newStr:string, result:number, DO:boolean }=>{

    let S = str.indexOf('mul(')
    let DO = str.indexOf('do()');
    let DONT = str.indexOf('don\'t()');
    let temp = str.slice(S);
    let allow:boolean;
    if(DO>0 && DONT >0)allow = DO<DONT
    else if(DO>0 && DONT < 0) allow = true;
    else if(DO<0 && DONT > 0) allow = false;
    else allow = false
    if((S>DO && DO>0)|| (S>DONT && DONT>0)){
        return {result:-1, newStr:DO<DONT ? str.slice(DO+4) : str.slice(DONT+5), DO:allow}
    }
    let s = 4;
    let e = temp.indexOf(')');
    let result = 0;
    let newString = temp.slice(s);
    if(!temp.slice(s,e).split('').filter(el=>!allowed.includes(el)).length){
        let nums = temp.slice(s,e).split(',').map(e=>parseInt(e))
        result =  nums[0]*nums[1];
        if(!newString.includes('mul(')){newString=''}
    }


    return {result: result, newStr:newString, DO:allow}
}

const solve1 = (str:string):number=>{
    let temp = str;
    let res:number = 0;
    while(temp.length > 0){
        let {newStr, result } = cutEquation(temp);
        res+=result;
        temp = newStr
    }
    return res
}

const solve2 = (str:string):number=>{
    let temp = str;
    let res:number = 0;
    let allow = true;
    while(temp.length > 0){
        let {newStr, result, DO} = cutEquation(temp);
        if(result < 0) allow = DO
        if(allow && result >=0)res+=result;
        temp = newStr
    }
    return res
}


execute(solve1, [data],);
execute(solve2, [data],);