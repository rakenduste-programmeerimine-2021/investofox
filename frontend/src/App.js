import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import NavBar from './components/NavBar';
import Login from "./pages/Login";

const authPage = () => (
  <div>
    <Route exact path={["/", "/login"]} component={Login} />
    <Route exact path="/register" component={Register} />
  </div>
)

const regularPage = () => (
  <NavBar/>
)

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path={["/", "/login", "/register"]} component={authPage}/>
          <Route component={regularPage}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;