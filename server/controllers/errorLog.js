
const ErrorLog = require('../models/errorLog').errorLog;


exports.errorLogging = async  (req, err) => {
  let payload = {
    userId: req.user.id ? req.user.id : '',
    userEmail: req.user.email ? req.user.email : '',
    route: req.originalUrl ? req.originalUrl : '',
    requestPayload: JSON.stringify(req.body),
    // requestJSON: JSON.stringify(req),
    stackTrace: JSON.stringify(err)
  };
  try {
    let result = await ErrorLog.create(payload);
    return result;
  }
  catch (error) {
    return error;
  }

};