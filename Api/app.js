const fn = require('./src/functions/login-function');

// ENVIRONMENTS ******START******
process.env.STAGE = "dev";
process.env.LOG_LEVEL = "DEBUG";

// ENVIRONMENTS ******END******

const publisherEvent = {
    "body": '{"UserId":4}'
}
const app = () => {
    return new Promise( async (resolve, reject) => {
        const results = await fn.getUsersbyId(publisherEvent,"")
        resolve(results);
    });
}

app();