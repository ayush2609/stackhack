import React from "react";
import { connect } from "react-redux";
import "./mainLayout.css";
import Headers from "../../components/header/header";
import Footer from "../../components/footer/footer";
import TaskList from "../tasklist/taskList";
import TaskActions from "../taskActions/taskActions";

class MainLayoutComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div>
       
        <Headers name ={this.props.auth.user_name}/>
        <br />
        <div className="outerContainer ">
          <div className="containerItem item1">
            <TaskActions auth={this.props.auth}/>
          </div>
          <div className="containerItem margins item2">
            <TaskList />
          </div>
        </div>
        <Footer />
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

const MainLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayoutComponent);

export default MainLayout;
