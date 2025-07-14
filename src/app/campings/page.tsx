import Link from "next/link";
import Image from "next/image";
import type { Camping } from "@/typesCamping";
import { getAllCampings } from "@/queries";

const page = async () => {
  const campingsData: Camping[] = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/campings`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <ul className="grid [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))] gap-10 px-2 justify-center" id="campings">
          {campingsData.length > 0 ? (
            campingsData.map((camping: Camping) => (
              <li key={camping.id}>
                <Link href="">
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
