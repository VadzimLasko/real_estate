import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Input, InputNumber } from "antd";

import { useTypedSelector } from "@/store";
import { useUpdateAdMutation, useGetOneAdQuery } from "@/api/adApiSlice.js";
import AddPhoto from "@/components/addPhoto/AddPhoto.js";
import InfoMessage from "@/components/infoMessage/InfoMessage";
import Spinner from "@/components/spinner/Spinner.js";
import { Ad, UploadFileType } from "@/types/ads";
import MapComponent from "@/components/mapComponent/MapComponent.js";

import "./editAdPage.sass";

const EditAdPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug || slug.trim() === "") {
    return <InfoMessage>Такая страница не существует!</InfoMessage>;
  }
  const { data: ad, isFetching } = useGetOneAdQuery(slug);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [form] = Form.useForm();
  const [updateAd, { isLoading: isUpdateLoading, isSuccess }] =
    useUpdateAdMutation();
  const { currentUser } = useTypedSelector((state) => state.user);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (isSuccess) {
      setSuccessUpdate(true);
      timerId = setTimeout(() => setSuccessUpdate(false), 4000);
    }
    return () => clearTimeout(timerId);
  }, [isSuccess]);

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

  const answer = (
    <span className="success-answer">Данные успешно обновлены!</span>
  );

  if (!ad) {
    return <InfoMessage>Такого объявления не существует!</InfoMessage>;
  }

  const { id, author, photos, coordinates, ...initialValues } = ad;
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
    updateAd({ id, ad: values })
      .unwrap()
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
    <div className="edit-ad">
      <div className="edit-ad__wrapper">
        <Form
          form={form}
          {...formItemLayout}
          onFinish={onFinish}
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
            <Button type="primary" disabled={isUpdateLoading} htmlType="submit">
              Сохранить изменения
            </Button>
            {successUpdate ? answer : null}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditAdPage;
