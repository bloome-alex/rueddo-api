import webpush from 'web-push'
require('dotenv').config()

const PUBLIC_VAPID_KEY = process.env.PUSHWEB_PUBLIC_VAPID_KEY
const PRIVATE_VAPID_KEY = process.env.PUSHWEB_PRIVATE_VAPID_KEY

webpush.setVapidDetails('mailto:test@test.com', 
PUBLIC_VAPID_KEY, 
PRIVATE_VAPID_KEY)

module.exports = webpush