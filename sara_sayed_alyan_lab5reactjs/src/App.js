import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbb from './component/navbb.js';
import Login from './pages/login.js';
import Register from './pages/register.js';
import Movies from './pages/Movies.js';
import Pro from './pages/pro.js';
import Home from './pages/home.js';
import NotFound from './pages/NotFound.js';
import moviesdetails from './pages/moviesdetails.js';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbb />

        <Switch>
        <Route component={Home} path="/" exact />
          <Route component={Login} path="/login" exact />
           <Route component={Register} path="/register" exact /> 
           <Route component={Pro} path="/Portfolio" exact /> 
           <Route component={Movies} path="/Movies" exact /> 
           <Route component={moviesdetails} path="/moviesdetails/:id" exact /> 

           <Route component={NotFound} path="*" exact /> 


        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
