import { BrowserRouter, Route, Switch, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" component={Home} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;