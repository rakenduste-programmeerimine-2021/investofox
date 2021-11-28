import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Portfolio from "./pages/Portfolio";
import Order from "./pages/Order";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={["/", "/login"]} component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/portfolio" component={Portfolio} />
        <Route exact path="/order" component={Order} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;