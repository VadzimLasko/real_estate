import { getItem, setItem, deleteItem } from "@/helpers/persistanceStorage";
import {
  isCoincidence,
  currentUserFromEmail,
  currentUserFromId,
  firstLetterBig,
} from "@/helpers/utils";
import { baseUrl, hashCount } from "@/helpers/vars";

export {
  getItem,
  setItem,
  deleteItem,
  isCoincidence,
  currentUserFromEmail,
  currentUserFromId,
  firstLetterBig,
  baseUrl,
  hashCount,
};
