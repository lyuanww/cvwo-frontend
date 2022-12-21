import { Layout, Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;
const TopHeader: React.FC = () => {
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
        <p style={{ position: "absolute", lineHeight: 3, right: 100 }}>User</p>
      </Menu>
    </Header>
  );
};

export default TopHeader;
