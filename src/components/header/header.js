import React, { useState } from "react";
import { connect } from "react-redux";
import "./header.css";
import { LinkedinOutlined ,GithubOutlined,FacebookOutlined ,MenuOutlined} from "@ant-design/icons";
import {Avatar, Drawer, Space, Affix ,Divider} from "antd";
import { withRouter } from "react-router-dom";
import { logoutAction } from "../../actions/actions";

const HeaderComponent = (props) => {
  const [visible, showDrawer] = useState(false);
  const details = [
    {
      name: "Ayush Goel",
      linkedin: "https://www.linkedin.com/in/ayush-goel-2609",
      github: "https://github.com/ayushCronj",
      facebook: "https://www.facebook.com/AwesomeAyushGoel",
      skills: "NodeJS, ReactJS, React Native",
    },
    {
      name: "Priyanka Rai",
      linkedin: "https://www.linkedin.com/in/priyanka-rai-95714b167/",
      github: "https://github.com/imrai02",
      facebook: "https://www.facebook.com/profile.php?id=100010372787475",
      skills: " React, Angular, UI/UX, NodeJs",
    },
    {
      name: "Prateek Agarwal",
      linkedin: "https://www.linkedin.com/in/prateek-agarwal-631414113/",
      github: "https://github.com/123neo",
      facebook: "https://www.facebook.com/prateek.agarwal.94617/",
      skills: "ReactJS, React Native, NodeJS",
    },
  ];

  const detailContainer = details.map((item) => {
    return (
      <div className="details" key={item.name}>
      <div className="name">
    <p style={{ paddingBottom:"1vh"}}>{item.name}</p>
    </div>
    <p>Skills : {item.skills}</p>
    <div className="icons">
    <a style={{color:'#2d92d1'}} target="_blank"  href={item.linkedin}>
    <LinkedinOutlined />
    </a>
    <a style={{color:'#9ee493'}} target="_blank"  href={item.github}>
    <GithubOutlined />
    </a>
    <a style={{color:'3da5d9'}} target="_blank"  href={item.facebook}>
    <FacebookOutlined />
    </a>
    </div>
    <Divider ></Divider>
    </div>
    )
  })
  return (
    <Affix offsetTop={0}>
      <div className="header">
      {/* <img className="logo"  src={require('../../assests/taskup.png')} alt="Menu Icon" /> */}
      <i nz-icon nzType="appstore" nzTheme="outline"></i>
        <div className="subHeader">
          <Space size="middle">
            <p>Hi {props.name}!</p>
            <p
              className="logout"
              onClick={() => {
                localStorage.clear();
                props.logoutAction(props.auth.email, props.auth.user_token);
              }}
            >
              Logout
            </p>
            {/* <Avatar className="menu" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} onClick={() => showDrawer(true)} icon={<MenuOutlined />} /> */}
            <img className="menu" onClick={() => showDrawer(true)} src={require('../../assests/menu.svg')} alt="Menu Icon" />
          </Space>
        </div>
        <Drawer
          className="drawer"
          title="Know Us!"
          placement="right"
          closable={true}
          bodyStyle={{ backgroundColor: "#022b3a" }}
          visible={visible}
          onClose={() => showDrawer(false)}
        >
          {detailContainer}
        </Drawer>
      </div>
    </Affix>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: (email, token) => dispatch(logoutAction(email, token)),
  };
};

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);

export default withRouter(Header);
