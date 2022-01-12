const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const router = require('express').Router();
const JWT_SECRETE = "nareshbhai";
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');


// Route 1 Create a User using : POST "/api/auth/createuser". Dosent require Auth
router.post('/createuser', [
    body('name', "Enter a Minimum 3 character").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body("password", "Enter a Minimum 5 character").isLength({ min: 5 }),
], async (req, res) => {
    // Route 1 If ther are errors return bad request and err
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Route 1 express validator error detection we not used that 
        return res.status(400).json({ errors: errors.array() });
    }

    // Route 1 Check whether the email exists already

    try {
        // Route 1 finding a user
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email alredy exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Route 1 creating a user 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: { id: user.id }
        }

        const authToken = jwt.sign(data, JWT_SECRETE);
        console.log(authToken);


        // Route 1 sending user
        res.json(user)
    } catch (error) {
        // Route 1 catching errors
        console.log(error);
        res.status(500).send("server is under maintainencs")
    }
})

// Route 2 Authinticate a user with jason web token No login required
router.post("/login", [
    body('email', "Enter a valid email").isEmail(),
    body("password", "Enter password").exists(),
], async (req, res) => {
    // Route 2 If ther are errors return bad request and err
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Route 2 express validator error detection we not used that 
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ error: "please try to login with coorect credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            res.status(400).json({ error: "please try to login with coorect credentials" })
        }
        const data = {
            user: { id: user.id }
        }

        const authToken = jwt.sign(data, JWT_SECRETE);
        console.log(authToken);
        res.json({ authToken })
    } catch (error) {
        // Route 2 catching errors
        console.log(error);
        res.status(500).send("server is under maintainencs")
    }

})


// Route 3 : Get logged in  User Details using : post "/api/auth/getuser".Login required

router.post("/getuser",fetchuser ,  async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        console.log(user);
        res.send(user);
    } catch (error) {
        // Route 3 catching errors
        console.log(error);
        res.status(500).send("server is under maintainencs")
    }
})

module.exports = router;