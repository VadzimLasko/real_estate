import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, UploadFile, UploadProps } from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload/interface";

import { CustomUploadFile } from "@/types/ads";

import "./addPhoto.sass";

interface AddPhotoProps {
  onChangePhoto: (files: UploadFile[]) => void;
  initialFileList?: UploadFile[];
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const setOriginalFileUrl = async (
  array: CustomUploadFile[]
): Promise<CustomUploadFile[]> => {
  const newArr = await Promise.all(
    array.map(async (item) => {
      if (!item.originFileObj) return item;
      if (!item.originalFileUrl) {
        const base64 = await getBase64(item.originFileObj as RcFile).catch(
          (error) => {
            console.error(error);
            return "";
          }
        );
        item.originalFileUrl = base64;
      }
      return item;
    })
  );
  return newArr;
};

const AddPhoto: React.FC<AddPhotoProps> = ({
  onChangePhoto,
  initialFileList = [],
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewTitle, setPreviewTitle] = useState<string>("");
  const [fileList, setFileList] = useState<CustomUploadFile[]>(initialFileList);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: CustomUploadFile) => {
    const { url, originFileObj, name } = file;
    let { preview } = file;
    if (!url && !preview) {
      preview = await getBase64(originFileObj as RcFile);
    }
    const imageUrl = url || (preview as string);
    setPreviewImage(imageUrl);
    setPreviewTitle(
      name || (url || "").substring((url || "").lastIndexOf("/") + 1)
    );
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }: UploadChangeParam<UploadFile>) => {
    const updatedList = await setOriginalFileUrl(
      newFileList as CustomUploadFile[]
    );
    setFileList(updatedList);
    onChangePhoto(updatedList);
  };

  const uploadButton = (
    <button className="add-photo__btn" type="button">
      <PlusOutlined />
      <div className="add-photo__wrapper">Загрузить фотографии</div>
    </button>
  );
  return (
    <>
      <Upload
        listType="picture-card"
        accept="image/*"
        beforeUpload={() => false}
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
        <img alt={previewTitle} className="add-photo__img" src={previewImage} />
      </Modal>
    </>
  );
};

export default AddPhoto;
