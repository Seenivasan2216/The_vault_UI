const log = require('../lib/log');
const login = require('../services/login-service');

const loginUser = async (req, res) => {
  return await login.loginUser(req);
}

const getUsers = async (req) => {
  return await login.getUsers(req);
};

const getUsersbyId = async (UserId) => {
  return await login.getUsersbyId(UserId);
};

const addUser = async (req, res) => {
  return await login.addUser(req);
}

const updateUser = async (req, res) => {
  return await login.updateUser(req);
}

const deleteUserbyId = async (UserId) => {
  return await login.deleteUserbyId(UserId);
}


module.exports = {
  loginUser,
  getUsers,
  getUsersbyId,
  deleteUserbyId,
  addUser,
  updateUser
}

