import React from 'react';
import './signup.css'
import {Button} from 'antd'
import InputBox from '../../components/input/input'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userSignup } from '../../actions/actions'
import  notificationOpen from '../../utils/notification' 


class Signup extends  React.Component{
    constructor(props){
        super(props);
        this.state = {
            password : "",
            email : "",
            name : "",
            isPasswordSame : false ,
            isPasswordTouched : false

        }
    }

  componentDidUpdate(prevProps, prevState) {
      if (prevProps.auth.isRegistered !== this.props.auth.isRegistered){
        if (this.props.auth.isRegistered) {
          let data = {
            type : 'success',
            description : "User Signup Success"
          }
          notificationOpen(data)
          this.props.history.push("/login");
        }
      } else if ((prevProps.auth.error !== this.props.auth.error ) && this.props.auth.error === true) {
        let data = {
          type : 'error',
          description : this.props.auth.errorMsg
        }
        notificationOpen(data)
      }
  }

redirectLogin = () => {
    this.props.history.push('/login' )
      };
    
 changeHandler = (e) => {
        let key = e.target.name
        let value = e.target.value
         this.setState ({
             [key] : value
         })
      }

 confirmPassword = (e) => {   
        if(this.state.password === e.target.value){
           this.setState ({
               isPasswordSame : true,
               isPasswordTouched : true
           })
        } else {
            this.setState ({
                isPasswordSame : false,
                isPasswordTouched : true
            })
        }
      }

submitForm = () => {
  const parameters = {
    email: this.state.email,
    name :this.state.name,
    password: this.state.password,
  };
  this.props.userSignup(parameters);
}

render(){    
  return (
    <div className="singupMain">
        <div className="imgContainer">
        <h3 className="textHeading">Welcome.</h3>
        <h3 className="textHeading">Manage Your World.</h3>
        </div>
        
      <div className="signupContainer">    
      <p class="heading">We need some details to get you on board!</p>
        <div class="inputContents">
          <InputBox placeholder={"Name"} name={'name'} type="text" changeHandler={this.changeHandler}/>
        </div>
        <div class="inputContents">
          <InputBox placeholder={"Email"} name={'email'} type="text" changeHandler={this.changeHandler}/>
        </div>
        <div class="inputContents">
          <InputBox placeholder={"Password"} name={'password'} type="password" changeHandler={this.changeHandler}/>
        </div>
        <div class="inputContents">
          <InputBox placeholder={"Confirm Password"} name={'confirmPassword'} type="password" changeHandler={this.confirmPassword}/>
          {(!this.state.isPasswordSame && this.state.isPasswordTouched)?
            <p className="errorMsg">Password does not match!</p>  : null
          }
        </div>
        <div class="inputContents">
        <Button type="primary" style={{width:200}} shape="round" onClick={() => {this.submitForm()}}>Submit</Button>
        Already a user?<p className="text" onClick={()=>this.redirectLogin()}>Login</p>
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
    userSignup: (parameters) => dispatch(userSignup(parameters)),
  };
};

const SignupComponent = connect(mapStateToProps , mapDispatchToProps)(Signup)

export default withRouter(SignupComponent);