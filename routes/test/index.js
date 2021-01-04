const router = require("express").Router();
const testController = require("../../controllers/testController");

// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send('Path is only avaialable to Authenticated Users!');
    }
}

// Middleware to log the current req.user
function logData(req, res, next) {
    console.log(req.user);
    console.log(req.session)
    next();
}

router.get("/user", isUserAuthenticated, testController.testMsg);
router.get("/*", logData, testController.testMsg);

module.exports = router;
