import { sequence } from "astro:middleware";
import protectAdminPaths from "./admin/protectAdminPaths";

export const onRequest = sequence(protectAdminPaths);