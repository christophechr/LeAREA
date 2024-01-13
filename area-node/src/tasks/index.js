const cron = require("node-cron");

const { flowTask } = require("./flows.task.js");

cron.schedule("* * * * *", flowTask);
