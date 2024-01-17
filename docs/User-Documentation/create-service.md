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

### 1.3. Add to config file

- Depends on if you want to add an action or a trigger, you have to edit [actions.config.js](../../area-node/src/config/actions.config.js) or [triggers.config.json](../../area-node/src/config/triggers.config.js) in the backend: `src/config/`

- Name the file with the name of the service (service.config.js)

- Add the following code to the file: (replace the name of the service and the description)

Example for adding a trigger: `/src/config/triggers.config.js`
```javascript
module.exports = [
    // ...
    {
        id: 'service_id',
        name: "Service Name",
        img: '/public/images/serviceImg.png',  // Image accessible from the backend public folder as static image. Add yours to the folder
        triggers: [
            {
                id: 'trigger_id',  // The final trigger id will be 'service_id.trigger_id'.
                name: "Trigger Name",
                description: "Trigger description",
                execEach: 1, // Each x secs, the trigger will be tested
                init: init.serviceTriggerInit.initTrigger, // (Optionnal) A function to execute before flow creation. Return true if initalized correctly. Cancel flow creation if not.
                function: triggers.serviceTriggers.trigger, // The function to call to test the trigger. Returns true if triggered, false if not
                params: [
                    {
                        id: "param_id",
                        name: "Param",
                        description: "Param description",
                        type: "string",
                        required: true
                    },
                    {
                        id: "value",
                        name: "Value",
                        type: "number",
                        required: true,
                        description: "Description.",
                    },
                    {
                        id: "operator",
                        name: "Operator",
                        type: "enum",
                        required: true,
                        description: "The operator to compare the amount.",
                        values: [
                            {
                                name: "Equal",
                                value: "equal",
                            },
                            {
                                name: "Greater than",
                                value: "greater_than",
                            },
                            {
                                name: "Less than",
                                value: "less_than",
                            },
                            {
                                name: "Greater than or equal",
                                value: "greater_than_or_equal",
                            },
                            {
                                name: "Less than or equal",
                                value: "less_than_or_equal",
                            },
                        ]
                    },
                ]
            }
        ],
    }
    // ...
]
```

Example for adding an action: `/src/conf/actions.config.js`
```js
module.exports = [
    // ...
    {
        id: "github",
        name: "GitHub",
        img: "/public/images/github.png",
        actions: [
            {
                id: "new_repo",
                name: "Create a new repository",
                function: actions.githubActions.newUserRepo, // The function to execute if the flow trigger is triggered
                loop: false, // True if the action can be repeted, false otherwise
                description:
                    "Creates a new repository for the authenticated GitHub user.",
                params: [
                    {
                        id: "name",
                        name: "Repo name",
                        type: "string",
                        required: true,
                        description: "The name of the new repository.",
                    },
                ],
            },
        ],
    },
    // ...
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