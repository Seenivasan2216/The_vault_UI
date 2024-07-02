const log = require('../lib/log');
const jwt = require('../lib/jwthelper');
const { poolPromise } = require('../lib/mssql-db');

const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const pool = await poolPromise;
    const result = await pool.request()
          .input("UserName", req.body.username)  
          .input("Password", req.body.password)      
          .execute(`SP_Login`);
    if(result && result.recordset.length > 0 ){
      const resposne =  {
        'accessToken' : jwt.generateToken(req.body),
        'data' : result.recordset 
      };
      console.log(resposne);
      return resposne;
    }
    else
      return null;
  }
  catch (err) {
    res.status(500);
    return err.message;
  }
}

const getUsers = async (req) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`SP_GetUsers`);
    if(result)
      return result.recordset;
    else
      return null;
  }
  catch (err) {
    
    return res.status(500).json({
      'success' : false,
      'data' : err
    });;
  }
};

const getUsersbyId = async (userId) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
          .input("UserId", userId)      
          .execute(`SP_GetUsers`);
    console.log(result, userId);
    if(result)
      return result.recordset;
    else
      return null;
  }
  catch (err) {
    res.status(500);
    return err.message;
  }
};

const addUpdateUser = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
          .input("UserId", req.body.UserID || null)
          .input("FirstName", req.body.FirstName)
          .input("LastName", req.body.LastName)
          .input("Email", req.body.Email)
          .input("Username", req.body.Username)
          .input("Password", req.body.Password)
          .input("ModifyBy", req.body.ModifyBy)
          .execute(`SP_Add_Update_User`);
    console.log(result);
    if(result)
      return result.recordset;
    else
      return null;
  }
  catch (err) {
    res.status(500);
    return err.message;
  }
};

const deleteUserbyId = async (userId) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
          .input("UserId", userId)      
          .execute(`SP_Delete_User`);
    console.log(result);
    if(result)
      return result.recordset;
    else
      return null;
  }
  catch (err) {
    res.status(500);
    return err.message;
  }
};

module.exports = {
  loginUser,
  getUsers,
  getUsersbyId,
  addUpdateUser,
  deleteUserbyId
}
