import './App.css';
import Invitation from './views/Invitation';
import Entrance from './views/Entrance';
import { useState } from 'react';

function App() {
  const [isFirstTime, setIsFirstTime] = useState(true);

  return (
    <>
      {isFirstTime ?
        <Entrance setIsFirstTime={setIsFirstTime} /> :
        <Invitation />
      }
    </>
  );
}

export default App;
