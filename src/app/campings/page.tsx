import CampingCard from "@/components/allcampingspage/CampingCard";
import type { Camping } from "@/typesCamping";

const page = async () => {
  const campingsData: Camping = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/campings`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return (
    <div className="max-w-7xl mx-auto">
      <div>
        {/* <pre>{JSON.stringify(campingsData, null, 2)}</pre> */}
        <ul className="grid [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))] gap-10 px-2 justify-center" id="campings">
          <CampingCard />
          <CampingCard />
          <CampingCard />
          <CampingCard />
          <CampingCard />
          <CampingCard />
          <CampingCard />
          <CampingCard />
          <CampingCard />
        </ul>
      </div>
    </div>
  );
};
export default page;
