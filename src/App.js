import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { HomePage } from "./pages/Home/HomePage";
import { ShippersNewRequest } from "./pages/Linker/ShippersNewRequest";
import { Navigation } from "./components/Nav/Navigation";

import { useSelector } from "react-redux";
function App() {
  const user =  useSelector(state => state.user.user);
    console.log(user)
  return (
    <>
      <Router>
          <Switch>
            {
              !user ? (
                <Route exact path="/" component={Login}></Route>
                ) : (
                  <>
                <Navigation role={user.role} />
                <Route exact path="/" component={HomePage}></Route>
                <Route
                  exact
                  path="/linker/create_request"
                  component={ShippersNewRequest}
                ></Route>
                </>

              )
            }
          </Switch>
      </Router>
    </>
  );
}

export default App;
