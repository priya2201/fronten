import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import EditProduct from './components/EditProduct';
import AllProducts from './components/AllProducts';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<AllProducts />} />

        <Route exact path='/edit-product/:id' element={<EditProduct/>}/>
</Routes>
    </div>
  );
}

export default App;
