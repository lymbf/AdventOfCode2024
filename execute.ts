import {performance} from "node:perf_hooks";

const execute = async (fun:(...args:any[])=>any, params:any[], txt?:string)=>{
    let s = performance.now();
        console.log(txt ? txt : 'res: ', fun(...params));
    let e = performance.now();
    console.log('executed in: ', ((e-s)/1000).toFixed(6), ' ms');
    return true
}

export {execute}