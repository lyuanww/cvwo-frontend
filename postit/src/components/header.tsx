import { Layout, Menu, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAppSelector } from "../store/hooks";
import { useDispatch } from "react-redux";
import { Dispatch } from "react";
import { logoutUser } from "../store/user/actions";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const TopHeader: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const handleSuccess = () => {
    navigate("/login");
  };

  const onClick = () => {
    dispatch(logoutUser(handleSuccess));
  };
  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        Post it!
        <Button onClick={onClick}>Log out</Button>
        <Avatar
          style={{ position: "absolute", right: 170 }}
          size={60}
          icon={<UserOutlined />}
        />
        <p style={{ position: "absolute", lineHeight: 3, right: 100 }}>
          {user.username}
        </p>
      </Menu>
    </Header>
  );
};

export default TopHeader;
