/**
 * [successResponse description]
 *
 * @var  {[message]}
 * @var  {[data]}
*/

interface Response {
    error: Boolean;
    message: string;
    data?: any;
}

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
