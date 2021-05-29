import * as got from "got";
import { to, toCamelcase, validationError } from "./../helpers";

export default (app) => {
    app.post("/solr/:controller?", async (req, res) => {
        const { solr_url, solr_username, solr_password, solr_action } = req.headers;
        if (!req.params.controller || !solr_action)
            return res.status(200).json({
                error: true,
                message: "A valid [controller] or [action] is required.",
            });
        else {
            try {
                const controllerName = toCamelcase(req.params.controller);
                const action = toCamelcase(solr_action);
                const moduleSpecifier = `./../controllers/${controllerName}/${action}`;
                const [err, module] = await to(import(moduleSpecifier));
                const Authorization = Buffer.from(solr_username + ':' + solr_password).toString('base64');
                const client = got.extend({
                    prefixUrl: solr_url,
                    headers: { Authorization: `Basic ${Authorization}` }
                });

                const sendRequestData = { postData: req.body };

                if (err) {
                    return res.status(200).json(
                        validationError({
                            message: err.message,
                        })
                    );
                }
                const resp = await module.default(client, sendRequestData);
                return res.status(200).json(resp);
            } catch (error) {
                return res.status(200).json(
                    validationError({
                        errorType: error.name,
                        message: error.message,
                        stack: error.stack,
                        esError: error.meta,
                    })
                );
            }
        }
    });
}
