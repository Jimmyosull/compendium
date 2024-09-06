package main

import (
	"fmt"
	"log"
	"net"
	"net/http"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Logger struct {
}

type App struct {
	db *gorm.DB
}

func NewApp() *App {
	return &App{
		db: connectToDB(),
	}
}

func connectToDB() *gorm.DB {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		os.Getenv("DB_USER"), os.Getenv("DB_PW"), os.Getenv("DB_HOST"), os.Getenv("DB_PORT"), os.Getenv("DB_NAME"))

	log.Println(dsn)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalln("Error opening db!", err)
	}
	fmt.Println("Successful db connection!")
	return db
}

func createTables(db *gorm.DB) {
	// TODO: error handling on this
	db.Exec(`CREATE TABLE IF NOT EXISTS posts (
		id INT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		link TEXT);`)

	db.Exec(`CREATE TABLE IF NOT EXISTS tags (
		id INT AUTO_INCREMENT PRIMARY KEY,
		tag VARCHAR(255) NOT NULL);`)

	db.Exec(`CREATE TABLE IF NOT EXISTS post_tags (
		post_id INT,
		tag_id INT,
		PRIMARY KEY (post_id, tag_id),
		FOREIGN KEY (post_id) REFERENCES posts(id) on DELETE CASCADE,
		FOREIGN KEY (tag_id) REFERENCES tags(id) on DELETE CASCADE);`)

}

func main() {
	app := NewApp()

	mux := http.NewServeMux()
	addRoutes(mux, app, &Logger{})

	var handler http.Handler = mux

	host := "0.0.0.0"
	port := os.Getenv("PORT")
	httpServer := &http.Server{
		Addr:    net.JoinHostPort(host, port),
		Handler: handler,
	}

	fmt.Println(&app.db)
	// create tables if do not exist
	createTables(app.db)

	fmt.Printf("Starting listening on %s", httpServer.Addr)

	if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		fmt.Fprintf(os.Stderr, "error listening and serving: %s\n", err)
	}
}
