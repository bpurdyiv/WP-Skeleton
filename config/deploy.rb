require 'mina/git'

# Basic settings:
set :domain, 'foobar.com'
set :deploy_to, '/var/www/foobar.com'
set :user, '-A foobar'
set :port, ''
set :repository, ''
set :branch, 'master'

# Manually create these paths in shared/ (eg: shared/config/database.yml) in your server.
# They will be linked in the 'deploy:link_shared_paths' step.
set :shared_paths, ['app/shared']

# This task is the environment that is loaded for most commands, such as
# `mina deploy` or `mina rake`.
task :environment do
end

# Put any custom mkdir's in here for when `mina setup` is ran.
task :setup => :environment do
  queue! %[mkdir -p "#{deploy_to}/shared/app/shared"]
end

desc "Deploys the current version to the server."
task :deploy => :environment do
  deploy do
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
  end
end
