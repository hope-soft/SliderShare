module.exports = {

  db: process.env.MONGODB|| 'mongodb://localhost:27017/ds',

  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

  google: {
    clientID: process.env.GOOGLE_ID || '822955004260-bmicemk7es8a18fprrj8kjlo7vbrg6kr.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'ieZkuIhtzlITdHEWlgJ1P8pj',
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
  },

  facebook: {
    clientID: process.env.FACEBOOK_ID || '1474539172760789',
    clientSecret: process.env.FACEBOOK_SECRET || '70a371deba24acc613101d00f8194fc8',
    callbackURL: '/auth/facebook/callback',
    passReqToCallback: true
  },
  sendgrid: {
    user: process.env.SENDGRID_USER || 'hslogin',
    password: process.env.SENDGRID_PASSWORD || 'hspassword00'
  },
}