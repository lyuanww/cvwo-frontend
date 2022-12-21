import React, { Dispatch, useState } from "react";
import { Layout, Menu, Button, Input, Form } from "antd";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/user/actions";
import { useNavigate } from "react-router-dom";

const { Content, Header } = Layout;
const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = () => {
    setUsername("");
    setPassword("");

    navigate("/");
  };

  const onFinish = () => {
    const user = {
      username: username.trim(),
      password: password,
    };

    dispatch(loginUser(user, handleSuccess));
  };

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal">
          Post it!
        </Menu>
      </Header>
      <Content>
        <div
          style={{
            padding: 100,
            minHeight: 100,
          }}
        >
          <Form
            name="nest-messages"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="Username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
