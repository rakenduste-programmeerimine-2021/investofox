import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import NavBar from './components/NavBar';
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import FetchStockApi from "./pages/Api";
import AddOrder from "./pages/Order";
import OrderList from "./pages/OrderList";
import PortfolioChart from "./pages/PortfolioChart";
import Store from "./store";

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
      <Store>
        <BrowserRouter>
          <Switch>
            <Route exact path={["/", "/login", "/register", "/forgot-password"]} component={authPages}/>
            <Route exact path={"/stock-api"}>
              <NavBar title="Stock API">
                <FetchStockApi />
              </NavBar>
            </Route>
            <Route exact path={"/add-order"}>
              <NavBar title="Add order">
                <AddOrder />
              </NavBar>
            </Route>
            <Route exact path={"/orders"}>
              <NavBar title="Orders">
                <OrderList />
              </NavBar>
            </Route>
            <Route exact path={"/settings"}>
              <NavBar title="Settings">
                <h1>Settings</h1> {/* Just a placeholder until the actual component is ready */}
              </NavBar>
            </Route>
            <Route exact path={"/chart"}>
              <NavBar title="Chart">
                <PortfolioChart />
              </NavBar>
            </Route>
          </Switch>
        </BrowserRouter>
        </Store>
    </div>
  );
};

export default App;
