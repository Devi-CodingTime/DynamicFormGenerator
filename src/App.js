
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import GenerateForm from './components/generateForm';

function App() {
  return (<>
  <Routes>
    <Route exact path='/' element={<GenerateForm/>}>
    </Route>
  </Routes>
        
      </>
    
  );
}

export default App;
