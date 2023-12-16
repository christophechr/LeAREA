## This is a technical document for the developers

# 1st point : commit norm
You should follow the commit norm, example :

```
git commit -m "ADD/MOD/DEL <what's going on>"
```

Don't be shy and explain correctly what you did in the commit
NB : only one feature per commit

# 2nd point : branch norm
You'll have to name the branch as the JIRA ticket, example :

```
AREA-XX-<name of the ticket>
```

In this way, you'll have a branch tree following this example :

```
main
    front
        - <AREA-01-Init-react-pages>
    mobile
        - <AREA-02-Init-expo-pages>
    back
        - <AREA-03-Init-Hono-API>
```

# 3rd point : pull request
As we did in the R-Type, the main branch is protected in this project.

You must follow the pull request template, giving these information :

- What are the features of the pull request;
- Set the labels (FIX, FEATURES, etc..);
- Precise the JIRA ticket with link;

You must ask a pull request to merge to one of these branches :
- frontWeb
- frontMobile
- backEnd

At every daily meeting, we'll see if we have to pull request to main.

# 4th point : Devops
Don't forget, we must have a docker-compose for every part the project.

We'll use the github actions to build the docker images and push them to the docker hub.
bonus : we may use the github actions to deploy the project online (I'll be the host, no worry).