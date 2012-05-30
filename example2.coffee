Chimera = require('./lib/main').Chimera

myUsername = "john01sample"
myPassword = "newsample"

c = new Chimera()
c.perform
  url: "http://digg.com"
  locals:
    username: myUsername
    password: myPassword
  run: (callback) ->
    setTimeout( ->
      if jQuery('a.modal-close-inline').length > 0
        jQuery('a.modal-close-inline').click()
        jQuery('#modal-login').click()
        setTimeout( ->
          jQuery('#ident').val(username)
          jQuery('#password').val(password)
          pos = jQuery('#login-button').offset()
          chimera.sendEvent("click", pos.left + 10, pos.top + 10)
        , 500)
      else
        setTimeout( ->
          callback(null, "success")
        , 1000)
    , 1000)
  callback: (err, result) ->
    console.log('capture screen shot')
    c.capture("screenshot.png")
    cookies = c.cookies()
    c.close()

    c2 = new Chimera(cookies: cookies)
    c2.perform
      url: "http://digg.com"
      run: (callback) ->
        setTimeout( ->
          callback(null, "success")
        , 1000)
      callback: (err, result) ->
        console.log('capture screen shot that shows we are logged in')
        c2.capture("screenshot_logged_in.png")
        c2.close()
