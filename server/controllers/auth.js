const bcrypt = require("bcrypt");
const users = [];

module.exports = {
  login: (req, res) => {
    const { username, password } = req.body;
    console.log("Logging In User");
    console.log(username, password);
    for (let i = 0; i < users.length; i++) {
      const existingPassword = bcrypt.compareSync(password, users[i].hashedPassword)
      if (existingPassword && username === users[i].username) {
        let secureUser = { ...users[i] };
        delete secureUser.hashedPassword;

        res.status(200).send(secureUser);
        console.log('User logged in!')
        console.log(secureUser)
        return;
      } else {
        console.log('user not found')
        res.sendStatus(400);
        return;
      }
    }
  },
  register: (req, res) => {
    const { username, email, firstName, lastName, password } = req.body
    for (let i = 0; i < users.length; i++) {
      if (username === users[i].username) {
        res.sendStatus(400)
        return;
      }
    }
    const salt = bcrypt.genSaltSync(12)
    const hashedPassword = bcrypt.hashSync(password, salt)

    let newUserObj = {
      username,
      email,
      firstName,
      lastName,
      hashedPassword,
    }

    users.push(newUserObj);

    let secureNewUserObj = { ...newUserObj };
    delete secureNewUserObj.hashedPassword;

    console.log("Registering User");
    console.log(secureNewUserObj);
    res.status(200).send(secureNewUserObj);
  },
};
