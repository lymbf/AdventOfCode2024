import * as fs from "node:fs";

let l:number[] = [];
let r:number[] = []
let data = fs.readFileSync('./data.txt').toString().split('\r\n').map(el=>el.split('   '));
data.forEach((item:string[])=>{
    l.push(parseInt(item[0]))
    r.push(parseInt(item[1]))
})
l.sort();
r.sort();
let res:number = 0;
for(let i = 0; i < l.length; i++){
    res+= Math.abs(l[i]-r[i])
}

console.log(res)
let res2:number = 0;
l.forEach(n=>{
    res2+= n*r.filter(el=>el===n).length
})

console.log('res2: ', res2)