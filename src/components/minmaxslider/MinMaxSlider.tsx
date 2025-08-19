"use client";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const MinMaxSlider = () => {
  return (
    <div className="w-50 flex flex-col gap-2">
      <Slider range step={1} defaultValue={[0, 100]} min={0} max={100} />
      <div className="gap-2 flex">
        <input
          type="text"
          id="minimumPrice"
          name="minimumPrice"
          value="0"
          readOnly
          className="w-full border border-gray-300 rounded-md px-2 py-1 bg-white"
        />
        <input
          type="text"
          id="maximumPrice"
          name="maximumPrice"
          value="100"
          readOnly
          className="w-full border border-gray-300 rounded-md px-2 py-1 bg-white"
        />
      </div>
    </div>
  );
};
export default MinMaxSlider;
