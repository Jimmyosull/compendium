package main

import (
	"encoding/json"
	"image"
	"image/png"
	"net/http"
	"os"
	"strconv"
)

// TODO: tags
type Post struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Link string `json:"link"`
}

func createPostHandler(logger *Logger, app *App) http.Handler {
	return http.HandlerFunc(
		func(w http.ResponseWriter, r *http.Request) {
			var post Post
			err := json.NewDecoder(r.Body).Decode(&post)
			if err != nil {
				http.Error(w, err.Error(), http.StatusBadRequest)
				return
			}

			app.db.Create(&post)
			w.WriteHeader(http.StatusCreated)
			json.NewEncoder(w).Encode(post)
		})
}

func getPostHandler(logger *Logger, app *App) http.Handler {
	return http.HandlerFunc(
		func(w http.ResponseWriter, r *http.Request) {
			idStr := r.URL.Query().Get("id")
			id, err := strconv.Atoi(idStr)
			if err != nil {
				http.Error(w, "Invalid post ID", http.StatusBadRequest)
				return
			}
			var post Post
			app.db.Where("id = ?", id).First(&post)
			// TODO: check if a post is actually returned

			json.NewEncoder(w).Encode(post)
		})
}

func updatePostHandler(logger *Logger, app *App) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		idStr := r.URL.Query().Get("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "Invalid post ID", http.StatusBadRequest)
			return
		}
		var post Post
		err = json.NewDecoder(r.Body).Decode(&post)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// todo: verify this works, error checking
		app.db.Model(&post).Updates(post)

		post.ID = id
		json.NewEncoder(w).Encode(post)
	})
}

func deletePostHandler(logger *Logger, app *App) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		idStr := r.URL.Query().Get("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "Invalid user ID", http.StatusBadRequest)
			return
		}
		app.db.Delete(&Post{}, id)
		w.WriteHeader(http.StatusNoContent)
	})
}

func getAllPostsHandler(logger *Logger, app *App) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var posts []Post
		app.db.Find(&posts)

		for _, val := range posts {
			json.NewEncoder(w).Encode(val)
		}
	})
}

func getImageHandler(logger *Logger, app *App, img_folder string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		idStr := r.URL.Query().Get("id")
		path := img_folder + "/" + idStr + ".png"
		w.Header().Set("Content-Type", "image/png")
		http.ServeFile(w, r, path)
	})
}

func updateImageHandler(Logger *Logger, app *App, img_folder string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		idStr := r.URL.Query().Get("id")

		err := r.ParseMultipartForm(32 << 20)
		if err != nil {
			http.Error(w, "Unable to parse form", http.StatusBadRequest)
			return
		}

		file, _, err := r.FormFile("image")
		if err != nil {
			http.Error(w, "Error retrieving file!", http.StatusInternalServerError)
			return
		}
		defer file.Close()

		// todo: check if img is valid
		img, _, err := image.Decode(file)
		if err != nil {
			http.Error(w, "Error decoding PNG image!", http.StatusInternalServerError)
		}

		savePath := img_folder + "/" + idStr + ".png"
		output, err := os.Create(savePath)
		if err != nil {
			http.Error(w, "Error saving the file!", http.StatusInternalServerError)
			return
		}
		defer output.Close()

		err = png.Encode(output, img)
		if err != nil {
			http.Error(w, "Failed to save image!", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
	})
}
