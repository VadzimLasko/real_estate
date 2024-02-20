import { Button, Form, Input, InputNumber } from "antd";

import AddPhoto from "../formElements/AddPhoto";

import "./addAdForm.sass";

const formItemLayout = {
  labelCol: {
    xs: { span: 22 },
    sm: { span: 22, push: 1 },
  },
  wrapperCol: {
    xs: { span: 22 },
    sm: { span: 22, offset: 1 },
  },
};

export const validateMessages = {
  required: "Необходимо заполнить!",
};

const initialValue = {
  title: "",
  price: "",
  description: "",
  square: "",
  rooms: "",
  floor: "",
};

// export const theme = {
//   token: {
//     fontSize: "1.4rem",
//   },
// };

{
  /* <ConfigProvider form={{ validateMessages }}>
  <Form />
</ConfigProvider>; */
}

{
  /* <ConfigProvider
  theme={{
    token: {
      fontSize: "1.4rem",
    },
  }}form={{ validateMessages }}
/>; */
}

const AddAdForm = () => {
  return (
    <div className="add-ad-form__wrapper">
      <Form
        {...formItemLayout}
        // onFinish
        // onFinishFailed
        initialValue={initialValue}
        scrollToFirstError
        layout="vertical"
        validateMessages={validateMessages}
        variant="filled"
        required="true"
        name="AddAdForm"
        // style={{
        //   maxWidth: 700,
        //   margin: "0 auto",
        //   borderRadius: "50",
        //   outlineColor: "#000000",
        // }}
      >
        <Form.Item
          label="Заголовок"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input showCount maxLength={50} />
        </Form.Item>

        <Form.Item label="Фотографии" name="photo">
          <AddPhoto />
        </Form.Item>

        <Form.Item label="Стоимость" name="price" rules={[{ required: true }]}>
          <InputNumber
            min={1}
            max={10000000}
            addonBefore="$"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          label="Описание объекта"
          name="description"
          rules={[{ required: true }]}
        >
          <Input.TextArea
            autoSize={{
              minRows: 3,
              maxRows: 10,
            }}
            showCount
            maxLength={1000}
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Площадь"
          name="square"
        >
          <InputNumber
            min={1}
            max={1000}
            addonBefore="м2"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Колличество комнат"
          name="rooms"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} max={10} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Этаж" name="floor" rules={[{ required: true }]}>
          <InputNumber min={1} max={30} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 9 }}>
          <Button type="primary" htmlType="submit">
            Добавить объявление
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddAdForm;
