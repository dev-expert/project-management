const ifOpen = require('./open-routes')
module.exports = (action, route) => {
	return (req, res, next) => {
		return next(); // temporary shortcircuit to disable IAM.
		if (ifOpen(req.originalUrl, req.method)) {
			return next()
		}
		if (req.user && req.user.ability.can(action, route)) {
			return next()
		} else {
			return res.status(403).json({
				message: `You are not authorized to ${action} on ${route}`
			})
		}
	}
}
