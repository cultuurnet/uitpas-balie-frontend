import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "UiTPAS Balie",
    short_name: "Balie UiTPAS",
    icons: [
      {
        src: `${process.env.BASE_PATH}/images/png/web-app-manifest-192x192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${process.env.BASE_PATH}/images/png/web-app-manifest-512x512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: `${process.env.BASE_PATH}/images/screenshots/desktop.png`,
        sizes: "2360x1640",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: `${process.env.BASE_PATH}/images/screenshots/mobile.png`,
        sizes: "1080x2398",
        type: "image/png",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#63c59c",
    display: "standalone",
    start_url: process.env.BASE_PATH,
  };
}
