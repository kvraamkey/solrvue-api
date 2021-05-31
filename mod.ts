import { Application, oakCors, parse } from "./deps.ts";
import Router from "./router.ts";

const app = new Application();
const default_port = 8080;
const { args } = Deno;
const arg_port = parse(args).port;

app.use(oakCors());

app.use(Router.prefix("/solr").routes());
app.use(Router.allowedMethods());

const port = arg_port ? Number(arg_port) : default_port;

app.addEventListener("listen", ({ hostname, port, secure }) => {
    console.log(`Listening on: ${secure ? "https://" : "http://"}${hostname ?? "localhost"}:${port}`);
});

await app.listen({ port });
