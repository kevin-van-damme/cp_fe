import { NextDrupal } from "next-drupal";
import type { Camping } from "./typesCamping";

export const getAllCampings = async (): Promise<Camping> => {
  try {
    const drupal = new NextDrupal(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string);
    const campings = await drupal.getResourceCollection<Camping>("node--camping");
    return campings;
  } catch (error) {
    console.error("Error fetching campings:", error);
    throw error;
  }
};
export const getCampingById = async (id: string) => {
  try {
    const drupal = new NextDrupal(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string);
    const camping = await drupal.getResource("node--camping", id);
    return camping;
  } catch (error) {
    console.error("Error fetching camping:", error);
    throw error;
  }
};
