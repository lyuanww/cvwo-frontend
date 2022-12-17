import { Layout, Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

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
      style={{ background: "rgba(255, 255, 255, 0.918)" }}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          height: 32,
          margin: 16,
        }}
      />
      <Menu
        style={{ color: "blue", background: "rgba(246, 244, 247, 0.918)" }}
        defaultSelectedKeys={["1"]}
        mode="inline"
      >
        <Link to="/home">
          <Menu.Item key="/dashboard">Dashboard</Menu.Item>
        </Link>
        <Menu.SubMenu title="d" key="/dashboard">
          <Link to="/home">
            <Menu.Item key="/dashboard">Dashboard</Menu.Item>
          </Link>
        </Menu.SubMenu>

        {/* <Link to="/add-recipe">
               <Menu.Item key="/add-recipe">
                 Add Recipes
               </Menu.Item>
             </Link> */}
      </Menu>
    </Sider>
  );
};

export default SideBar;
