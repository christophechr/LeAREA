db.createUser({
    user: "area-backend",
    pwd: "mypassword",
    roles: [{
        role: "readWrite",
        db: "area"
    }]
});
