import Link from "next/link";
import Image from "next/image";

const CampingCard = () => {
  return (
    <Link href="">
      <div className="flex flex-col w-full h-full bg-[#1a2b3c] rounded-2xl shadow-xl overflow-hidden text-white">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src="/home_page_image.jpg"
            alt=""
            fill
            sizes="100%"
            width={0}
            height={0}
            className="w-auto h-auto object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="font-bold text-xl text-center">TEST</p>
        </div>
      </div>
    </Link>
  );
};

export default CampingCard;
