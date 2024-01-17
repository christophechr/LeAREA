# Add a service to the project

## 1. Create the service

Folder to modify:
- [Back-end folder](../../area-node/)

### 1.1. Create the triggers

- Create a new file in the folder [triggers](../../area-node/triggers/)

- Name the file with the name of the service (ServiceNameTrigger.trigger.js)

- Add the following code to the file: (replace the name of the service)

```javascript
const Flow = require("../models/Flow");
const { executeAction } = require("../utils/actions.utils");

function ServiceNameTrigger(Param) {
    // Do something
}

module.exports = {
    ServiceNameTrigger
};
```

- Add the trigger to the [index.js](../../area-node/triggers/index.js) file

```javascript
const { ServiceNameTrigger } = require("./ServiceNameTrigger");

module.exports = {
    ...,
    ServiceNameTrigger
};
```

### 1.2. Create the actions

- Create a new file in the folder [actions](../../area-node/actions/)

- Name the file with the name of the service (ServiceNameAction.action.js)

- Add the following code to the file: (replace the name of the service)

```javascript
const { AreaAction } = require("../area-common/AreaAction");

const ServiceNameAction = async (param1, param2) => {
    // Do something
}

module.exports = {
    ServiceNameAction
};
```

- Add the action to the [index.js](../../area-node/actions/index.js) file

```javascript
const { ServiceNameAction } = require("./ServiceNameAction");

module.exports = {
    ...,
    ServiceNameAction
};
```

### 1.3. Create the config file

- Create a new file in the folder [config](../../area-node/config/)

- Name the file with the name of the service (service.config.js)

- Add the following code to the file: (replace the name of the service and the description)

```javascript
module.exports = [
    {
        name: "ServiceName",
        description: "Service description",
        triggers: [
            {
                name: "ServiceNameTrigger",
                description: "Trigger description",
                params: [
                    {
                        name: "Param",
                        description: "Param description",
                        type: "string"
                    }
                ]
            }
        ],
        actions: [
            {
                name: "ServiceNameAction",
                description: "Action description",
                params: [
                    {
                        name: "Param",
                        description: "Param description",
                        type: "string"
                    }
                ]
            }
        ]
    };
]
```


### 1.4. Create the controller

- Create a new file in the folder [controllers](../../area-node/controllers/)

- Name the file with the name of the service (service.controller.js)

- Add the following code to the file: (replace the name of the service)

```javascript
const serviceController = async (req, res) => {
    // Do something
}

module.exports = {
    serviceController
};
```

### 1.5. Create the route

- Create a new file in the folder [routes](../a../rea-node/routes/)

- Name the file with the name of the service (service.route.js)

- Add the following code to the file: (replace the name of the service and the controller's function)

```javascript
const serviceController = require("../controllers/service.controller");

module.exports = function (fastify, opts, done) {
    // Add a post route
    app.post("/", serviceController.function);
    // Add a get route
    app.get("/", serviceController.function);
    done();
};
```

- Add the route to the [index.js](../../area-node/routes/index.js) file

```javascript
...
const serviceRoute = require("./service.route");

module.exports = function (fastify, opts, done) {
    ...
    fastify.register(serviceRoute, { prefix: "/service" });
    ...
};
```