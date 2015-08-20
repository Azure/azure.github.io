#= require vendor/jquery.js
#= require vendor/bootstrap.js

!(($) ->
  $ ->
    $window = $(window)
    # Disable certain links in docs
    $('section [href^=#]').click (e) ->
      e.preventDefault()
      return
    return
  return
)(window.jQuery)