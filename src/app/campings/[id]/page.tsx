import Image from "next/image";
import type { Camping } from "@/typesCamping";
import CampingDetailMap from "@/components/maps/CampingDetailMap";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/campings/${id}`, {
    next: { revalidate: 60 },
  });
  const campingDetailData: Camping = await response.json();
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-6 shadow-md">
        <Image
          src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${campingDetailData.field_camping_image.uri.url}`}
          alt={"Image camping"}
          fill
          sizes="100%"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{campingDetailData.title}</h1>
        <p className="text-lg text-gray-600 flex items-center">
          📍 {campingDetailData.field_camping_location.name}, {campingDetailData.field_camping_country.name}
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">Description</h2>
        <div
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: campingDetailData.field_camping_description || "No description available.",
          }}
        />
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">Tags</h2>
        <ul className="flex flex-wrap gap-2">
          {campingDetailData.field_camping_tags && campingDetailData.field_camping_tags.length > 0 ? (
            campingDetailData.field_camping_tags.map((tag) => (
              <li key={tag.id}>
                <a
                  href={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${tag.links.self.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {tag.name}
                </a>
              </li>
            ))
          ) : (
            <li>No tags available.</li>
          )}
        </ul>
      </div>
      <div className="my-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-1">Owner</h3>
        <p className="text-blue-700">{campingDetailData.field_camping_owner.title || "Unknown"}</p>
        <a href={`mailto:${campingDetailData.field_camping_owner.field_owner_email}`} className="text-blue-700">
          {campingDetailData.field_camping_owner.field_owner_email}
        </a>
      </div>
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="p-4 bg-gray-100 rounded-lg shadow-sm flex-1">
          <h3 className="font-semibold text-gray-600 mb-1">Check-in/out</h3>
          <p className="text-gray-800">{campingDetailData.field_checkin_checkout || "N/A"}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-sm flex-1">
          <h3 className="font-semibold text-gray-600 mb-1">Price per night</h3>
          <p className="text-gray-800">{campingDetailData.field_camping_price ? `€${campingDetailData.field_camping_price}` : "N/A"}</p>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">Camping Rules</h2>
        <div
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: "No rules specified.",
          }}
        />
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">Location</h2>
        <div className="w-full h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
          <CampingDetailMap camping={campingDetailData} />
        </div>
      </div>
    </div>
  );
};
export default page;

export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/campings`, {
    next: { revalidate: 60 },
  });
  const campings: Camping[] = await response.json();
  return campings.map((camping) => ({
    id: camping.id.toString(),
  }));
}
