import React , {useState} from 'react'
import Maze from './components/Maze';
import Legend from './components/Legend';
const App = () => {
  const [maze, updateMaze] = useState([
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
	]);
  return (
    <>
      <Maze mazeSize={5} maze={maze} updateMaze={updateMaze} />
      <Legend/>
    </>
  )
}

export default App
