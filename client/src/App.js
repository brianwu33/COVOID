import './App.css';
import Home from "./Components/Home/Home";
import Form from "./Components/Form/Form";
import SideNavbar from "./Components/SideNavbar/SideNavbar";
import Display from "./Components/Display/Display"
// import TopNavbar from "./Components/TopNavbar/TopNavbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <SideNavbar/>
      <Switch>
        <Route exact strict path="/">
          <Home/>
        </Route>
        <Route path="/form">
          <Form/>
        </Route>
        <Route path="/display">
          <Display/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
