var express = require('express')
var mustache = require('mustache-express')
var parseurl = require('parseurl')
var session = require('express-session')

var app = express()

app.use(session({
  secret: 'pogues',
  resave: false,
  saveUninitialized: true
}))

// var users = [
//   {
//     name: "Chuck",
//     word: "dirtyoldtown"
//   },
//   {
//     name: "Jane",
//     word: "irishrover"
//   }
// ]

// app.post? authentication?

//app.get?

app.use(function (req, res, next) {
  var views = req.session.views

  if (!views) {
    views = req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  views[pathname] = (views[pathname] || 0) + 1

  next()
})

app.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

app.get('/bar', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})

app.listen(3000, function(){
  console.log('And the band played Waltzing Matilda')
})
