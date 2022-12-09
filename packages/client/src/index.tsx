import ReactDOM from 'react-dom';
import App from './App';
import { Providers } from './Providers';

//require('dotenv').config(); Did not need this in client!

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById('root')
);
