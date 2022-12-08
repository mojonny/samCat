import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Nav from './components/Nav';
import Toppings from './components/toppings/Toppings';
import Pizzas from './components/pizza/Pizzas';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizzas" element={<Pizzas />} />
        <Route path="/toppings" element={<Toppings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
