port := 3000
url := http://localhost:$(port)
book := '{ "book": "A família Dorta Almeida - Segunda Edição", "edition": 2, "year": 2023, "authors": [ "Marco Almeida", "Maria Tereza" ] }'
bookV2 := '{ "book": "Família Dorta Almeida", "edition": 2, "year": 2023, "authors": [ "Marco Antônio", "Maria Tereza", "Clara Beatriz", "Molly & Nala doggies" ] }'

# Usage samples:
# 
#   make get-authors 
#   make post-author author="Author name"
#   make put-author author="Author name changed" id=61742e31dda30cab65317784
#   make delete-author id=61742e31dda30cab65317784
#   make upload-author file="./docs/authors.csv"
#   make test-author

# 	make get-books
#   make post-book
#   make put-book id=61742e31dda30cab65317784
#   make delete-book id=61742e31dda30cab65317784
#   make test-book

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

upload-author:
		@curl \
				--silent \
				-X POST $(url)/authors/upload \
				-F 'file=@"$(file)"' \
				| jq .

test-author:
		@make get-authors
		@make post-author author="Marco Almeida"
		@make post-author author="Maria Tereza"
		@make post-author author="Clara Beatriz"
		@make get-authors
		@make upload-author file="./docs/authors.csv"
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
        -d $(book) \
				| jq .

test-book:
		@make get-books
		@make post-book
		@make get-books
		@make get-authors

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
