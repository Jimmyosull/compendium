


run: frontend backend
	docker-compose -f docker-compose.yml create
	docker-compose -f docker-compose.yml start

watch: frontend backend
	echo "todo!"

frontend: compendium_frontend
	bun run build
	docker buildx build -t compendium-frontend . -f ./compendium-frontend/Prebuilt-Dockerfile
	
backend: compendium_backend
	docker buildx build -t compendium-backend . -f ./compendium-backend/Backend-Dockerfile