import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";

import "./addPhoto.sass";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const setOriginalFileUrl = async (array) => {
  const newArr = await Promise.all(
    array.map(async (item) => {
      if (!item.originalFileUrl) {
        item.originalFileUrl = await getBase64(item.originFileObj).catch(
          (error) => console.error(error)
        );
      }
      return item;
    })
  );
  return newArr;
};

const AddPhoto = ({ onChangePhoto }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    const { url, preview, originFileObj, name } = file;
    if (!url && !preview) {
      file.preview = await getBase64(originFileObj);
    }
    setPreviewImage(url || preview);
    setPreviewOpen(true);
    setPreviewTitle(name || url.substring(url.lastIndexOf("/") + 1));
  };

  const emptyCustomRequest = ({ onSuccess, file }) => {
    setTimeout(() => {
      onSuccess(null, file);
    }, 1000);
  };

  const handleChange = async ({ fileList: newFileList }) => {
    const updatedList = await setOriginalFileUrl(newFileList);
    setFileList(updatedList);
    console.log("New foto", updatedList);
    onChangePhoto(updatedList);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Загрузить фотографии
      </div>
    </button>
  );
  return (
    fileList,
    (
      <>
        <Upload
          customRequest={emptyCustomRequest}
          listType="picture-card"
          accept="image/*"
          multiple={true}
          maxCount={8}
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
      </>
    )
  );
};

export default AddPhoto;
