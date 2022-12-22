import React, { useState } from "react";

import { Form, Input, Button } from "antd";

const { TextArea } = Input;

const Post: React.FC = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled);
  };

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="Title">
          <Input />
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea rows={10} />
        </Form.Item>

        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Post;
