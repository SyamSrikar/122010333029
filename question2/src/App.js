import logo from './logo.svg';
import './App.css';
import { Routes, Route, Router } from 'react-router-dom';
import SingleTrain from './Components/SingleTrain';
import Alltrains from './Components/Alltrains';

function App() {
  return (
      <Routes>
        <Route exact path='/' element={<Alltrains/>} />
        <Route path="/train/:trainNumber" element={<SingleTrain />} />
      </Routes>
  );
}

export default App;
