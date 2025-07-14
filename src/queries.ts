import type { Camping } from "./typesCamping";
import { NextDrupal } from "next-drupal";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";

export const getAllCampings = async () => {
  const drupal = new NextDrupal(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string);
  try {
    const params = new DrupalJsonApiParams()
      .addFields("node--camping", [
        "id",
        "title",
        "field_camping_image",
        "field_camping_location",
        "field_camping_owner",
        "field_camping_tags",
        "field_camping_country",
        "field_camping_description",
        "field_camping_price",
      ])
      .addInclude(["field_camping_image", "field_camping_location", "field_camping_owner", "field_camping_tags", "field_camping_country"]);
    const campings = await drupal.getResourceCollection<Camping[]>("node--camping", {
      params: params.getQueryObject(),
    });
    return campings;
  } catch (error) {
    console.error("Error fetching campings:", error);
    throw error;
  }
};
