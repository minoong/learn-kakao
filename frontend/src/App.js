import logo from './logo.svg';
import './App.css';
import MainPage from './page/MainPage';
import { Route } from 'react-router-dom';

function App() {
  return <Route component={MainPage} path={['/@:username', '/']} exact />;
}

export default App;
