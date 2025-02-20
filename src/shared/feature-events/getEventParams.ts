import { dateToISODateTimeString } from "@/shared/lib/utils";
import dayjs from "dayjs";
import { GetEventsParams } from "@/shared/lib/dataAccess/search/generated/model";

export const getEventParams = (): GetEventsParams => {
  const dateFrom = dateToISODateTimeString();
  const dateTo = dateToISODateTimeString(dayjs().add(90, "days").toDate());

  return {
    embed: true,
    audienceType: "*",
    uitpas: true,
    dateFrom: dateFrom,
    dateTo: dateTo,
    availableFrom: "*",
    availableTo: "*",
    // @ts-expect-error Orval didn't include sort in generated types
    sort: { availableTo: "asc" },
  };
};
