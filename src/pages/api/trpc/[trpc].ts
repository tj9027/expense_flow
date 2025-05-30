import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@/server/api";
import { createContext } from "@/server/api/trpc";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});