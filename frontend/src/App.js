import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import NavBar from './components/NavBar';
import Login from "./pages/Login";
import Portfolio from "./pages/Portfolio";
import AddOrder from "./pages/Order";
import OrderList from "./pages/OrderList";

const authPages = () => (
  <div>
    <Route exact path={["/", "/login"]} component={Login} />
    <Route exact path="/register" component={Register} />
  </div>
)

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path={["/", "/login", "/register"]} component={authPages}/>
          <Route exact path={"/portfolio"}>
            <NavBar title="My portfolio">
              <Portfolio />
            </NavBar>
          </Route>
          <Route exact path={"/add-order"}>
            <NavBar title="Add order">
              <AddOrder />
            </NavBar>
          </Route>
          <Route exact path={"/orders"}>
            <NavBar title="Order">
              <OrderList />
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
