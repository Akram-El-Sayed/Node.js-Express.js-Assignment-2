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

function createUser(request, response, next) {
  const { email, password } = request.body;

  let user = Users.find((item) => item.email == email);

  if (user) {
    const error = new Error("Email Already Exist!");
    return next(error);
  }

  user = { id: Users.length + 1, email, password };
  
  Users.push(user);

  response.send({ message: "User Create", data: user });
}

function updateUser(request, response,next) {
const id = request.params.id;
  
  const User = Users.find((item) => item.id == id);
  
  if (!User) {
    const error = new Error("User Not Found!");
    return next(error);
  }

  const { email, password } = request.body;

  User.email = email ?? User.email
  User.password = password ?? User.password
   response.send({ message: "User Updated", data: User });
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