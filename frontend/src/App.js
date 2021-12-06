import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import NavBar from './components/NavBar';
import Login from "./pages/Login";
import Portfolio from "./pages/Portfolio";
import ForgotPassword from "./pages/ForgotPassword";

const authPages = () => (
  <div>
    <Route exact path={["/", "/login"]} component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/forgot-password" component={ForgotPassword} />
  </div>
)

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path={["/", "/login", "/register", "/forgot-password"]} component={authPages}/>
          <Route exact path={"/portfolio"}>
            <NavBar title="My portfolio">
              <Portfolio />
            </NavBar>
          </Route>
          <Route exact path={"/add-order"}>
            <NavBar title="Add order">
              <h1>Add order page</h1> {/* Just a placeholder until the actual component is ready */}
            </NavBar>
          </Route>
          <Route exact path={"/order"}>
            <NavBar title="Order">
              <h1>Order page</h1> {/* Just a placeholder until the actual component is ready */}
            </NavBar>
          </Route>
          <Route exact path={"/settings"}>
            <NavBar title="Settings">
              <h1>Settings</h1> {/* Just a placeholder until the actual component is ready */}
            </NavBar>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
