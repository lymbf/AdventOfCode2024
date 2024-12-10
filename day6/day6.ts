import {execute} from "../execute";
import * as fs from "node:fs";

type Coordinate = [number, number, number]

const guard = 2
const obstacle = 1
const space = 0
let dirs = [-1, 1, 1, -1];

let guardPos:Coordinate = [0,0,0]
let currentDir: number = 0;
let xBorder: number;
let yBorder: number;

const parseDataIntoMatrix = (str: string): any => {
    return str.split('\r\n').map((line, y) => line.split('').map((el, x) => {
        switch (el) {
            case '.':
                return space;
            case '#':
                return obstacle;
            default:
                guardPos = [x,y,0];
                return guard
        }
    }));
}

const data = parseDataIntoMatrix(fs.readFileSync('./data.txt').toString())
// const tempData = parseDataIntoMatrix(fs.readFileSync('./tempData.txt').toString())

const changeDirection = () => {
    if (currentDir < 3) currentDir++;
    else currentDir = 0;
}



const getTrail = (data:number[][]):Coordinate[]|false=>{
    currentDir = 0;
    let trail:Coordinate[] = [];
    trail.push(guardPos);
    yBorder = data.length - 1;
    xBorder = data[0].length - 1
    let x = guardPos[0]
    let y = guardPos[1]

    let broken = false;
    while (x >= 0 && x <= xBorder && y >= 0 && y <= yBorder) {
        let mod = currentDir % 2;
        let nextStep:Coordinate = mod ? [x + dirs[currentDir], y, currentDir] : [x, y + dirs[currentDir], currentDir];
        if(nextStep[1] < 0 ||nextStep[1] > yBorder || nextStep[0] < 0 || nextStep[1] > xBorder)break;
        if(data[nextStep[1]][nextStep[0]] === obstacle){
            changeDirection()
            mod = currentDir % 2;
            nextStep = mod ? [x + dirs[currentDir], y, currentDir] : [x, y + dirs[currentDir], currentDir];
        }
        if(trail.slice(0).filter((el)=>{
            return (el[0]===nextStep[0] && el[1]===nextStep[1] && el[2]===nextStep[2]);
        }).length) {
            broken = true;
            break;
        }
        trail.push(nextStep);

        x = trail[trail.length-1][0];
        y = trail[trail.length-1][1];
    }
    if(broken)return false
    return trail
}

/*   PART 1   */

const solve1 = (data: number[][]) => {
    let trail = getTrail(data)
    if(trail)return trail.sort().filter((el, i, a)=>{
        if(i===a.length-1)return el
        else return !((el[0]=== a[i+1][0]) && (el[1]===a[i+1][1]))
    }).length
    else return 0


}

/*   PART 2   */

const solve2 = (data:number[][]) => {
    let res:number = 0;
    data.forEach((line, y, a)=>{
        line.forEach((el, x)=>{
            let temp = new Array(data.length);
            for(let i = 0; i < data.length; i++){
                temp[i] = data[i].slice(0)
            }
            if(temp[y][x]===space){
                temp[y][x]=obstacle
                !getTrail(temp) && res++;
            }
        })
    })
    return res
}


// execute(solve1, [tempData],);
execute(solve2, [data],);