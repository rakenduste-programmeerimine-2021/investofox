import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={["/", "/login"]} component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;