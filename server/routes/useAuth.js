const { register, login } = require("../controllers/authController");
const { setAvatar, getAllUsers } = require("../controllers/usersControllers");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allUsers/:id", getAllUsers);

module.exports = router;
