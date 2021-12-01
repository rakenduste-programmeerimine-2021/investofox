import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Portfolio from "./pages/Portfolio";
import Order from "./pages/Order";
import OrderList from "./pages/OrderList";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={["/", "/login"]} component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/portfolio" component={Portfolio} />
        <Route exact path="/order" component={Order} />
        <Route exact path="/order-list" component={OrderList} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;