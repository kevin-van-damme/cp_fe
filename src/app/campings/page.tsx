import Link from "next/link";
import Image from "next/image";
import type { Camping } from "@/typesCamping";
import AllCampingsMap from "@/components/maps/AllCampingsMap";
import MinMaxSlider from "@/components/minmaxslider/MinMaxSlider";

const page = async () => {
  const campingsData: Camping[] = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/campings`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return (
    <div className="max-w-7xl mx-auto">
      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center mb-4 lg:mb-10 md:mb-10">
        <AllCampingsMap campings={campingsData} />
      </div>
      <div className="rounded-xl bg-[#53697f] p-4">
        <form action="" noValidate>
          <div className="flex gap-4">
            <div>
              <label htmlFor="category" className="block mb-1 font-medium text-white">
                Category
              </label>
              {campingsData.length > 0 ? (
                <select name="category" id="category" className="bg-white rounded-md px-4 py-2 border border-gray-300">
                  <option value="all">All</option>
                  {[...new Set(campingsData.map((camping: Camping) => camping.field_camping_tags[0].name))].map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              ) : (
                <select name="category" id="category" className="bg-white rounded-md px-4 py-2 border border-gray-300">
                  <option value="all">All</option>
                </select>
              )}
            </div>
            <div>
              <label htmlFor="location" className="block mb-1 font-medium text-white">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter a location"
                className="w-100 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
              />
            </div>
            <div>
              <label htmlFor="price" className="block mb-1 font-medium text-white">
                Price
              </label>
              <div>
                <MinMaxSlider />
              </div>
            </div>
          </div>
          <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:cursor-pointer mt-4">Search </button>
        </form>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-6 mt-10">Campings</h1>
      <div>
        <ul className="grid [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))] gap-10 px-2 justify-center" id="campings">
          {campingsData.length > 0 ? (
            campingsData.map((camping: Camping) => (
              <li key={camping.id}>
                <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}campings/${camping.id}`}>
                  <div className="flex flex-col w-full h-full bg-[#1a2b3c] rounded-2xl shadow-xl overflow-hidden text-white">
                    <div className="relative w-full aspect-[4/3]">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${camping.field_camping_image.uri.url}`}
                        alt=""
                        fill
                        sizes="100%"
                        className="w-auto h-auto object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 flex items-center justify-center p-4">
                      <p className="font-bold text-xl text-center">{camping.title}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <p>No Campings Found</p>
          )}
        </ul>
      </div>
    </div>
  );
};
export default page;
