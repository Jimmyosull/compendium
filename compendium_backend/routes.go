package main

import "net/http"

func addRoutes(
	mux *http.ServeMux,
	app *App,
	logger *Logger,
) {
	mux.Handle("/api/v1/create", createPostHandler(logger, app))
	mux.Handle("/api/v1/get", getPostHandler(logger, app))
	mux.Handle("/api/v1/update", updatePostHandler(logger, app))
	mux.Handle("/api/v1/delete", deletePostHandler(logger, app))
	mux.Handle("/api/v1/all", getAllPostsHandler(logger, app))
	mux.Handle("/api/v1/imageGet", getImageHandler(logger, app, "/images"))
	mux.Handle("/api/v1/imageUpdate", updateImageHandler(logger, app, "/images"))
}
