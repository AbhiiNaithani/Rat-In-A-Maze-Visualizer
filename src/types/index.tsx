export type configType ={
    numRows: number,
    numCols : number,
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number
}

export type cellType = {
    row : number,
    column : number,
    isStart : boolean,
    isEnd : boolean,
    isWall : boolean,
    isPath : boolean,
} 