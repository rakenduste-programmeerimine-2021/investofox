const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {

  //fields required in the login form
  const {
    email,
    password
  } = req.body;

  try {
    //validating the login form

    //find if email exists
    const user = await User.findOne({
      email
    });

    if (!user) throw Error("User with this e-mail does not exist");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw Error("Login information is not correct");
    const userTemplate = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email,
    };

    const token = jwt.sign(userTemplate, process.env.JWT_SECRET);

    if (!token) throw Error("Something critical happened: Code-101");
    //code-101 means that token was not found

    res.status(200).json({
      token,
      ...userTemplate,
    });
  } catch (e) {
    res.status(400).json({
      error: e.message
    });
  }
}

exports.signup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password
  } = req.body;

  try {
    //check if email exists
    const user = await User.findOne({
      email
    });
    if (user) throw Error("User with that e-mail already exists");

    //salting
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something critical happened 483543875");

    //salt password from req.body
    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something critical happened 123172387");

    //usertemplate
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hash,
    });

    //save user using the newUser template
    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Error saving user");


    //If user saved successfully
    res.status(200).json({
      message: "User created successfully"
    });
  } catch (e) {
    res.status(400).json({
      error: e.message
    });
  }
}

//not sure if this works, probably not
exports.getUsers = async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const user = await User.find({
      id
    });

    if (!user) {
      console.log('Sorry, no users to display')
    }


    res.status(200).send(user).json({
      message: `User found!`
    });

  } catch (error) {
    res.status(400).json({
      error: e.message
    })
  }

}
exports.getOneUser = async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const user = await User.findOne({
      id
    });

    if (!user) {
      console.log('Sorry that user does not exist')
    }


    res.status(200).send(user).json({
      message: `User: ${user} found!`
    });

  } catch (error) {
    res.status(400).json({
      error: e.message
    })
  }

}

exports.deleteUser = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    const deleteUser = await User.findOneAndDelete({
      _id: id
    })

    if (!deleteUser) res.status(404).send("No user with that id found")

    res.status(200).send(`Successfully deleted the following user: \n ${deleteUser}`)
  } catch (e) {
    res.status(400).json({
      error: e.message
    })
  }

}