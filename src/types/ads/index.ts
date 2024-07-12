import { UploadFile } from "antd";

export interface CustomUploadFile extends UploadFile {
  originalFileUrl?: string;
}
export type UploadFileType = Array<CustomUploadFile>;

export interface Ad {
  id: string;
  title: string;
  address: string;
  photos: CustomUploadFile[];
  price: number;
  description: string;
  square: number;
  rooms: number;
  floor: number;
  name: string;
  phone: number;
  author: string;
  coordinates: number[];
}
export type Ads = Array<Ad>;
// photos[0].thumbUrl;
// photos[0].thumbUrl ??
