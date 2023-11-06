import { deleteCategory } from "@/app/service/service";
import { logRequest } from "@/app/utils/middleware";
import { RequestContext } from "@/types";
import { createEdgeRouter } from "next-connect";
import type { NextRequest } from "next/server";

const router = createEdgeRouter<NextRequest, RequestContext>();

router.use(logRequest);

router.delete((_, { params: { id } }) => deleteCategory(id));

export async function DELETE(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
