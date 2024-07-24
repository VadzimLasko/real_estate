import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { filterChanged } from "./filterSlice";

interface PriceProps {
  defState?: number[];
  type: "square" | "price";
}

const PriceAndSquare: React.FC<PriceProps> = ({
  defState = [0, 100],
  type,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<number[]>(defState);
  const [priceFrom, priceTo] = value;
  console.log("value", value);

  useEffect(() => {
    dispatch(
      filterChanged({
        key: type === "square" ? "squareRange" : "priceRange",
        value: value,
      })
    );
  }, [value, type]);

  const onChange = (newValue: number[]) => {
    console.log("newValue", newValue);
    setValue(newValue);
  };
  const onInputChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = [...value];
      newValue[index] = Number(e.target.value);
      setValue(newValue);
      console.log("newValue", newValue);
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

const Rooms: React.FC = () => {
  const dispatch = useDispatch();
  const rooms = ["1", "2", "3", "4+"];
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };

  useEffect(() => {
    dispatch(
      filterChanged({
        key: "rooms",
        value: selectedTags,
      })
    );
  }, [selectedTags]);

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
  const dispatch = useDispatch();
  const [select, setSelect] = React.useState(false);
  const onChange = (checked: boolean) => {
    setSelect(checked);
    console.log(`switch to ${checked}`);
  };

  useEffect(() => {
    dispatch(
      filterChanged({
        key: "floor",
        value: select,
      })
    );
  }, [select]);

  return (
    <>
      <span>Не первый этаж</span> <br />
      <Switch onChange={onChange} />
    </>
  );
};

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Стоимость, $",
    children: <p>{<PriceAndSquare type="price" />}</p>,
  },
  {
    key: "2",
    label: "Количество комнат",
    children: <p>{<Rooms />}</p>,
  },
  {
    key: "3",
    label: "Площадь, м2",
    children: <p>{<PriceAndSquare type="square" defState={[1, 200]} />}</p>,
  },
  {
    key: "4",
    label: "Этаж",
    children: <p>{<Floor />}</p>,
  },
];

const boxStyle: React.CSSProperties = {
  // width: "100%",
  borderRadius: 6,
  border: "1px solid #40a9ff",
};

const FiltersPanel: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <div className="filters-panel">
      <div className="filters-panel__main">
        <Flex style={boxStyle} justify="space-evenly" align="flex-start">
          {items.map((collapse) => {
            return (
              <Collapse
                key={collapse.key}
                // size="large"
                expandIconPosition="end"
                items={[collapse]}
                onChange={onChange}
              />
            );
          })}
        </Flex>
      </div>
    </div>
  );
};

export default FiltersPanel;
