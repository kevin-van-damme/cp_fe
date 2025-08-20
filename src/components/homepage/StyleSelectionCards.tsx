import Image from "next/image";

const styles = [
  { title: "Chalet", image: "/campingstyles/chalet.webp" },
  { title: "Farms", image: "/campingstyles/farm.webp" },
  { title: "Glamping", image: "/campingstyles/glamping.webp" },
];
const StyleSelectionCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {styles.map((style) => (
        <div
          key={style.title}
          className="hover:cursor-pointer rounded-xl overflow-hidden shadow-md bg-white hover:scale-105 transition-transform duration-300"
        >
          <div className="relative w-full aspect-[4/3]">
            <Image src={style.image} alt={style.title} fill sizes="100%" className="rounded-t-xl object-cover" />
          </div>
          <div className="bg-slate-800 text-white text-center py-3">
            <p className="font-semibold">{style.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default StyleSelectionCards;
