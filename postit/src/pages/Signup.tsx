import React, { Dispatch, useState } from "react";
import { Layout, Menu, Button, Input, Form } from "antd";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { createUserAsync } from "../store/user/userSlice";

import { useAppDispatch } from "../store/hooks";
const { Content, Header } = Layout;

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /* Password match system is referenced from the antd form library https://ant.design/components/form */

  const resetState = () => {
    setUsername("");
    setPassword("");
    setPasswordConfirm("");
    setLastName("");
    setFirstName("");
    setEmail("");
    navigate("/login");
  };

  const onFinish = () => {
    const formData = {
      user: {
        username: username.trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        password: password,
      },
    };

    dispatch(createUserAsync(formData));
    resetState();
  };

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal">
          Post it!
        </Menu>
      </Header>
      <Content style={{ margin: "0 16px" }}>
        <div
          style={{
            padding: 100,
            minHeight: 500,
          }}
        >
          <Form
            name="nest-messages"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
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
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="password_confirmation"
              label="Reenter your password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item name="first_name" label="First Name">
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Item>
            <Form.Item name="last_name" label="Last Name">
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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

export default Signup;
