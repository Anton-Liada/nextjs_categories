import { getCategories, saveCategories } from "@/app/service/service";
import { logRequest } from "@/app/utils/middleware";
import { createEdgeRouter } from "next-connect";
import type { NextRequest } from "next/server";

const router = createEdgeRouter<NextRequest, { params?: unknown }>();

router.use(logRequest);

router.get(() => getCategories());

router.post(async req => await saveCategories(req));

export async function GET(request: NextRequest, ctx: { params?: unknown }) {
  return router.run(request, ctx);
}

export async function POST(request: NextRequest, ctx: { params?: unknown }) {
  return router.run(request, ctx);
}
