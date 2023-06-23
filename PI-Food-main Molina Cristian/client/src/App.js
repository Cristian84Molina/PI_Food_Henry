import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './views/home/Home';
import Landing from './views/landing/Landing';
import Recipes from '../src/views/forms/Recipes';
import Details from './views/detail/Details';
import dotenv from 'dotenv';
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';
dotenv.config();

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact render={() => <Landing />} />
        <Route path="/Home" component={Home} />
        <Route path="/addrecipe" exact render={() => <Recipes />} />
        <Route path="/details/:id" exact render={() => <Details />} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;

