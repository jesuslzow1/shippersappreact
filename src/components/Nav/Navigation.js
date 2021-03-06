import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  UserAddOutlined,
  HomeFilled,
} from "@ant-design/icons";
export const Navigation = ({role}) => {
  const [current, setCurrent] = useState("home");
  const handleClick = (e) => {
    //console.log("click", e);
    setCurrent(e.key);
  };
  //console.log(role)
  return (
    <>
      <Menu
        onClick={handleClick}
        selectedKeys={current}
        mode="horizontal"
        theme="dark"
      >
        <Menu.Item key="home" icon={<HomeFilled />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="request" icon={<AppstoreOutlined />}>
          <Link to="/linker/create_request">Create Request</Link>
        </Menu.Item>
        <Menu.Item key="logout" icon={<UserAddOutlined />} className="float-right">
          <Link to="/logout">Logout</Link>
        </Menu.Item>
      </Menu>
    </>
  );
};
