.PHONY: all build clean serve deploy

all: build
deploy: site_name = hrshadhin.me
deploy: arc_file = hrshadhin.me.tar.gz
deploy: server = docloud
deploy: server_path = /home/shadhin/

REQUIRED_BINS = tar jekyll ssh
check_bins:  
  $(foreach bin,$(REQUIRED_BINS), $(if $(shell command -v $(bin) 2> /dev/null),,$(error Please install `$(bin)`)))

build: check_bins clean
	@echo "Building..."
	JEKYLL_ENV=production jekyll build

clean:
	@rm -rf _site .jekyll-cache *.tar.gz

serve: check_bins clean
	jekyll serve

deploy: build 
	@echo "Deploying..."
	@tar --owner=www-data --group=www-data -czvf $(arc_file) -C ./_site .
	@scp $(arc_file) $(server):$(server_path)
	@ssh $(server) 'tar --same-owner -xzvf $(server_path)$(arc_file) -C $(server_path)$(site_name); rm $(server_path)$(arc_file)'
	$(MAKE) clean
	@echo "Deployment done :)"