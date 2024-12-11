import {execute} from "../execute";
import * as fs from "node:fs";


type Data = (string | null)[][] // swap to day relevant type

const parseData = (str: string): Data => {
    return str.split('\r\n').map(line => line.split('').map(el => {
        if (el === '.') return null
        return el
    }))
}

const data: Data = parseData(fs.readFileSync('./data.txt').toString())
const tempData: Data = parseData(fs.readFileSync('./tempData.txt').toString())

interface Anthena {
    x: number,
    y: number,
    type: string
}

type Antinode = [number, number]
type Coordinates = [number, number];
type Distance = [number, number];


const fillAnthenas = (data: Data) => {
    let anthenas: Anthena[] = []
    data.forEach((line, y) => {
        line.forEach((el, x) => {
            if (el) anthenas.push({x: x, y: y, type: el})
        })
    })
    return anthenas
}

const getDistance = (p1: Coordinates, p2: Coordinates): Distance => {
    return [p2[0] - p1[0], p2[1] - p1[1]]
}

const fillAntinodes = (matrix: Data, anthenas: Anthena[], borderX: number, borderY: number, p1) => {
    let antinodes: Antinode[] = [];
    anthenas.forEach((a, i) => {
        for (let j = i + 1; j < anthenas.length; j++) {
            if (i != j && a.type === anthenas[j].type) {
                if (p1) antinodes.push(...getAntinodes(a, anthenas[j], borderX, borderY))
                else antinodes.push(...getAntinodes2(a, anthenas[j], borderX, borderY))
            }
        }
    })
    return antinodes.sort().filter((a, i, arr) => {
        if (i === arr.length - 1) return true
        return !(a[0] === arr[i + 1][0] && a[1] === arr[i + 1][1])
    });
}


/*  PART 1  */

const getAntinodes = (a1: Anthena, a2: Anthena, borderX: number, borderY: number): Antinode[] => {
    let dist = getDistance([a1.x, a1.y], [a2.x, a2.y])
    let t1: Antinode = [a1.x - dist[0], a1.y - dist[1]]
    let t2: Antinode = [a2.x + dist[0], a2.y + dist[1]]
    let res: Antinode[] = []
    if (t1[0] >= 0 && t1[1] >= 0 && t1[0] <= borderX && t1[1] <= borderY) res.push(t1)
    if (t2[0] >= 0 && t2[1] >= 0 && t2[0] <= borderX && t2[1] <= borderY) res.push(t2)
    return res
}

const solve1 = (data: Data): number => {
    const anthenas = fillAnthenas(data);
    return fillAntinodes(data, anthenas, data[0].length - 1, data.length - 1, true).length
}

/*  PART 2  */

const getAntinodes2 = (a1: Anthena, a2: Anthena, borderX: number, borderY: number): Antinode[] => {
    let dist = getDistance([a1.x, a1.y], [a2.x, a2.y])
    let t1: Antinode = [a1.x, a1.y]
    let t2: Antinode = [a2.x, a2.y]
    let res: Antinode[] = []
   while(t1[0] >= 0 && t1[1] >= 0 && t1[0] <= borderX && t1[1] <= borderY) {
       res.push(t1)
       t1 = [t1[0]-dist[0], t1[1]-dist[1]]
   }
    while(t2[0] >= 0 && t2[1] >= 0 && t2[0] <= borderX && t2[1] <= borderY) {
        res.push(t2)
        t2 = [t2[0]+dist[0], t2[1]+dist[1]]
    }
    return res
}

const solve2 = (data: Data): number => {
    const anthenas = fillAnthenas(data);
    return fillAntinodes(data, anthenas, data[0].length - 1, data.length - 1, false).length
}

execute(solve1, [data],);
execute(solve2, [data],);