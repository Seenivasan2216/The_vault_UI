const log = require('../lib/log');
const { Console } = require("winston/lib/winston/transports");
const { generateToken, verifyToken } = require('../lib/jwthelper');
const {
    loginUser,
    addUser,
    updateUser, 
    deleteUserbyId,
    getUsers,
    getUsersbyId
} = require("../functions/login-function");
const router = require("express").Router();
  

module.exports = app => {

    router.post('/login', loginUser);
    
    router.get("/getUser", async (req, res) => {
        try {
          await getUsers(req, res);
          return res;
        } catch (err) {
          console.log("Error in post a category", err);
        }
      });
    
    router.get("/getUser/:UserId", verifyToken, async (req, res) => {
        try {
          await getUsersbyId(req, res);
          return res;
        } catch (err) {
          console.log("Error in post a category", err);
        }
      });
    
    router.put("/getUser/:UserId", verifyToken, async (req, res) => {
        try {
          await updateUser(req, res);
          return res;
        } catch (err) {
          console.log("Error in put a category", err);
        }
      });

      router.post("/getUser", verifyToken, async (req, res) => {
        try {
          await addUser(req, res);
          return res;
        } catch (err) {
          console.log("Error in post a category", err);
        }
      });
    
    router.delete("/getUser/:UserId", verifyToken, async (req, res) => {
        try {
          await deleteUserbyId(req, res);
          return res;
        } catch (err) {
          console.log("Error in post a category", err);
        }
      });
      
    app.use('/api', router);

}