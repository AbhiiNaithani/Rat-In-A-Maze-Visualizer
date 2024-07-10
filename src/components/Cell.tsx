
import { cellType } from "../types"
export const Cell = ({cellData,onClick} : {cellData: cellType, onClick: any}) => {
    const {row,column,isStart,isEnd,isWall,isPath} = cellData;
    const cellStyle = isStart? "start" : isEnd? "end" : isWall? "wall" : isPath? "path": "";
    return <div id={`cell-${row}-${column}`} className={`flex flex-grow bg-stone-900 border-stone-600 border-2 rounded-md ${cellStyle}`} onMouseDown={() => onClick(row,column)}>
        {/* {`row : ${cellData.row} col : ${cellData.column}`} */}
    </div>
}