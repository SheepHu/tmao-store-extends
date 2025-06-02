import { Button, Card, Form, Input } from "antd";
import React from "react";

const Popup: React.FC = () => {
  const [form] = Form.useForm();
  return (
    <Card
      variant="borderless"
      style={{
        width: 300,
        height: 300,
      }}
    >
      <Form
        form={form}
        initialValues={{ keywords: "鞋子" }}
        onFinish={(values) => {
          chrome.runtime.sendMessage({
            type: "search_handle",
            data: values,
          });
        }}
      >
        <Form.Item label="关键词" name="keywords">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" onClick={() => {}}>
            查询
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default Popup;
