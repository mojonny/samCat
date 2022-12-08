import ReactDOM from 'react-dom';
import App from './App';
import { Providers } from './Providers';

require('dotenv').config();

console.log(process.env);

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById('root')
);
