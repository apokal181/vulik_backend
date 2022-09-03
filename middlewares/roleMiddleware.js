const jwt = require('jsonwebtoken')
const ApiError = require("../exceptions/apiError");

module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return ApiError.UnauthorizedError('Пользователь не авторизован')
            }
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            if (decoded.role !== role) {
                next(ApiError.Forbidden('Нет доступа'))
            }
            req.user = decoded
            next()
        } catch (e) {
            res.status(401).json({message: "Не авторизован"})
        }
    }
}