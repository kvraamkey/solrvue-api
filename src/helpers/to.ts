export const to = (promise: any) => {
    return promise.then((data: any) => [undefined, data?.data|| data ]).catch((err: any) => [err?.message || err]);
};