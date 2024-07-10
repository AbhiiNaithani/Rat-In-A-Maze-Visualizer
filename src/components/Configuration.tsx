import {useState } from "react"
import { configType, } from "../types"

export const Configuration = ({initialConfig, configHandler, flag, flagHandler, resetHandler,findPathHandler} :{initialConfig : configType , configHandler: any, flag : any, flagHandler: any, resetHandler: any,findPathHandler: any}) => {
    const [rows,setRows] = useState(initialConfig.numRows);
    const [cols,setCols] = useState(initialConfig.numCols);

    const rowsInputHandler = (e : any) => {
        if(e.target.value <= 0) return;
        setRows(e.target.value);
        let newConfig = initialConfig;
        newConfig.numRows = parseInt(e.target.value);
        newConfig.startRow = 0;
        newConfig.startCol = 0;
        newConfig.endRow = e.target.value-1;
        console.log(newConfig);
        configHandler(newConfig);
    }

    const colsInputHandler = (e : any) => {
        if(e.target.value <= 0) return;
        setCols(e.target.value);
        let newConfig = initialConfig;
        newConfig.numCols = parseInt(e.target.value);
        newConfig.startRow = 0;
        newConfig.startCol = 0;
        newConfig.endCol = e.target.value-1;
        configHandler(newConfig);
    }


    return (
        <div className="bg-stone-900 flex flex-col justify-around basis-1/4 m-4 border-2 border-stone-600 rounded-md ">
            <div className="flex ">
                <div className="flex flex-col items-center ">
                    <div className="text-green-600 text-2xl text-center font-bold font-serif italic">
                        Rows
                    </div>
                    <input className="w-3/4 h-12 rounded-md border-2 border-stone-600 text-center text-2xl my-2 text-green-600 font-bold" type="number" name="rows" value={rows} onChange={(e) => rowsInputHandler(e)}/>
                    
                </div>
                <div className="text-green-600 text-2xl text-center font-bold font-serif italic flex flex-col justify-end py-4">X</div>
                <div className="flex flex-col items-center ">
                    <div className="text-green-600 text-2xl text-center font-bold font-serif italic">
                        Columns
                    </div>
                    <input className="w-3/4 h-12 rounded-md border-2 border-stone-600 text-center text-2xl my-2 text-green-600 font-bold" type="number" name="rows" value={cols} onChange={(e) => colsInputHandler(e)}/>
                   
                </div>
            </div>
            <div className="flex justify-between px-6 my-2">
                <div className="bg-green-600 rounded-md border-2 border-stone-600 text-center w-2/5  py-2 text-xl font-bold text-stone-900 font-serif hover:bg-green-500" onClick={() => flagHandler(1,0,0)}>Starting</div>
                <div className="bg-green-600 rounded-md border-2 border-stone-600 text-center w-2/5  py-2 text-xl font-bold text-stone-900 font-serif hover:bg-green-500" onClick={() => flagHandler(0,1,0)}>Ending</div>
            </div>
            <div className="flex justify-between px-6 my-2">
                <div className="bg-green-600 rounded-md border-2 border-stone-600 text-center w-2/5  py-2 text-xl font-bold text-stone-900 font-serif hover:bg-green-500" onClick={() => flagHandler(0,0,1)}>Add Walls</div>
                <div className="bg-green-600 rounded-md border-2 border-stone-600 text-center w-2/5  py-2 text-xl font-bold text-stone-900 font-serif hover:bg-green-500" onClick = {resetHandler}>Reset</div>
            </div>
            <div className="bg-green-600 rounded-md border-2 border-stone-600 text-center py-2 text-xl font-bold text-stone-900 font-serif m-6 hover:bg-green-500" onClick={findPathHandler}>Find Path</div>
        </div>
    )
}