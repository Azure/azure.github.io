require 'rubygems'
require 'tmpdir'

require 'bundler/setup'
require 'jekyll'

GITHUB_REPONAME = 'azure/azure.github.io'
DEFAULT_CONFIG = Jekyll.configuration({'source' => 'jekyll', 'destination' => '_site'})

desc 'Generate azure.github.io files'
task :generate do
  Jekyll::Site.new(DEFAULT_CONFIG).process
end

task serve: :generate do
  Jekyll::Commands::Serve.process(DEFAULT_CONFIG)
end

desc 'Generate and publish blog to gh-pages'
task :publish => [:generate] do
  Dir.mktmpdir do |tmp|
    cp_r '_site/.', tmp

    pwd = Dir.pwd
    Dir.chdir tmp

    system 'git init'
    system 'git add .'
    message = "Site updated at #{Time.now.utc}"
    system "git commit -m #{message.inspect}"
    system "git remote add origin git@github.com:#{GITHUB_REPONAME}.git"
    system 'git push origin master --force'

    Dir.chdir pwd
  end
end