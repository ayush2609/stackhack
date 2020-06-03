import React from "react";
import "./login.css";
import { Button } from "antd";
import InputBox from "../../components/input/input";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userLogin } from "../../actions/actions";
import  notificationOpen from '../../utils/notification' 

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth.isLoggedIn !== this.props.auth.isLoggedIn){
      if (this.props.auth.isLoggedIn) {
        this.props.history.push("/tasks");
      }
    } else if ((prevProps.auth.error !== this.props.auth.error ) && this.props.auth.error === true) {
      let data = {
        type : 'error',
        description : this.props.auth.errorMsg
      }
      notificationOpen(data)
    }
  }

  submitForm = () => {
    const parameters = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.userLogin(parameters);
  };

  redirect = () => {
    this.props.history.push("/register");
  };

  changeHandler = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    this.setState({
      [key]: value,
    });
  };



  render() {
    return (
      <div className="singupMain">
        <div className="imgContainer">
          <h3 className="textHeading">Welcome.</h3>
          <h3 className="textHeading">Manage Your World.</h3>
        </div>
        <div className="signupContainer loginContainer">
          <p className="heading">Login now and get started!</p>
          <div className="inputContents">
            <InputBox
              placeholder={"Email"}
              name={"email"}
              type="text"
              changeHandler={this.changeHandler}
              value={this.state.email}
            />
          </div>
          <div className="inputContents">
            <InputBox
              placeholder={"Password"}
              name={"password"}
              type="password"
              changeHandler={this.changeHandler}
              value={this.state.password}
            />
          </div>
          <div className="inputContents">
            <Button
              type="primary"
              style={{ width: 200 }}
              shape="round"
              onClick={() => {
                this.submitForm();
              }}
            >
              Submit
            </Button>
            <br />
            Not Registerd?
            <p className="text" onClick={() => this.redirect()}>
              Signup Now!
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (parameters) => dispatch(userLogin(parameters)),
  };
};

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

export default withRouter(Login);
