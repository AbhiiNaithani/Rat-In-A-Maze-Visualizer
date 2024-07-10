import { cellType, configType } from "../types";

type Cell = [number, number];
type CellWithDirection = { cell: Cell, path: string[] };

let finalPath : string = "";
let dr : number[] = [0,-1,0,1];
let dc : number[] = [-1,0,1,0];
let dir : string = "LURD";

const generateMatrix = (rows : number, columns : number) : boolean[][] => {
    let matrix = [];
    for(let i=0;i<rows;++i){
        matrix.push(new Array(columns).fill(false));
    }
    return matrix;
}

const isSafe = (x:number,y:number,rows:number,columns:number,visited:boolean[][],grid:cellType[][]) : boolean => {
    return (
        x >= 0 && x < rows && y >= 0 && y < columns && !visited[x][y] && !grid[y][x]?.isWall
    )
}
const solve = (x: number, y : number,end_x: number, end_y: number, rows: number, columns: number, visited: boolean[][], grid : cellType[][], path : string) => {
    if(x === end_x && y === end_y && grid[y][x]?.isEnd){
        if(finalPath.length === 0 || path.length < finalPath.length) finalPath = path;
        return;
    }
    
    visited[x][y] = true;

    for(let i:number = 0;i < 4;++i){
        let new_x : number = dr[i] + x;
        let new_y : number = dc[i] + y;
        path += dir[i];
        if(isSafe(new_x,new_y,rows,columns,visited,grid)) solve(new_x,new_y,end_x,end_y,rows,columns,visited,grid,path);
        path = path.slice(0,-1);
    }
    visited[x][y] = false;

}
const dfs = (x: number, y : number,end_x: number, end_y: number, rows: number, columns: number, visited: boolean[][], grid : cellType[][], path : string): boolean => {
    if (x === end_x && y === end_y && grid[y][x].isEnd) {
      visited[x][y] = true;
      finalPath = path;
      return true;
    }

    if (isSafe(x, y,rows,columns,visited,grid)) {
      visited[x][y] = true;

      // Move right
      if (dfs(x, y + 1,end_x,end_y,rows,columns,visited,grid,path+"R")) return true;
      // Move down
      if (dfs(x + 1, y,end_x,end_y,rows,columns,visited,grid,path+"D")) return true;
      // Move left
      if (dfs(x, y - 1,end_x,end_y,rows,columns,visited,grid,path+"L")) return true;
      // Move up
      if (dfs(x - 1, y,end_x,end_y,rows,columns,visited,grid,path+"U")) return true;

      // Backtrack
      visited[x][y] = false;
    }

    return false;
  }
export const backtracking = (intitialConfig : configType,grid : cellType[][]) : string => {
    console.log(grid);
    finalPath = "";
    let visited = generateMatrix(intitialConfig.numRows,intitialConfig.numCols);
    
    if(dfs(intitialConfig.startRow,intitialConfig.startCol,intitialConfig.endRow,intitialConfig.endCol,intitialConfig.numRows,intitialConfig.numCols,visited,grid,"")) return finalPath;
  
    return "";
}




export const bfs = (intitialConfig : configType, grid : cellType[][]): string => {
    console.log(grid);
    console.log(intitialConfig);
    let visited = generateMatrix(intitialConfig.numRows,intitialConfig.numCols);
    let startX = intitialConfig.startRow;
    let startY = intitialConfig.startCol;
    let endX = intitialConfig.endRow;
    let endY = intitialConfig.endCol;

    let queue: CellWithDirection[] = [{ cell: [startX, startY], path: [] }];
    visited[startX][startY] = true;


    while (queue.length > 0) {
        const { cell: [x, y], path } = queue.shift() as CellWithDirection;
  
        if (x === endX && y === endY) {
        //   console.log('Path found:', path.join(''));
          return path.join('');
        }
  
        for (let i : number = 0; i< 4; ++i) {

          const newX = x + dr[i];
          const newY = y + dc[i];
          let d = dir[i] 
  
          if (isSafe(newX,newY,intitialConfig.numRows,intitialConfig.numCols,visited,grid)) {
                visited[newX][newY] = true;
                queue.push({ cell: [newX, newY], path: [...path, d] });
          }
        }
      }
      return "";
    }
  