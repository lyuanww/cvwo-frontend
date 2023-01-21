import React, { Dispatch, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Layout, Menu, Button, Input, Form } from "antd";
import { useAppSelector } from "../store/hooks";
import {
  loginSessionAsync,
  selectSession,
  selectStatus,
  Statuses,
} from "../store/session/sessionSlice";
import "../components/header.css";

const { Content, Header } = Layout;
const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(selectStatus);
  const session = useAppSelector(selectSession);

  const onFinish = () => {
    const user = {
      session: {
        username: username.trim(),
        password: password,
      },
    };
    dispatch(loginSessionAsync(user));
  };

  //displays error message if error and goes to the home page if login successful
  useEffect(() => {
    if (status === Statuses.Error) {
      alert(session.error);
    } else if (status === Statuses.UpToDate) {
      setUsername("");
      setPassword("");
      navigate("/home");
    }
  }, [navigate, session.error, status]);

  return (
    <Layout>
      <Header>
        <Menu className="title" theme="dark" mode="horizontal">
          Post it!
        </Menu>
      </Header>
      <Content>
        <div
          style={{
            padding: 200,
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
            <div>
              <Link to="/signup">Not a user? Sign up now!</Link>
            </div>
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
