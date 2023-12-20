import logo from './logo.svg';
import './App.css';

import Navbar from './Components/Navbar';
import MyDashboard from './Components/MyDashboard';

function App() {
  return (
    <div  style={{background:"lightyellow",width:"1280px"}} className="App">
      <Navbar/>
   <MyDashboard/>
    </div>
  );
}

export default App;
