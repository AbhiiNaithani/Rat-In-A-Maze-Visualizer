import { useState,useEffect } from "react"
import { Configuration } from "./components/Configuration"
import { Grid } from "./components/Grid"
import { Header } from "./components/Header"
import { configType,cellType } from "./types"
import { backtracking,bfs } from "./Algorithm/RatInAMaze"


function App() {
  const [initialConfig,setInitialConfig] = useState<configType>(
    {
      numRows: 8,
      numCols : 8,
      startRow: 0,
      startCol: 0,
      endRow: 7,
      endCol: 7
    }
  )
  const [grid,setGrid] = useState<cellType[][]>([[]]);
    const [flag,setFlag] = useState({
      start : false,
      end : false,
      wall : true,
    });

    const flagHandler = (start:boolean, end : boolean, wall: boolean) => {
      setFlag({
        start: start,
        end: end,
        wall: wall
      })
    }
    

    const generateCell = (row:number, column:number) : cellType => {
        return {
            row,
            column,
            isStart : row === initialConfig.startCol && column === initialConfig.startRow,
            isEnd : row === initialConfig.endCol && column === initialConfig.endRow,
            isWall : false,
            isPath : false,
        }
    }

    const generateGrid = () => {
        const matrix : cellType[][] = [];
        for(let i=0;i<initialConfig.numCols;++i){
            const row : cellType[] = [];
            for(let j=0;j<initialConfig.numRows;++j){
                row.push(generateCell(i,j));
            }
            matrix.push(row);
        }
        setGrid(matrix);
    }
    
    const configHandler = (config : configType) => {
      setInitialConfig({
        ...config
      })
      generateGrid();
    }

    const resetHandler = () => {
      for(let i=0;i<initialConfig.numCols;++i){
        for(let j=0;j<initialConfig.numRows;++j){
          grid[i][j].isWall = false;
        }
        
    }
    clearPath();
    configHandler(initialConfig);
    setGrid(grid);
    
    }

    const clearPath = () => {
      for(let i=0;i<initialConfig.numCols;++i){
        for(let j=0;j<initialConfig.numRows;++j){
          grid[i][j].isPath = false;
        }
        
    }
    configHandler(initialConfig)
    setGrid(grid);
    
  } 

    const findPathHandler = () => {
      const path = bfs(initialConfig,grid);
      console.log("path:" + path);
      
      if(path.length == 0){
        alert("Possible path not found...!");
        return;
      }
      let row = initialConfig.startRow;
      let col = initialConfig.startCol;

      for(let i=0;i<path.length;++i){
        setTimeout(() => {
          let char : string = path[i];

        if(char == "D"){
          let newCell = grid[col][row+1];
          newCell.isPath = true;
          grid[col][row+1] = newCell;
          row++;
        }
        else if(char == "L"){
          let newCell = grid[col-1][row];
          newCell.isPath = true;
          grid[col-1][row] = newCell;
          col--;
        }
        else if(char == "R"){
          let newCell = grid[col+1][row];
          newCell.isPath = true;
          grid[col+1][row] = newCell;
          col++;
        }
        else if(char == "U"){
          let newCell = grid[col][row-1];
          newCell.isPath = true;
          grid[col][row-1] = newCell;
          row--;
        }
        
        configHandler(initialConfig);
        setGrid(grid);
        },200*i)
      }
    }



    useEffect(() => {
        generateGrid();
    },[]);
  return (
    <>
    <div className="bg-black flex flex-col h-screen w-full">
      <Header/>
      <div className="flex flex-grow flex-row">
        <Grid initialConfig = {initialConfig} configHandler = {configHandler} grid = {grid} setGrid={setGrid} flag = {flag} flagHandler = {flagHandler} clearPath={clearPath}/>
        <Configuration initialConfig = {initialConfig} configHandler = {configHandler} flag = {flag} flagHandler = {flagHandler} resetHandler={resetHandler} findPathHandler={findPathHandler}/>
      </div>
    </div>
      
    </>
  )
}

export default App
