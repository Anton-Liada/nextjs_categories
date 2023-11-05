import {
  deleteCategory,
  findOneCategory,
  getCategories,
  updateCategory,
} from "@/app/service/service";
import { logRequest } from "@/app/utils/middleware";
import { RequestContext } from "@/types";
import { createEdgeRouter } from "next-connect";
import type { NextRequest } from "next/server";

const router = createEdgeRouter<NextRequest, RequestContext>();

router.use(logRequest);

router.get((_, { params: { id } }) => findOneCategory(id));

router.put(async (req, { params: { id } }) => await updateCategory(req, id));

router.delete((_, { params: { id } }) => deleteCategory(id));

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}

export async function DELETE(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
