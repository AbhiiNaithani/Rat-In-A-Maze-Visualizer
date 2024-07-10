
import { configType, cellType } from "../types"
import { Cell } from "./Cell";


export const Grid = ({initialConfig,configHandler,grid,setGrid,flag,flagHandler,clearPath} :{initialConfig : configType,configHandler: any, grid : cellType[][],setGrid:any, flag : any,flagHandler : any,clearPath:any}) => {
    
    const onCellClickHandler = (row:number, col:number) => {
        let cell = grid[row][col];
        let newCell = {...cell};
        
        let newConfig = initialConfig;
        if(flag.start && !cell?.isEnd){
            // clearPath();
            grid[initialConfig.startCol][initialConfig.startRow].isStart = false;
            newConfig.startRow = col;
            newConfig.startCol = row;
            flagHandler(0, flag.end, flag.wall);
            newCell.isStart = true;
            
        }
        else if(flag.end && !cell?.isStart){
            // clearPath();
            grid[initialConfig.endCol][initialConfig.endRow].isEnd = false;
            newConfig.endRow = col;
            newConfig.endCol = row;
            flagHandler(flag.start,0,flag.wall);
            newCell.isEnd = true;
        }
        else if(flag.wall && !cell?.isStart && !cell?.isEnd){
            newCell.isWall = !newCell.isWall;
            newCell.isPath = false;
            // if(newCell.isPath) clearPath();

        }
        clearPath();
        configHandler(newConfig);
        
        grid[row][col] = newCell;
        setGrid(grid);
    }

    


    return (
        <div className="bg-stone-600 flex flex-grow basis-3/4 m-4 border-2 border-stone-600 rounded-md">
            {
                grid && grid.map((rowArr , rowIndex) => {
                    return(
                        <div key={rowIndex} className="flex flex-grow flex-col">
                            {
                                rowArr.map((cell , cellIndex) => {
                                    return (
                                        <div key = {cellIndex} className={`flex flex-grow`}>
                                        <Cell  cellData = {cell} onClick = {onCellClickHandler}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}