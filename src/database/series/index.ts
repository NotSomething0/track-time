import type { Tables } from "../../types/supabase";

export type Series = Tables<"series">;
export type SeriesList = Series[];

export { default as addSeries } from "./addSeries";
export { default as getSeriesById } from "./getSeriesById";
export { getAllSeries } from "./getAllSeries";
export { default as updateSeries } from "./updateSeries";
export { default as deleteSeriesById } from "./deleteSeriesById";
export { default as getSeriesOptions } from "./getSeriesOptions";
