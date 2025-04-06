const express = require('express')
const { protect } = require('../Middleware/authorizationMiddleware')
const { sendMessage } = require('../Controllers/messageController')
const router = express.Router()

router.route('/').post(protect,sendMessage)
//router.route('/:chatId').get(protect,allMessages)

module.exports = router ;