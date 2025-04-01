import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "UiTPAS Balie",
    short_name: "Balie UiTPAS",
    icons: [
      {
        src: `${process.env.BASE_PATH}/images/png/icon.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: `${process.env.BASE_PATH}/images/svg/icon.svg`,
        sizes: "512x512",
        type: "image/svg",
        purpose: "maskable",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#63c59c",
    display: "standalone",
    start_url: process.env.BASE_PATH,
  };
}
