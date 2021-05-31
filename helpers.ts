
/**
 * [successResponse description]
 *
 * @var  {[message]}
 * @var  {[data]}
*/

export const response = (message: string, data?: any) => {
    let response: Response = {
        error: data ? false : true,
        message,
    };
    if (data) {
        response.data = data;
    }
    return response;
};

export const to = (promise: any) => {
    return promise.then((data: any) => [undefined, data?.data || data]).catch((err: any) => [err?.message || err]);
};

/**
 * types
 */

interface Response {
    error: Boolean;
    message: string;
    data?: any;
}
