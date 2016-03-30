require 'rubygems'
require 'tmpdir'

require 'bundler/setup'
require 'jekyll'

GITHUB_REPONAME = 'Azure/azure.github.io.git'

def silent_interrupt
  begin
    yield
  rescue Interrupt
    # ignored
  end
end

def run(cmd, options = {})
  puts "running: #{cmd}" unless options.has_key?(:q) && options[:q]
  result = system(cmd)
  exit(1) if result == false
  result
end

desc 'Generate azure.github.io files'
task :build do
  silent_interrupt { system 'npm install && gulp build' }
end

task :serve do
  Dir.chdir('jekyll') do
    silent_interrupt { system 'jekyll serve' }
  end
end

task :test => [:build] do
  proofer = HTML::Proofer.new('./_site')
  proofer.run
  exit(1) if !proofer.failed_tests.empty?
end

desc 'Generate and publish blog to gh-pages'
task :publish => [:build] do
  Dir.mktmpdir do |tmp|
    cp_r './_site/.', tmp

    Dir.chdir tmp do
      run('git init')
      run('git config user.name "Travis CI"')
      run('git config user.email "azuresdkci@users.noreply.github.com"')
      run('git add .')
      message = "Site updated at #{Time.now.utc}"
      run("git commit -m #{message.inspect}")
      run("git push --force --quiet \"https://${GH_TOKEN}@github.com/#{GITHUB_REPONAME}\" master:master > /dev/null 2>&1", q: true)
    end
  end
end