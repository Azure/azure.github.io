require 'jekyll-assets'

# bootstrap requires minimum precision of 10, see https://github.com/twbs/bootstrap-sass/issues/409
::Sass::Script::Number.precision = [10, ::Sass::Script::Number.precision].max
