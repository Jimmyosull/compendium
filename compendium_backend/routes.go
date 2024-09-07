package main

import (
	"github.com/gorilla/mux"
)

func addRoutes(
	r *mux.Router,
	app *App,
	logger *Logger,
) {
	r.Handle("/api/v1/create", createPostHandler(logger, app))
	r.Handle("/api/v1/get", getPostHandler(logger, app))
	r.Handle("/api/v1/update", updatePostHandler(logger, app))
	r.Handle("/api/v1/delete", deletePostHandler(logger, app))
	r.Handle("/api/v1/all", getAllPostsHandler(logger, app))
	r.Handle("/api/v1/imageGet", getImageHandler(logger, app, "/images"))
	r.Handle("/api/v1/imageUpdate", updateImageHandler(logger, app, "/images"))
}
