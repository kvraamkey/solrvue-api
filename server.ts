import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import Router from "./src/routes/index.ts";

const app = new Application();
const port = 8080;

app.use(oakCors());

app.use(Router.prefix("/solr").routes());
app.use(Router.allowedMethods());

console.log(`Server up on http://localhost:${port}`);

await app.listen({ port });
