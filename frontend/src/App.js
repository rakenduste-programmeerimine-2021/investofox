import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import NavBar from './components/NavBar';
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Switch>
          <Route exact path={["/", "/login"]} component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;