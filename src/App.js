import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import {ShippersNewRequest} from './pages/Linker/ShippersNewRequest';
import {Navigation} from './components/Nav/Navigation';
function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/linker/create_request" component={ShippersNewRequest}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
