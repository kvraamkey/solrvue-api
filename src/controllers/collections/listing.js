/**
 * list of collections
 *
 * @controller sample
 * @action action
 *
 * [successResponse description]
 *
 * @param {String} message [message description]
 * @param {Array or JSON} data [data description]
 *
*/

import { to, successResponse, validationError } from "../../helpers";


export default async (client, { postData }) => {
    
    const [isErr, resp] = await to(client.get(`admin/collections`, {
        searchParams: { action: 'CLUSTERSTATUS' }
    }).json());

    if (isErr) return validationError(isErr);
    const collections = postData?.collection ? resp.cluster.collections[postData?.collection] : Object.keys(resp.cluster.collections);
    return successResponse("success response", collections);

};