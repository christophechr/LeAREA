import { Hono } from 'hono';

import router from './api';
import initMiddlewares from './middlewares';

const app = new Hono();

initMiddlewares(app);

app.route('/', router);

export default app
