const { errors } = require("./errors");

//common error handler function
function handleErr(type, err, arr) {
  return arr.push({
    errorCode: errors[type][err].code, 
    message: errors[type][err].msg
  })

}

module.exports = {
  handleErr
};
