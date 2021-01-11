
const ErrorLog = require('../models/').ErrorLog;

module.exports.errorLogging = async (req, err) => {

  let payload = {
    userId: req.user ? req.user.id : '',
    userEmail: req.user? req.user.email : '',
    route: req.originalUrl ? req.originalUrl : '',
    requestPayload: JSON.stringify(req.body),
    // requestJSON: JSON.stringify(req),
    stackTrace: {"message":JSON.stringify(err.stack)}
  };
  try {
    let result = await ErrorLog.create(payload);
    return result;
  }
  catch (error) {
    return error;
  }

};

