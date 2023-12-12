import { Hono } from "hono";

const exemple = new Hono();

exemple.get("/", (c) => c.text("GET /exemple"));
exemple.post("/", (c) => c.text("POST /exemple"));

export default exemple;
