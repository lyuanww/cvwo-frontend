import { Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Layout, Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAppSelector } from "../store/hooks";
import {
  logout,
  logoutSessionAsync,
  selectSession,
} from "../store/session/sessionSlice";
import "./header.css";

const { Header } = Layout;

const TopHeader: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const session = useAppSelector(selectSession);

  const handleSuccess = () => {
    navigate("/");
  };

  const onClickLogout = () => {
    dispatch(logoutSessionAsync());
    dispatch(logout());
    handleSuccess();
  };

  const onClickLogin = () => {
    navigate("/");
  };

  return (
    <Header className="header">
      <Menu theme="dark" mode="horizontal">
        <div className="title">Post it!</div>
        <div style={{ position: "absolute", marginLeft: 300 }}>
          {session.id == null && (
            <Menu.Item className="title" key="/logout" onClick={onClickLogin}>
              Login
            </Menu.Item>
          )}
          <Menu.Item className="title" key="/login" onClick={onClickLogout}>
            Log Out
          </Menu.Item>
        </div>
        {session.id !== null && (
          <div style={{ position: "absolute", right: 170 }}>
            {session.image_url ? (
              <Avatar size={55} src={session.image_url} />
            ) : (
              <Avatar size={55} icon={<UserOutlined />} />
            )}
          </div>
        )}

        <div
          style={{
            position: "absolute",
            lineHeight: 3,
            right: 105,
            fontSize: 20,
          }}
        >
          {session.username}
        </div>
      </Menu>
    </Header>
  );
};

export default TopHeader;
