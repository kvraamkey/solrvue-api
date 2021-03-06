import { Router, RouterContext, soxa } from "./deps.ts";
import { to, response } from "./helpers.ts";

const router = new Router();

router.get("/", (ctx) => {
    ctx.response.body = "Hello World!";
});

router.post("/:controller?", async ({ response: res, request: req, params }: RouterContext) => {
    if (!params.controller || !req.headers.get("solr_action")) {
        res.body = response("A valid [controller] or [action] is required.");
    } else {
        try {
            const Authorization = btoa(req.headers.get("solr_username") + ":" + req.headers.get("solr_password"));
            soxa.defaults.baseURL = req.headers.get("solr_url");
            soxa.defaults.headers.common["Authorization"] = `Basic ${Authorization}`;
            const [err, module] = await to(import(`./handlers/${params.controller}/${req.headers.get("solr_action")}.ts`));
            if (err || module) response(err);
            res.body = await module.default();
        } catch (error) {
            res.body = response(error.message);
        }
    }
});

export default router;
