import type { Camping } from "@/typesCamping";
import MinMaxSlider from "@/components/minmaxslider/MinMaxSlider";
const AllCampingsFilter = async () => {
  const campingsData: Camping[] = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/campings`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());
  return (
    <div className="rounded-xl bg-[#53697f] p-4 w-2/3 mx-auto">
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
        <button type="submit" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:cursor-pointer mt-4 w-full">
          Search
        </button>
      </form>
    </div>
  );
};
export default AllCampingsFilter;
