import React, { useEffect, useState } from "react";
import type { CollapseProps } from "antd";
import { Collapse, Input } from "antd";
import { Flex, Tag, Switch, Slider } from "antd";
import { useDispatch } from "react-redux";

import { filterChanged } from "../../store/slices/filterSlice";

import "./filtersPanel.sass";

interface PriceProps {
  defState?: number[];
  type: "square" | "price";
}

const PriceAndSquare: React.FC<PriceProps> = ({
  defState = [0, 1_000_000],
  type,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<number[]>(defState);
  const [priceFrom, priceTo] = value;

  useEffect(() => {
    dispatch(
      filterChanged({
        key: type === "square" ? "squareRange" : "priceRange",
        value: value,
      })
    );
  }, [value, type]);

  const onChange = (newValue: number[]) => {
    setValue(newValue);
  };
  const onInputChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = [...value];
      newValue[index] = Number(e.target.value);
      setValue(newValue);
    };

  return (
    <>
      <Slider
        range
        value={value}
        min={defState[0]}
        max={defState[1]}
        onChange={onChange}
      />
      <Input onInput={onInputChange(0)} value={priceFrom} />
      <Input onInput={onInputChange(1)} value={priceTo} />
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
    children: <p>{<PriceAndSquare type="square" defState={[1, 250]} />}</p>,
  },
  {
    key: "4",
    label: "Этаж",
    children: <p>{<Floor />}</p>,
  },
];

const boxStyle: React.CSSProperties = {
  borderRadius: 6,
  border: "1px solid #40a9ff",
};

const FiltersPanel: React.FC = () => {
  return (
    <div className="filters-panel">
      <div className="filters-panel__main">
        <Flex style={boxStyle} justify="space-evenly" align="flex-start">
          {items.map((collapse) => {
            return (
              <Collapse
                key={collapse.key}
                size="small"
                expandIconPosition="end"
                items={[collapse]}
              />
            );
          })}
        </Flex>
      </div>
    </div>
  );
};

export default FiltersPanel;
