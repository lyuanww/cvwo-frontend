import React, { useState } from "react";
import { Layout, Menu, Button, Input, Form, Upload, UploadFile } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { createUserAsync } from "../store/user/userSlice";

import { useAppDispatch } from "../store/hooks";
import { RcFile, UploadProps } from "antd/es/upload";
import { addProfilePicture } from "../store/user/actionsAPI";

const { Content, Header } = Layout;

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [avatar, setAvatar] = useState<UploadFile<any>>();
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
  const handleChange: UploadProps["onChange"] = ({ file }) => {
    setAvatar(file);
  };

  const onFinish = () => {
    const picData = new FormData();

    if (!avatar) {
      alert("Please select a file!");
      return;
    }

    picData.append("user[username]", username);
    picData.append("user[avatar]", avatar as RcFile);

    const userData = {
      user: {
        username: username.trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        password: password,
        avatar: picData,
      },
    };

    const data = {
      user: userData,
      pic: picData,
    };

    dispatch(createUserAsync(data));
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
            <Form.Item
              label="Profile Picture (optional)"
              valuePropName="fileList"
            >
              <Upload
                onChange={handleChange}
                maxCount={1}
                beforeUpload={() => false}
                listType="picture-card"
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
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
