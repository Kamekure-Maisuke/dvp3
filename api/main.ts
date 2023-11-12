import { Context, Hono } from "https://deno.land/x/hono/mod.ts";
import { cors } from "https://deno.land/x/hono/middleware/cors/index.ts";
import data from "./data.json" assert { type: "json" };

const app = new Hono();

app.use("/nogi/*", cors());

app
  .get("/nogi/members", (c: Context) => {
    return c.json({
      count: data.length,
      members: data,
    });
  })
  .get("nogi/members/:id", (c: Context) => {
    const id = c.req.param("id");
    const res = data.find((item) => item.id === Number(id));
    return res ? c.json(res) : c.json({ error: "no find data" }, 404);
  });

Deno.serve(app.fetch);
