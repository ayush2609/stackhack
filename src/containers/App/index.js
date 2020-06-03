import React from "react";
import { connect } from "react-redux";
import MainLayout from "../mainLayout/mainLayout";
import "./index.css";

import "antd/dist/antd.css";
import history from "../../history";
import Login from "../login/login";
import Singup from "../signup/signup";
import { Router, Route, Redirect } from "react-router-dom";

class AppRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="App">
        {!this.props.auth.isLoggedIn ? (
          <Router history={history}>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Singup}></Route>
            <Redirect from="*" to="/login"></Redirect>
          </Router>
        ) : (
          <Router history={history}>
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect from="/" to="/tasks" />;
              }}
            />
            <Route
              exact
              path="/login"
              render={() => {
                return <Redirect from="/login" to="/tasks" />;
              }}
            ></Route>
            <Route exact path="/tasks" component={MainLayout}></Route>
          </Router>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

const App = connect(mapStateToProps, mapDispatchToProps)(AppRoot);

export default App;
