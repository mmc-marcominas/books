port := 3000
url := http://localhost:$(port)

# Usage samples:
# 
#   make get-authors 
#   make post-author author="Author name"
#   make put-author author="Author name changed" id=61742e31dda30cab65317784
#   make delete-author id=61742e31dda30cab65317784
#   make test-author

get-authors:
		@curl \
				--silent $(url)/authors \
				-H 'Authorization: $(auth)' \
				| jq .

post-author:
		@curl \
				--silent \
				-X POST $(url)/authors \
				-H 'Content-Type: application/json' \
				-d '{"author":"$(author)"}' \
				| jq .

put-author:
		@curl \
				--silent \
				-X PUT $(url)/authors/$(id) \
				-H 'Content-Type: application/json' \
				-d '{"author":"$(author)"}' \
				| jq .

delete-author:
		@curl \
				--silent \
				-X DELETE $(url)/authors/$(id) \
				| jq .

test-author:
		@make get-authors
		@make post-author author="Marco Almeida"
		@make post-author author="Maria Tereza"
		@make post-author author="Clara Beatriz"
		@make get-authors

start:
		@docker run --rm -d -p 27017:27017 --name mongo-books mongo:4
		@npm run start

restart:
		@docker stop mongo-books
		@docker run --rm -d -p 27017:27017 --name mongo-books mongo:4
		@npm run start

clean:
		@echo 'removing coverage and node_modules'
		@rm -rf node_modules
		@echo 'installing dependencies'
		@npm i
