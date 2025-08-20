import Image from "next/image";

const locations = [
  { title: "Brugge", image: "/popularlocations/brugge.jpg" },
  { title: "Durbuy", image: "/popularlocations/durbuy.jpg" },
  { title: "Namur", image: "/popularlocations/namur.jpg" },
];

const PopularSelectionCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {locations.map((loc) => (
        <div
          key={loc.title}
          className="hover:cursor-pointer rounded-xl overflow-hidden shadow-md bg-white hover:scale-105 transition-transform duration-300"
        >
          <div className="relative w-full aspect-[4/3]">
            <Image src={loc.image} alt={loc.title} fill sizes="100%" className="rounded-t-xl object-cover" />
          </div>
          <div className="bg-slate-800 text-white text-center py-3">
            <p className="font-semibold">{loc.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PopularSelectionCards;
