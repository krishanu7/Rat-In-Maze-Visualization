import React, { useState, useEffect } from 'react';

//set the appearance of each state is defined by a set of color
export const COLOR_CLOSED = '#f05454';
export const COLOR_OPEN = '#e8e8e8';
export const COLOR_TEMP_PATH = '#3cc4fe';
export const COLOR_PATH = '#3ccf4e';
export const COLOR_FACE = '#ffff00';

//getStyle returns a style object that determines the appearance of the cell.
const getStyle = (state, mazeSize, cellSize) => {
    //There are five possible states, each represented by a number
    //state = 0 => open
    if (state === 0) {
        return {
            backgroundColor: COLOR_OPEN,
            width: cellSize,
            height: cellSize,
        }
    } else if (state === 1) {
        //state = 1 => Close
        return {
            backgroundColor: COLOR_CLOSED,
            width: cellSize,
            height: cellSize,
        }
    } else if (state === 2) {
        //state = 2 => Temporary Path
        return {
            backgroundColor: COLOR_TEMP_PATH,
            width: cellSize,
            height: cellSize,
        }
    } else if (state === 3) {
        //state = 3 => path
        return {
            backgroundColor: COLOR_PATH,
            border: `1px solid ${COLOR_PATH}`,
            width: cellSize,
            height: cellSize,
        }
    }
}
//getCellDOM returns an optional DOM element that contains an image of either the rat or the cheese

const getCellDOM = (x, y, mazeSize) => {
    let cellDom;
    if (y === 0 && x === 0) {
        cellDom = (
            <div className="img-container">
                <img src="rat.png" alt="rat" />
            </div>
        )
    } else if (y === mazeSize - 1 && x === mazeSize - 1) {
        cellDom = (
            <div className="img-container">
                <img src="cheese.png" alt="cheese" />
            </div>
        )
    }
    return cellDom;
}

const Cell = (props) => {
// - The useState hook is used to initialize the state variable to the value of the maze cell at position (x, y).
    const { maze, setMaze, mazeSize, x, y } = props;
    const [state, setState] = useState(maze[y][x]);
    const [cellSize, setCellSize] = useState(0);
// - The useEffect hook is used to calculate and set the cellSize state variable based on the current window size and the mazeSize prop.
    useEffect(() => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let cellSize = 0;
        const m = 2.5;

        if (windowWidth > windowHeight) {
            cellSize = windowHeight / (mazeSize * m);
        } else {
            cellSize = windowWidth / (mazeSize * m);
        }
        setCellSize(cellSize);
    }, [mazeSize])
// - The onClickAddBarrier function is called when the cell is clicked. It updates the maze state by toggling 
//the barrier status of the cell at position (x, y), and then updates the state variable to reflect the new state of the cell.
    const onClickAddBarrier = () => {
        if (y === 0 && x === 0) return;
        if (y === mazeSize - 1 && x === mazeSize - 1) return;

        const updatedMaze = maze.map((row, i) =>
            row.map((col, j) => {
                if (i === y && j === x) {
                    return maze[y][x] === 1 ? 0 : 1;
                }
                return col;
            })
        )
        setMaze(updatedMaze);
        setState(updatedMaze[y][x]);
    }
    return (
        <div
            className="cell"
            style={getStyle(state, mazeSize, cellSize)}
            onClick={onClickAddBarrier}>
            {getCellDOM(x, y, mazeSize)}
        </div>
    )
}
// - The getStyle function returns an object containing the CSS style properties for the cell, based on its state, mazeSize, and cellSize values.
// - The getCellDOM function returns an optional JSX element to be displayed inside the cell, depending on its position in the maze. In this case, 
    //it displays an image of a rat for the start cell, and an image of a cheese for the end cell.
export default Cell;
