import React from 'react';
import Cell from './Cell';

const Maze = (props) => {
  const { maze, mazeSize, updateMaze } = props;

  return (
    <div className="maze">
      {maze.map((row, rowNum) => (
        <div className="row" key={rowNum}>
          {row.map((cell, cellNum) => (
            <Cell
              key={`${rowNum}${cellNum}`}
              maze={maze}
              setMaze={updateMaze}
              y={rowNum}
              x={cellNum}
              mazeSize={mazeSize}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Maze;
