import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      collapsedWidth={0}
      zeroWidthTriggerStyle={{
        background: "rgba(212, 62, 62, 0.918)",
        position: "absolute",
        top: 13,
      }}
      style={{ background: "rgba(1, 12, 36, 0.918)" }}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          height: 32,
          margin: 16,
        }}
      />
      <Menu style={{ background: "rgba(5, 31, 91, 0.918)" }} mode="inline">
        <Link to="/home">
          <Menu.Item key="/home">Home</Menu.Item>
        </Link>

        <Link to="/myposts">
          <Menu.Item key="/myposts">My Posts</Menu.Item>
        </Link>

        <Link to="/tags">
          <Menu.Item key="/tags">Tags</Menu.Item>
        </Link>
      </Menu>
    </Sider>
  );
};

export default SideBar;
