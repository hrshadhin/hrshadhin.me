# [hrshadhin.me](https://hrshadhin.me) Website
It's a static website that build with [Jekyll](https://jekyllrb.com/) using [Beautiful Jekyll](https://deanattali.com/beautiful-jekyll/) theme.

# Development
## Requirements
- [Ruby](https://www.ruby-lang.org/en/downloads/) version 2.5.0 or above, including all development headers (ruby version can be checked by running `ruby -v`)
- [RubyGems](https://rubygems.org/pages/download) (which you can check by running `gem -v`)
- [GCC](https://gcc.gnu.org/install/) and [Make](https://www.gnu.org/software/make/) (in case your system doesn't have them installed, which you can check by running `gcc -v`,`g++ -v`  and `make -v` in your system's command line interface)


## Instructions
- Install a full Ruby development environment.
- Install Jekyll and bundler gems.
    `gem install jekyll bundler`
- Change into your `hrshadhin.me` directory
    `cd hrshadhin.me`
- Build the site and make it available on a local server.
    `bundle exec jekyll serve` or `jekyll serve`
- Browse to [http://localhost:4000](http://localhost:4000)
- Build the site for deployment
    `jekyll build` or `jekyll b` Now copy `_site` folder and deploy
- Here is some of the most common commands:
    
    `jekyll new PATH` - Creates a new Jekyll site with default gem-based theme at specified path. The directories will be created as necessary.
    
    `jekyll new PATH --blank` - Creates a new blank Jekyll site scaffold at specified path.
    
    `jekyll build` or `jekyll b` - Performs a one off build your site to ./_site (by default).
    
    `jekyll serve` or `jekyll s` - Builds your site any time a source file changes and serves it locally.
    
    `jekyll clean` - Removes all generated files: destination folder, metadata file, Sass and Jekyll caches.
    
    `jekyll help` - Shows help, optionally for a given subcommand, e.g. jekyll help build.
    
    `jekyll new-theme` - Creates a new Jekyll theme scaffold.
    
    `jekyll doctor` - Outputs any deprecation or configuration issues.
