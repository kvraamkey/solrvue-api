import { soxa } from "../../deps.ts";
import { to, response } from "../../helpers.ts";

export default async (postData: any) => {
    const request = soxa.get("admin/collections", { params: { action: "CLUSTERSTATUS" } });
    let [isErr, resp] = await to(request);
    if (isErr) return response(isErr);
    const collections = postData?.collection ? resp.cluster.collections[postData?.collection] : Object.keys(resp.cluster.collections);
    return response("collection listed", collections);
};
