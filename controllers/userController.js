const { SenMail } = require("../utils/mailer");
const bcrypt = require('bcrypt');
const userSchema = require("../validators/userSchema");

let Users = []
function findAll(request, response) {
  response.send({ message: "Users List", data: Users });
}

function findOne(request, response, next) {
  const id = request.params.id;
  
  const User = Users.find((item) => item.id == id);
  
  if (!User) {
    const error = new Error("User Not Found!");
    return next(error);
  }

  response.send({ message: "User Found", data: User });
}

async function createUser(request, response, next) {
 try {
  const { error } = userSchema.validate(request.body);
    if (error) {
      error.status = 400;
      return next(error);
    }

    if (!request.file) {
      const err = new Error("Profile image is required");
      err.status = 400;
      return next(err);
    }
   const {name, email, password, age } = request.body;

  let user = Users.find((item) => item.email == email);

  if (user) {
    const error = new Error("Email Already Exist!");
    return next(error);
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const avatar = request.file.path
  user = { id: Users.length + 1,name, email, password: hashedPassword , age , avatar };
  
  Users.push(user);

  await SenMail(email , 'Welcome Welcome XD', 'Greetings')

  response.status(201).send({ message: "User Created", data: user });
 } catch (error) {
  error.status = 500;
    next(error);
 }
}

async function updateUser(request, response,next) {
try {
  const id = request.params.id;
  
  const User = Users.find((item) => item.id == id);
  
  if (!User) {
    const error = new Error("User Not Found!");
    return next(error);
  }

  const { email, password } = request.body;

  User.email = email ?? User.email
  User.password = password ?? User.password
  await SenMail(email , 'Updated', 'User_Update')
  response.send({ message: "User Updated", data: User });
  
} catch (error) {
  error.status = 400
  next(error)
}
}
function removeUser(request, response, next) {
  const id = request.params.id;

  const User = Users.findIndex((item) => item.id == id);

  if (User == -1) {
    const error = new Error("User Not Found!");
    return next(error);
  }

  Users.splice(User, 1);
  response.send({ message: "User Deleted Successfully!" });

  
}

module.exports = {
  findAll,
  findOne,
  createUser,
  updateUser,
  removeUser,
};