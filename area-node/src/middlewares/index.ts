import { Hono, Env } from 'hono';

const initMiddlewares = (app: Hono<Env, {}, "/">) => {

    // This is a middleware that will be executed at each request
    app.use("*", async (c, next) => {
        console.log('before');
        await next();
        console.log('after');
    });

    // This is a middleware that will be executed only at the /exemple routes
    app.use("/exemple/*", async (c, next) => {
        console.log('before exemple');
        await next();
        console.log('after exemple');
    });
}

export default initMiddlewares;
