import type { Camping } from "./typesCamping";
import { DrupalNode, NextDrupal } from "next-drupal";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { drupal } from "./lib/drupal";

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
export const getCampingById = async ({ id }: { id: string }) => {
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
  try {
    const camping = await drupal.getResource<DrupalNode>("node--camping", `${id}`, {
      params: params,
      withAuth: {
        username: process.env.NEXT_PUBLIC_DRUPAL_USERNAME as string,
        password: process.env.NEXT_PUBLIC_DRUPAL_PASSWORD as string,
      },
    });
    return camping;
  } catch (error) {
    console.error("Error fetching camping:", error);
    throw error;
  }
};
