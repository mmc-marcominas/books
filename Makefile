port := 3000
url := http://localhost:$(port)/authors

# Usage samples:
# 
#   make get-author
#   make post-author author="Author name"
#   make put-author author="Author name changed" id=61742e31dda30cab65317784
#   make upload-author file="./src/docs/authors.csv"
#   make upload-author file="./src/docs/theGuardianAutors.csv"
#   make delete-author id=61742e31dda30cab65317784

get-author:
		@curl \
				--silent $(url) \
				-H 'Authorization: $(auth)' \
				| jq .

post-author:
		@curl \
				--silent \
				-X POST $(url) \
				-H 'Content-Type: application/json' \
				-d '{"author":"$(author)"}' \
				| jq .

upload-author:
		@curl \
				--silent \
				-X POST $(url)/upload \
				-F 'file=@"$(file)"' \
				| jq .

put-author:
		@curl \
				--silent \
				-X PUT $(url)/$(id) \
				-H 'Content-Type: application/json' \
				-d '{"author":"$(author)"}' \
				| jq .

delete-author:
		@curl \
				--silent \
				-X DELETE $(url)/$(id) \
				| jq .

test-author:
		@make get-author
		@make post-author author="Author name"
		@make get-author
		@make upload-author file="./src/docs/authors.csv"
		@make get-author

restart:
		@npm run mongo:stop
		@npm run mongo:start
		@npm run start

clean:
		@echo 'removing coverage and node_modules'
		@rm -rf coverage node_modules 
		@echo 'installing dependencies'
		@npm i
