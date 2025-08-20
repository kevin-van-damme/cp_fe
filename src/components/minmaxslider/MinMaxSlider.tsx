"use client";
import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import type { SliderProps } from "rc-slider";

const MinMaxSlider: React.FC = () => {
  const [values, setValues] = useState<[number, number]>([14, 44]);
  const handleSliderChange: SliderProps["onChange"] = (newValues) => {
    if (Array.isArray(newValues)) {
      setValues(newValues as [number, number]);
    }
  };
  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setValues([14, values[1]]);
      return;
    }
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= values[1]) {
      setValues([numValue, values[1]]);
    }
  };
  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setValues([values[0], 44]);
      return;
    }
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= values[0] && numValue <= 100) {
      setValues([values[0], numValue]);
    }
  };
  return (
    <div className="w-50 flex flex-col gap-2">
      <Slider range step={1} min={14} max={44} value={values} onChange={handleSliderChange} />
      <div className="gap-2 flex">
        <input
          type="text"
          id="minPrice"
          name="minPrice"
          value={values[0]}
          onChange={handleMinInputChange}
          className="w-full border border-gray-300 rounded-md px-2 py-1 bg-white"
        />
        <input
          type="text"
          id="maxPrice"
          name="maxPrice"
          value={values[1]}
          onChange={handleMaxInputChange}
          className="w-full border border-gray-300 rounded-md px-2 py-1 bg-white"
        />
      </div>
    </div>
  );
};
export default MinMaxSlider;
