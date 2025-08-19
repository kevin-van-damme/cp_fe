"use client";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const MinMaxSlider = () => {
  return (
    <div className="w-50">
      <Slider range step={1} defaultValue={[0, 100]} min={0} max={100} />
    </div>
  );
};
export default MinMaxSlider;
