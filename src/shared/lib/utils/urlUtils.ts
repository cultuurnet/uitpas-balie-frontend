import { PublicRuntimeConfig } from "@/shared/feature-config/types";
import { getUuid } from "@/shared/lib/utils/index";

const baseUrls = {
  basePath: "",
  uitInVlaanderenUrl: "",
  uitInDatabankUrl: " ",
  legacyApiPath: "",
};

export function initUrlUtils({
  publicRuntimeConfig,
}: {
  publicRuntimeConfig: PublicRuntimeConfig;
}) {
  baseUrls.basePath = publicRuntimeConfig.basePath;
  baseUrls.uitInVlaanderenUrl = publicRuntimeConfig.uitInVlaanderenUrl;
  baseUrls.uitInDatabankUrl = publicRuntimeConfig.uitInDatabankUrl;
  baseUrls.legacyApiPath = publicRuntimeConfig.legacyApiPath;
}

export const getAssetUrl = (url: string): string => {
  return `${baseUrls.basePath ?? ""}/${url}`.replaceAll("//", "/");
};

export const getUitInVlaanderenUrl = (
  eventName: string,
  eventId: string
): string => {
  return `${baseUrls.uitInVlaanderenUrl}/agenda/e/e/${getUuid(eventId)}`;
};

export const getUitInDatabankurl = (eventId: string): string => {
  return `${baseUrls.uitInDatabankUrl}/event/${getUuid(eventId)}`;
};

export const getQrCodeUrl = (eventId: string): string => {
  return `${baseUrls.legacyApiPath}/checkincodes/${getUuid(
    eventId
  )}/qr-spaarcode.zip`;
};

/**
 *
 * @param url e.g.: "https://io-test.uitdatabank.be/event/cc603ee9-ea87-47c6-b558-5b6b7058f632"
 * @return e.g: "cc603ee9-ea87-47c6-b558-5b6b7058f632"
 */
export const getIdFromUrl = (url: string): string => {
  const parts = url.split("/");
  return parts[parts.length - 1];
};
