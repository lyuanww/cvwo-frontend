import { Layout, Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "../store/rootType";

const { Header } = Layout;
const TopHeader: React.FC = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        Post it!
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
