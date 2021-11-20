import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;