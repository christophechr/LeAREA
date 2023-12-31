# Welcome to LeAREA project!

## What is LeAREA?

LeAREA is a project that aims to create a [IFTTT](https://ifttt.com/) like services.

## How to use it?
You'll need to use the docker-compose file to run the project.
You can find it in the root of the project.
There will be 3 containers:
- The API
- The Front web
- The Front mobile


## Change the ip
Because it's not dockerized yet you need to put you local ip address to be able to use the program.
To do that, please change the IP section in your .env file in area-node and area-expo directories and also the
localStorage.setItem("ip"); in the app.js of the area-react directory.

## documentation
You can find the documentation in the `docs` folder.
To find the benchmark, you will find the file in the `docs/` folder as [Benchmark-technologies-choice.pdf](docs/Benchmark-technologies-choice.pdf).

## Contribute to the project
To contribute to the project, you can find everything needed in the [CONTRIBUTING.md](docs/CONTRIBUTE.md) file.


## Collaborators
- [Léo Maman](https://github.com/mangasteak)
- [Raphael Mercié](https://github.com/raphaelMrci)
- [Saad Berrada](https://github.com/Codrux2200)
- [Stéphane Corbière](https://github.com/STCB)
