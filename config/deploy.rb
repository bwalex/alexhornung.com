set :application, "test.alexhornung.com"
set :repository,  "output"
set :scm, :none
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`
set :deploy_via, :copy
set :copy_compression, :gzip
set :use_sudo, false
set :host, 'alexhornung.com'
set :user, 'alex'
set :group, 'www-data'
set :deploy_to, "/srv/data/webs/#{application}"

ssh_options[:port] = 22


role :web, host                          # Your HTTP server, Apache/etc
role :app, host                          # This may be the same as your `Web` server
role :db,  host, :primary => true        # This is where Rails migrations will run

# if you want to clean up old releases on each deploy uncomment this:
after "deploy:restart", "deploy:cleanup"

before 'deploy:update', 'deploy:update_nanoc'

namespace :deploy do

  [:start, :stop, :restart].each do |t|
    desc "#{t} task is a no-op with nanoc"
    task t, :roles => :app do ; end
  end
 

  desc 'Run nanoc to update site before uploading'
  task :update_nanoc do
    puts "Compile site"
    %x(rm -rf output)
    %x(bundle exec nanoc co)
  end


  task :finalize_update do
    puts "Finalize update"
  end

end
