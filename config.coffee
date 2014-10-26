exports.config =
  # See docs at https://github.com/brunch/brunch/blob/stable/docs/config.md.
  conventions:
    assets:  /^app\/assets/

  modules:
    definition: false
    wrapper: false

  paths:
    public: 'public'

  files:
    javascripts:
      defaultExtension:
        'js'
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^bower_components/
      order:
          before: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/angular/angular.js'
          ]

    stylesheets:
      joinTo:
        'stylesheets/app.css': /^app/
        'stylesheets/vendor.css': /^(vendor|bower_components)/

  # Enable or disable minifying of result js / css files.
  # minify: true
