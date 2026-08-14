import { sequence } from "astro:middleware";
import protectAdminPaths from "./admin/protectAdminPaths";
import auth from "./auth";

export const onRequest = sequence(auth, protectAdminPaths);