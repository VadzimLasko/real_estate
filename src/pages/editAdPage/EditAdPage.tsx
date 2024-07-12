import { FC } from "react";
import { useParams } from "react-router-dom";
// import { useCallback } from "react";
// import { nanoid } from "@reduxjs/toolkit";
// import { useRef, useEffect } from "react";

import { Button, Form, Input, InputNumber } from "antd";
import { useTypedSelector } from "@/store";
import { useGetUsersQuery } from "@/api/authApiSlice.js";
import { useUpdateAdMutation, useGetOneAdQuery } from "@/api/adApiSlice.js";
import AddPhoto from "@/components/addPhoto/AddPhoto.js";
import Spinner from "@/components/spinner/Spinner.js";
import { Ad, UploadFileType } from "@/types/ads";
import MapComponent from "@/components/mapComponent/MapComponent.js";
// import { isCoincidence, getItem, currentUserFromId } from "@/helpers/utils.js";

import "./editAdPage.sass";

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

const EditAdPage: FC = () => {
  //    sY7Mx29PtneaoBWAJyUZh
  useGetUsersQuery();
  const { slug } = useParams<{ slug: string }>();
  if (!slug || slug.trim() === "") {
    return (
      <div style={{ margin: "15rem auto 0", width: "25rem" }}>
        Такая страница не существует!
      </div>
    );
  }
  const { data: ad, isFetching } = useGetOneAdQuery(slug);
  const [form] = Form.useForm();
  const [updateAd] = useUpdateAdMutation();
  const { currentUser } = useTypedSelector((state) => state.user);

  if (isFetching) {
    return <Spinner />;
  }
  if (!currentUser) {
    return (
      <div style={{ margin: "15rem auto 0", width: "25rem" }}>
        Вы не можете редактировать это объявление
      </div>
    );
  }
  if (!ad) {
    return (
      <div style={{ margin: "15rem auto 0", width: "25rem" }}>
        Такого объявления не существует!
      </div>
    );
  }

  const { id, author, photos, coordinates, ...initialValues } = ad;
  console.log("ad", ad);
  let editedPhotos = photos;
  let editedCoordinates = coordinates;
  // const isEmptyObject = Object.keys(photos).length === 0;
  // const initialPhotos = isEmptyObject ? photos : [];
  // const initialCoordinates = coordinates ? coordinates : "[]";
  // console.log(initialValues);

  // const isAuthor = author === currentUser.email;

  // const initialValue = {
  //   title: "", //
  //   price: "", //
  //   description: "", //
  //   square: "", //
  //   rooms: "", //
  //   floor: "", //s
  //   name: "", //
  //   phone: "", //

  //   //photos
  // };

  // let editedPhotos: UploadFileType;
  // let editedCoordinates: number[];

  const onChangePhoto = (files: UploadFileType): void => {
    editedPhotos = files;
  };

  const onChangeCoordinates = (coords: number[]): void => {
    editedCoordinates = coords;
  };

  const onFinish = (values: Ad) => {
    values.id = id;
    values.author = author;
    values.photos = editedPhotos;

    values.coordinates = editedCoordinates;
    console.log("values", values);

    updateAd({ id, ad: values })
      .unwrap()
      .then((response) => {
        if (response) {
          console.log("New update ad", values);
          // form.resetFields();
          alert("Good");
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
    return (
      <div style={{ margin: "15rem auto 0", width: "25rem" }}>
        Вы не можете редактировать это объявление
      </div>
    );
  }

  return (
    <div className="add-ad-form__wrapper">
      <Form
        form={form}
        {...formItemLayout}
        onFinish={onFinish}
        // onFinishFailed
        initialValues={initialValues}
        scrollToFirstError
        layout="vertical"
        validateMessages={validateMessages}
        variant="filled"
        name="updateAd"
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
          <AddPhoto
            initialFileList={editedPhotos}
            onChangePhoto={onChangePhoto}
          />
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

        <MapComponent
          initialCoordinates={editedCoordinates}
          onChangeCoordinates={onChangeCoordinates}
        />

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
            addonBefore="+"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 9 }}>
          <Button type="primary" htmlType="submit">
            Сохранить изменения
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditAdPage;
