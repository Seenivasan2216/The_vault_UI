const log = require('../lib/log');
const { error } = require('winston');
const { pool } = require('../lib/plsql-db')
const loginController = require('../controllers/login-controller');

const loginUser = async (req, res) => {
  log.info('loginUser handler started.');
  return await loginController.loginUser(req, res)
  .then(resData => {
    log.info('loginUser handler completed.');
    res.status(200).json({
      'success' : resData.data.length > 0 ? true : false,
      'accessToken' : resData.accessToken,
      'data' : resData.data
    })
  }).catch (err => {
    res.status(500).json(
      {
        'success' : false,
        'data' : error,
      }),
      log.error('loginUser handler Exceptions',  { err })
  });
}

const getUsers = async (req, res) => {
  log.info('Getusers handler Started.');
    return await loginController.getUsers(req)
          .then(resData => {
            log.info('Getusers handler completed.');
            res.status(200).json({
              'success' : true,
              'response': resData
            })
          }).catch (err => {
            res.status(500).json(
              {
                'success' : false,
                'data' : error,
              }),
              log.error('Getusers handler Exceptions',  { err })
          });
}

const getUsersbyId = async (req, res) => {
  console.log(req.params.UserId);
  return await loginController.getUsersbyId(req.params.UserId)
        .then(resData => {
          log.info('getUsersbyId handler completed.');
          res.status(200).json({
            'success' : true,
            'response' : resData
          })
        }).catch (err => {
          res.status(500).json(
            {
              'success' : false,
              'data' : error,
            }),
            log.error('getUsersbyId handler Exceptions',  { err })
        });
}

const addUser = async (req, res) => {
  return await loginController.addUser(req, res)
  .then(resData => {
    log.info('addUser handler completed.');
    res.status(200).json({
      'success' : true,
      'response' : resData
    })
  }).catch (err => {
    res.status(500).json(
      {
        'success' : false,
        'data' : error,
      }),
      log.error('addUser handler Exceptions',  { err })
  });
}

const updateUser = async (req, res) => {
  return await loginController.updateUser(req, res)
  .then(resData => {
    log.info('updateUser handler completed.');
    res.status(200).json({
      'success' : true,
      'response' : resData
    })
  }).catch (err => {
    res.status(500).json(
      {
        'success' : false,
        'data' : error,
      }),
      log.error('updateUser handler Exceptions',  { err })
  });
}

const deleteUserbyId = async (req, res) => {
  console.log(req.params.UserId);
  return await loginController.deleteUserbyId(req.params.UserId)
        .then(resData => {
          log.info('Delete User handler completed.');
          res.status(200).json({
            'success' : true,
            'response' : resData
          })
        }).catch (err => {
          res.status(500).json(
            {
              'success' : false,
              'data' : error,
            }),
            log.error('Delete User handler Exceptions',  { err })
        });
}

module.exports = {
  loginUser,
  getUsers,
  getUsersbyId,
  addUser,
  updateUser,
  deleteUserbyId
}