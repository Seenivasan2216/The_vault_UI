const log = require('../lib/log');
const jwt = require('../lib/jwthelper');
const { pool } = require('../lib/plsql-db');

const loginUser = async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('Select * from login ($1, $2)',[ req.body.username, req.body.password ]);
      if(result && result.rows.length > 0 ){
        const resposne =  {
          'accessToken' : jwt.generateToken(req.body),
          'data' : result.rows 
        };
        log.info('loginUser Service completed.');
        return resposne;
      }
      else
        return null;
    }
    catch (err) {
      log.error('loginUser Service Exceptions' , {err});
      return {
        message: err.message
      }
    }
  }

const getUsers = async (req) => {
    try {
        const client = await pool.connect();
        const result = await client.query("Select * from Getusers()");
        if(result)
            return {
                message: "User fetched successfully",
                data : result.rows 
            };
        else
          return {
                message : 'Failed to delete the user'
            };
    }
    catch (err) {
        log.error('getUsers Service Exceptions' , {err});
        return {
            message: err.message
          }
    }
  };

  const getUsersbyId = async (userId) => {
    try {
        const client = await pool.connect();
        const result = await client.query("Select * from getusersbyid($1)", [ userId ]);
        if(result)
            return {
                message: "User fetched successfully",
                data : result.rowCount>0 ? result.rows : '[]'
            };
        else
          return {
                message : 'Failed to delete the user'
            };
    }
    catch (err) {
        log.error('getUserbyId Service Exceptions' , {err});
        return {
            message: err.message
          }
    }
  };

  const deleteUserbyId = async (userId) => {
    try {
        const client = await pool.connect();
        const result = await client.query("call deleteuser($1)", [ userId ]);
        if(result)
            return {
                message: "User deleted successfully",
            };
        else
          return {
                message : 'Failed to delete the user'
            };
    }
    catch (err) {
        log.error('deleteUserbyId Service Exceptions' , {err});
        return {
            message: err.message
          }
      }
  };

  const addUser = async (req, res) => {
    try {
        const client = await pool.connect();
        const insertQuery = 'call adduser($1, $2, $3, $4, $5, $6)';
        const values = [ 
                          req.body.firstname,
                          req.body.lastname,
                          req.body.email,
                          req.body.username,
                          req.body.password,
                          req.body.createdby
                      ];
        const result = await client.query(insertQuery, values);
            if(result)
                return {
                    message: "User added successfully",
                };
            else
              return {
                    message : 'Failed to add the user'
                };
    }
    catch (err) {
        log.error('addUser Service Exceptions' , {err});
        return {
            message: err.message
          }     
    }
  };


  const updateUser = async (req, res) => {
    try {
        const client = await pool.connect();
        const insertQuery = 'call updateuser($1, $2, $3, $4, $5, $6, $7)';
        const values = [ 
                          req.params.UserId,
                          req.body.firstname,
                          req.body.lastname,
                          req.body.email,
                          req.body.username,
                          req.body.password,
                          req.body.createdby || ''
                      ];
    
        const result = await client.query(insertQuery, values); 
            if(result)
                return {
                    message: "User updated successfully",
                };
            else
              return {
                    message : 'Failed to Update the user'
                };
    }
    catch (err) {
        log.error('updateUser Service Exceptions' , {err});
        return {
            message: err.message
          }
      }
  };

  

  module.exports = {
    loginUser,
    getUsers,
    getUsersbyId,
    deleteUserbyId,
    addUser,
    updateUser
}