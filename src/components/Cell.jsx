import React, { useState, useEffect } from 'react';

export const COLOR_CLOSED = '#f05454';
export const COLOR_OPEN = '#e8e8e8';
export const COLOR_TEMP_PATH = '#3cc4fe';
export const COLOR_PATH = '#3ccf4e';
export const COLOR_FACE = '#ffff00';

const getStyle = (state, mazeSize, cellSize) => {
    if (state === 0) {
        return {
            backgroundColor: COLOR_OPEN,
            width: cellSize,
            height: cellSize,
        };
    } else if (state === 1) {
        return {
            backgroundColor: COLOR_CLOSED,
            width: cellSize,
            height: cellSize,
        };
    } else if (state === 2) {
        return {
            backgroundColor: COLOR_TEMP_PATH,
            border: `1px solid ${COLOR_TEMP_PATH}`,
            width: cellSize,
            height: cellSize,
        };
    } else if (state === 3) {
        return {
            backgroundColor: COLOR_PATH,
            border: `1px solid ${COLOR_PATH}`,
            width: cellSize,
            height: cellSize,
        };
    } else if (state === 4) {
        return {
            backgroundColor: COLOR_FACE,
            border: `1px solid ${COLOR_FACE}`,
            width: cellSize,
            height: cellSize,
        };
    }
}

const getCellDOM = (x, y, mazeSize) => {
    let cellDom;

    if (y === 0 && x === 0) {
        cellDom = (
            <div className="img-container">
                <img src="rat.png" alt="rat" />
            </div>
        );
    } else if (y === mazeSize - 1 && x === mazeSize - 1) {
        cellDom = (
            <div className="img-container">
                <img src="cheese.png" alt="cheese" />
            </div>
        );
    }

    return cellDom;
}

const Cell = (props) => {
    const { state, y, x, mazeSize, updateMaze } = props;
    const [cellSize, setCellSize] = useState(0);

    useEffect(() => {
        const updateCellSize = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            let cellSize = 0;
            const m = 2.5;

            if (windowWidth > windowHeight) {
                cellSize = windowHeight / (mazeSize * m);
            } else if (windowWidth <= windowHeight) {
                cellSize = windowWidth / (mazeSize * m);
            }

            setCellSize(cellSize);
        };

        updateCellSize();
        window.addEventListener('resize', updateCellSize);

        return () => {
            window.removeEventListener('resize', updateCellSize);
        };
    }, [mazeSize]);

    const onClickAddBarrier = function (e) {
        if (y === 0 && x === 0) return;
        if (y === mazeSize - 1 && x === mazeSize - 1) return;

        e.target.classList.toggle('barrier');

        updateMaze(curr => {
            const updatedMaze = curr.slice();

            if (updatedMaze[y][x] === 1) updatedMaze[y][x] = 0;
            else if (updatedMaze[y][x] === 0) updatedMaze[y][x] = 1;

            return updatedMaze;
        });
    };

    return (
        <div
            className="cell"
            style={getStyle(state, mazeSize, cellSize)}
            onClick={onClickAddBarrier}
        >
            {getCellDOM(x, y, mazeSize)}
        </div>
    );
}
export default Cell;