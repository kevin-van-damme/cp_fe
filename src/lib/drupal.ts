import { NextDrupal } from "next-drupal";

export const drupal = new NextDrupal(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string, {
  auth: {
    username: process.env.NEXT_PUBLIC_DRUPAL_USERNAME as string,
    password: process.env.NEXT_PUBLIC_DRUPAL_PASSWORD as string,
  },
});

// export const drupal = new NextDrupal(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string, {
//   auth: {
//     clientId: process.env.DRUPAL_CLIENT_ID as string,
//     clientSecret: process.env.DRUPAL_CLIENT_SECRET as string,
//     scope: "administrator",
//   },
// });
