import { Layout, Menu, Avatar, Button, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAppSelector } from "../store/hooks";
import { useDispatch } from "react-redux";
import { Dispatch } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  logout,
  logoutSessionAsync,
  selectSession,
} from "../store/session/sessionSlice";

const { Header } = Layout;
const TopHeader: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const session = useAppSelector(selectSession);

  const checkLogin = session.isLoggedIn === false;

  const onClickLogin = () => {
    navigate("/login");
  };

  const handleSuccess = () => {
    navigate("/login");
  };

  const onClickLogout = () => {
    dispatch(logoutSessionAsync());
    dispatch(logout());
    handleSuccess();
  };
  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        Post it!
        <div style={{ position: "absolute", marginLeft: 100 }}>
          <Menu.Item key="/logout" onClick={onClickLogout}>
            Log Out
          </Menu.Item>
        </div>
        <div style={{ position: "absolute", right: 170 }}>
          {session.image_url ? (
            <Avatar size={40} src={session.image_url} />
          ) : (
            <Avatar size={40} icon={<UserOutlined />} />
          )}
        </div>
        <p style={{ position: "absolute", lineHeight: 3, right: 130 }}>
          {session.username}
        </p>
      </Menu>
    </Header>
  );
};

export default TopHeader;
