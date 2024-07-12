import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, UploadFile, UploadProps } from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload/interface";

import "./addPhoto.sass";
import { CustomUploadFile } from "@/types/ads";

// interface UploadRequestOption {
//   onProgress: (event: { percent: number }) => void;
//   onError: (event: Error, body?: object) => void;
//   onSuccess: (body: object) => void;
//   data: object;
//   filename: string;
//   file: UploadFile;
//   withCredentials: boolean;
//   action: string;
//   headers: object;
// }

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
    const { url, preview, originFileObj, name } = file;
    if (!url && !preview) {
      file.preview = await getBase64(originFileObj as RcFile);
    }
    setPreviewImage(url || (preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      name || (url || "").substring((url || "").lastIndexOf("/") + 1)
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emptyCustomRequest = (options: any) => {
    const { onSuccess, file } = options;
    setTimeout(() => {
      if (onSuccess) {
        onSuccess("ok", file);
      }
    }, 0);
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }: UploadChangeParam<UploadFile>) => {
    const updatedList = await setOriginalFileUrl(
      newFileList as CustomUploadFile[]
    );
    setFileList(updatedList);
    console.log("New photos", updatedList);
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
  );
};

export default AddPhoto;

// import { useState } from "react";
// import { PlusOutlined } from "@ant-design/icons";
// import { Modal, Upload, UploadFile, UploadProps } from "antd";
// import {
//   RcFile,
//   UploadChangeParam,
//   UploadRequestOption,
// } from "antd/lib/upload/interface";

// import "./addPhoto.sass";

// interface CustomUploadFile extends UploadFile {
//   originalFileUrl?: string;
// }

// interface AddPhotoProps {
//   onChangePhoto: (files: UploadFile[]) => void;
//   initialFileList?: UploadFile[];
// }

// const getBase64 = (file: RcFile): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });

// const setOriginalFileUrl = async (
//   array: CustomUploadFile[]
// ): Promise<CustomUploadFile[]> => {
//   const newArr = await Promise.all(
//     array.map(async (item) => {
//       if (!item.originFileObj) return item;
//       if (!item.originalFileUrl) {
//         const base64 = await getBase64(item.originFileObj as RcFile).catch(
//           (error) => {
//             console.error(error);
//             return "";
//           }
//         );
//         item.originalFileUrl = base64;
//       }
//       return item;
//     })
//   );
//   return newArr;
// };

// const AddPhoto: React.FC<AddPhotoProps> = ({
//   onChangePhoto,
//   initialFileList = [],
// }) => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState<string>("");
//   const [previewTitle, setPreviewTitle] = useState<string>("");
//   const [fileList, setFileList] = useState<CustomUploadFile[]>(
//     initialFileList as CustomUploadFile[]
//   );

//   const handleCancel = () => setPreviewOpen(false);

//   const handlePreview = async (file: CustomUploadFile) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj as RcFile);
//     }
//     setPreviewImage(file.url || (file.preview as string));
//     setPreviewOpen(true);
//     setPreviewTitle(
//       file.name ||
//         (file.url || "").substring((file.url || "").lastIndexOf("/") + 1)
//     );
//   };

//   const emptyCustomRequest = ({ onSuccess, file }: UploadRequestOption) => {
//     setTimeout(() => {
//       if (onSuccess) {
//         onSuccess("ok", file as UploadFile);
//       }
//     }, 1000);
//   };

//   const handleChange: UploadProps["onChange"] = async ({
//     fileList: newFileList,
//   }: UploadChangeParam<UploadFile>) => {
//     const updatedList = await setOriginalFileUrl(
//       newFileList as CustomUploadFile[]
//     );
//     setFileList(updatedList);
//     console.log("New photos", updatedList);
//     onChangePhoto(updatedList);
//   };

//   const uploadButton = (
//     <button
//       style={{
//         border: 0,
//         background: "none",
//       }}
//       type="button"
//     >
//       <PlusOutlined />
//       <div
//         style={{
//           marginTop: 8,
//         }}
//       >
//         Загрузить фотографии
//       </div>
//     </button>
//   );

//   return (
//     <>
//       <Upload
//         customRequest={emptyCustomRequest}
//         listType="picture-card"
//         accept="image/*"
//         multiple
//         maxCount={8}
//         fileList={fileList}
//         onPreview={handlePreview}
//         onChange={handleChange}
//       >
//         {fileList.length >= 8 ? null : uploadButton}
//       </Upload>
//       <Modal
//         open={previewOpen}
//         title={previewTitle}
//         footer={null}
//         onCancel={handleCancel}
//       >
//         <img
//           alt="example"
//           style={{
//             width: "100%",
//           }}
//           src={previewImage}
//         />
//       </Modal>
//     </>
//   );
// };

// export default AddPhoto;
