port := 3000
url := http://localhost:$(port)
book := '{ "book": "A família Dorta Almeida - Segunda Edição", "edition": 2, "year": 2023, "authors": [ "Marco Almeida", "Maria Tereza" ] }'
bookV2 := '{ "book": "A família Dorta Almeida", "edition": 1, "year": 2021, "authors": [ "Marco Almeida", "Maria Tereza", "Clara Beatriz", "Molly & Nala" ] }'

# Usage samples:
# 
#   make post-author author="Author name"
#   make put-author author="Author name changed" id=61742e31dda30cab65317784
#   make upload-author file="./src/docs/authors.csv"
#   make upload-author file="./src/docs/theGuardianAutors.csv"
#   make delete-author id=61742e31dda30cab65317784
#   make test-author

# make get-books 
# make post-book 
# make put-book id=61742e31dda30cab65317784
# make delete-book id=61742e31dda30cab65317784

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

upload-author:
		@curl \
				--silent \
				-X POST $(url)/authors/upload \
				-F 'file=@"$(file)"' \
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
		@make post-author author="Author name"
		@make get-authors
		@make upload-author file="./src/docs/authors.csv"
		@make get-authors

get-books:
		@curl \
				--silent $(url)/books \
				-H 'Authorization: $(auth)' \
				| jq .

post-book:
		@echo $(book)
		@curl \
				--silent \
				-X POST $(url)/books \
				-H 'Content-Type: application/json' \
				-d '{ "book": "A família Dorta Almeida", "edition": 1, "year": 2023, "authors": [ "Maria Tereza", "Clara Beatriz", "Clara Carolina" ] }' \
				| jq .

put-book:
		@echo $(bookV2)
		@curl \
				--silent \
				-X PUT $(url)/books/$(id) \
				-H 'Content-Type: application/json' \
				-d $(bookV2) \
				| jq .

delete-book:
		@curl \
				--silent \
				-X DELETE $(url)/books/$(id) \
				| jq .

test-book:
		@make get-books
		@make post-book
		@make get-books
		@make get-authors


start:
		@npm run mongo:start
		@npm run start

restart:
		@npm run mongo:stop
		@npm run mongo:start
		@npm run start

clean:
		@echo 'removing coverage and node_modules'
		@rm -rf coverage node_modules 
		@echo 'installing dependencies'
		@npm i
