run: frontend backend
	docker-compose -f docker-compose.yml create --remove-orphans
	docker-compose -f docker-compose.yml start

watch: frontend backend
	echo "todo!"

frontend: compendium_frontend
	cd compendium_frontend && bun run build
	docker buildx build -t compendium-frontend . -f ./compendium_frontend/Prebuilt-Dockerfile
	
backend: compendium_backend
	cd compendium_backend && docker buildx build -t compendium-backend . -f Dockerfile