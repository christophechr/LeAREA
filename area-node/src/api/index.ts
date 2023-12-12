import { Hono } from "hono";

import exemple from "./exemple.api";

const router = new Hono();

router.get("/", (c) => c.text("Hello Hono!"));
router.route("/exemple", exemple);

export default router;
