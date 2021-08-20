import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, useHistory, withRouter } from "react-router-dom"
import Login from './components/Login';
import WorkWeek from './components/WorkWeek/WorkWeek';
import ViewCards from './components/ViewCards/ViewCards';
import ViewEmployees from './components/ViewEmployees';


function App() {
  return (
    <Router>
      <div className="app">
        <Switch>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/work">
            <WorkWeek />
          </Route>

          <Route path="/viewcards">
            <ViewCards />
          </Route>

          <Route path="/admin">
            <ViewEmployees />
          </Route>

          <Route path="/">
            <Login />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
