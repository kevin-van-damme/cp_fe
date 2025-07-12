import Image from "next/image";
const FrontPageImage = () => {
  const image = "/home_page_image.jpg";
  return (
    <div>
      <Image
        src={image}
        width={1000}
        height={125}
        alt="panoramic view of a camping trip with tents"
        className="block object-fit w-full h-125 object-cover"
      />
    </div>
  );
};
export default FrontPageImage;
