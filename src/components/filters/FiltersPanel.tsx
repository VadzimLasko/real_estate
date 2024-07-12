import React, { useState } from "react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import {
  Button,
  Flex,
  Segmented,
  Tag,
  Switch,
  Col,
  InputNumber,
  Row,
  Slider,
  Space,
} from "antd";
import type { FlexProps, SegmentedProps } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

import "./filtersPanel.sass";

const text = `A dog is...`;

const boxStyle: React.CSSProperties = {
  width: "100%",
  height: 120,
  borderRadius: 6,
  border: "1px solid #40a9ff",
};
/////////////////////////////////////////////////////////

interface PriceProps {
  defState?: number[];
}

const PriceAndSquare: React.FC<PriceProps> = ({ defState = [0, 100] }) => {
  const [value, setValue] = useState(defState);
  const [priceFrom, priceTo] = value;

  const onChange = (newValue: number[]) => setValue(newValue);
  const onInputChange = (index: number) => (e) => {
    const newValue = [...value];
    newValue[index] = e.target.value;
    setValue(newValue);
  };

  return (
    <>
      <Slider style={{ display: "none" }} />
      <Slider range value={value} onChange={onChange} />
      <input onInput={onInputChange(0)} value={priceFrom} />
      <input onInput={onInputChange(1)} value={priceTo} />
    </>
  );
};

//////////////////////////////////////////////////////////////////////////

const Rooms: React.FC = () => {
  const rooms = ["1", "2", "3", "4+"];
  const [selectedTags, setSelectedTags] = React.useState<string[]>(["1"]);
  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };

  return (
    <Flex gap={4} wrap align="center">
      {rooms.map<React.ReactNode>((tag) => (
        <Tag.CheckableTag
          key={tag}
          checked={selectedTags.includes(tag)}
          onChange={(checked) => handleChange(tag, checked)}
        >
          {tag}
        </Tag.CheckableTag>
      ))}
    </Flex>
  );
};

const Floor: React.FC = () => {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <>
      <span>Не первый и не последний</span> <br />
      <Switch onChange={onChange} />
    </>
  );
};

// const items: CollapseProps["items"] = [
//   {
//     key: "1",
//     label: "Стоимость, $",
//     children: <p>{text}</p>,
//   },
//   {
//     key: "2",
//     label: "Количество комнат",
//     children: <p>{text}</p>,
//   },
//   {
//     key: "3",
//     label: "Площадь",
//     children: <p>{text}</p>,
//   },
//   {
//     key: "4",
//     label: "Этаж",
//     children: <p>{text}</p>,
//   },
// ];

const itemsPrice: CollapseProps["items"] = [
  {
    key: "1",
    label: "Стоимость, $",
    children: <p>{<PriceAndSquare />}</p>,
  },
];
const itemsRooms: CollapseProps["items"] = [
  {
    key: "2",
    label: "Количество комнат",
    children: <p>{<Rooms />}</p>,
  },
];
const itemsSquare: CollapseProps["items"] = [
  {
    key: "1",
    label: "Площадь",
    children: <p>{<PriceAndSquare defState={[1, 200]} />}</p>,
  },
];
const itemsFloor: CollapseProps["items"] = [
  {
    key: "1",
    label: "Этаж",
    children: <p>{<Floor />}</p>,
  },
];

const FiltersPanel: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <div className="filters-panel">
      <div className="filters-panel__main">
        <Flex style={boxStyle} justify="space-evenly" align="flex-start">
          <Collapse
            expandIconPosition="end"
            items={itemsPrice}
            onChange={onChange}
          />
          <Collapse
            expandIconPosition="end"
            items={itemsRooms}
            onChange={onChange}
          />
          <Collapse
            expandIconPosition="end"
            items={itemsSquare}
            onChange={onChange}
          />
          <Collapse
            expandIconPosition="end"
            items={itemsFloor}
            onChange={onChange}
          />
        </Flex>
      </div>
    </div>
  );
};

export default FiltersPanel;
