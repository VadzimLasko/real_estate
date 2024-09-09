import img from "@/img/Something-went-wrong.gif";
import "./somethingWrong.sass";

import { FC } from "react";

const SomethingWrong: FC = () => {
  return (
    <div className="something-wrong">
      <img src={img} alt="something went wrong" />
    </div>
  );
};

export default SomethingWrong;
