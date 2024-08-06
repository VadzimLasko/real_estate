import { FC } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { Button, Form, Input, InputNumber } from "antd";

import { useTypedSelector } from "@/store";
import { useGetUsersQuery } from "@/api/authApiSlice.js";
import { useCreateAdMutation } from "@/api/adApiSlice.js";
import AddPhoto from "@/components/addPhoto/AddPhoto.js";
import Spinner from "@/components/spinner/Spinner.js";
import InfoMessage from "@/components/infoMessage/InfoMessage";
import MapComponent from "@/components/mapComponent/MapComponent.js";
import { Ad, UploadFileType } from "@/types/ads";

import "./createAdPage.sass";

const CreateAdPage: FC = () => {
  const { isFetching } = useGetUsersQuery();
  const [createAd] = useCreateAdMutation();
  const { currentUser } = useTypedSelector((state) => state.user);
  //TODO поправь загрузку фото, а то не отображается загрузка
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

  const validateMessages = {
    required: "Необходимо заполнить!",
  };

  let photos: UploadFileType = [];
  let coordinates: number[] = [];

  const [form] = Form.useForm();

  const onChangePhoto = (files: UploadFileType): void => {
    photos = files;
  };

  const onChangeCoordinates = (coords: number[]): void => {
    coordinates = coords;
  };

  const onFinish = (values: Ad): void => {
    console.log("values", values);
    values.id = nanoid();
    values.author = currentUser!.id;
    values.photos = photos;
    values.phone = Number("375".concat(`${values.phone}`));
    values.coordinates = coordinates;

    createAd(values)
      .unwrap()
      .then((response) => {
        if (response) {
          console.log("New ad", values);
          form.resetFields();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  if (isFetching) {
    return <Spinner />;
  }
  if (!currentUser) {
    return <InfoMessage>Вам нужно авторизоваться</InfoMessage>;
  }

  return (
    <div className="add-ad-form">
      <div className="add-ad-form__wrapper">
        <Form
          form={form}
          {...formItemLayout}
          onFinish={onFinish}
          scrollToFirstError
          layout="vertical"
          validateMessages={validateMessages}
          variant="filled"
          name="CreateAd"
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
            <Input maxLength={100} />
          </Form.Item>

          <Form.Item
            label="Адрес"
            name="address"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input showCount maxLength={50} />
          </Form.Item>

          <Form.Item
            name="photos"
            tooltip="Не более 8 фотографий"
            label="Фотографии"
          >
            <AddPhoto onChangePhoto={onChangePhoto} />
          </Form.Item>

          <Form.Item
            label="Стоимость"
            name="price"
            rules={[{ required: true }]}
          >
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
            tooltip="Положительное число от 1 до 1000"
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
            tooltip="Положительное число от 1 до 10"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} max={10} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Этаж"
            tooltip="Положительное число от 1 до 30"
            name="floor"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} max={30} style={{ width: "100%" }} />
          </Form.Item>

          <div className="map">
            <MapComponent onChangeCoordinates={onChangeCoordinates} />
          </div>

          <Form.Item
            name="name"
            label="Ваше имя"
            tooltip="Как Вас называть в объявлении?"
            rules={[
              {
                required: true,
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Номер телефона"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              addonBefore="+375"
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 9 }}>
            <Button type="primary" htmlType="submit">
              Добавить объявление
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateAdPage;
