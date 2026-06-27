import './App.css';
import Invitation from './views/Invitation';
import Entrance from './views/Entrance';
import { useState } from 'react';

function RosePaul() {
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

export default RosePaul;
