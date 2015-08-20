require 'rubygems'
require 'tmpdir'

require 'bundler/setup'
require 'jekyll'

GITHUB_REPONAME = 'azure/azure.github.io'

def silent_interrupt
  begin
    yield
  rescue Interrupt
    # ignored
  end
end

desc 'Generate azure.github.io files'
task :build do
  Dir.chdir('jekyll') do
    silent_interrupt { system 'jekyll build' }
  end
end

task :serve do
  Dir.chdir('jekyll') do
    silent_interrupt { system 'jekyll serve' }
  end
end

desc 'Generate and publish blog to gh-pages'
task :publish => [:build] do
  Dir.mktmpdir do |tmp|
    cp_r './jekyll/_site/.', tmp

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