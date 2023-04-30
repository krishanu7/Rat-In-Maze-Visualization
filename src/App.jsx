import React, { useState } from "react";

import Maze from "./components/Maze";
import InputForm from "./components/InputForm";
import Legend from "./components/Legend";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const App = () => {
  const [speed, setSpeed] = useState(200);
  const [mazeSize, updateMazeSize] = useState(5);
  const [maze, updateMaze] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);

  const isSafe = function (maze, n, x, y) {
    if (x < n && y < n && maze[x][y] === 0) return true;
    return false;
  };

  const ratInAMaze = async function (maze, n, x, y) {
    try {
      if (x === n - 1 && y === n - 1) {
        maze[x][y] = 2;
        return true;
      }

      await delay(speed);
      updateMaze((maze) => maze.slice());

      if (isSafe(maze, n, x, y)) {
        maze[x][y] = 2;

        if (await ratInAMaze(maze, n, x + 1, y)) return true;
        if (await ratInAMaze(maze, n, x, y + 1)) return true;

        maze[x][y] = 0;
        return false;
      }

      return false;
    } catch (err) {
      console.log(err);
    }
  };

  const startVis = async function () {
    try {
      await ratInAMaze(maze, mazeSize, 0, 0);

      await delay(300);
      updateMaze((curr) => {
        const updatedMaze = curr.slice();

        // change the color from blue to green
        for (let i = 0; i < updatedMaze.length; i++) {
          for (let j = 0; j < updatedMaze[i].length; j++) {
            if (updatedMaze[i][j] === 2) updatedMaze[i][j] = 3;
          }
        }

        // change the start and end into yellow
        updatedMaze[0][0] = 4;
        updatedMaze[mazeSize - 1][mazeSize - 1] = 4;

        return updatedMaze;
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main">
      <header>
        <h1>Rat in a Maze - Visualization</h1>
        <p>Click the boxes to add barriers</p>
      </header>
      <InputForm
        updateMazeSize={updateMazeSize}
        updateMaze={updateMaze}
        startVis={startVis}
        setSpeed={setSpeed}
      />
      <Maze mazeSize={mazeSize} maze={maze} updateMaze={updateMaze} />
      <Legend />
    </div>
  );
};
export default App;
