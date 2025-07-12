import CampingCard from "@/components/allcampingspage/CampingCard";

const page = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div>
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
