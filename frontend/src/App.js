import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={["/", "/login"]} component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/portfolio" component={Portfolio} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;