import {
  Button,
  Cascader,
  //   DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
  ConfigProvider,
} from "antd";

import AddPhoto from "../formElements/AddPhoto";

// const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

export const validateMessages = {
  required: "Необходимо заполнить!",
};

export const theme = {
  token: {
    fontSize: "1.4rem",
  },
};

{
  /* <ConfigProvider form={{ validateMessages }}>
  <Form />
</ConfigProvider>; */
}

<ConfigProvider
  theme={{
    token: {
      fontSize: "1.4rem",
    },
  }}
/>;

const AddAdForm = () => (
  <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600 }}>
    <Form.Item
      label="Заголовок объявления"
      name="Заголовок объявления"
      rules={[
        {
          required: true,
          message: "Пожалуйста, введите заголовок!",
          type: "string",
          max: 30,
          min: 10,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Стоимость объекта"
      name="Стоимость объекта"
      rules={[{ required: true, prefix: "$" }]}
    >
      <InputNumber style={{ width: "100%" }} />
    </Form.Item>
    <Form.Item
      label="Описание объекта"
      name="Описание объекта"
      rules={[{ required: true, max: 1000, min: 25 }]}
    >
      <Input.TextArea />
    </Form.Item>
    ыва
    <Form.Item
      label="Площадь"
      name="Площадь"
      rules={[{ required: true, prefix: "м2", message: "Please input!" }]}
    >
      <InputNumber style={{ width: "100%" }} />
    </Form.Item>
    <Form.Item
      label="Колличество комнат"
      name="Колличество комнат"
      rules={[{ required: true, message: "Please input!" }]}
    >
      <InputNumber style={{ width: "100%" }} />
    </Form.Item>
    <Form.Item
      label="Этаж"
      name="Этаж"
      rules={[{ required: true, message: "Please input!" }]}
    >
      <InputNumber style={{ width: "100%" }} />
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default AddAdForm;
