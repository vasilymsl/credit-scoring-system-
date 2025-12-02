package main

import (
	"fmt"
	"io/ioutil"
	"log"
	
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// Строка подключения
	dsn := "host=localhost port=5432 user=myuser password=mypassword dbname=credits sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	fmt.Println("Successfully connected to local database via GORM")

	// Читаем файл с данными
	content, err := ioutil.ReadFile("seed_data.sql")
	if err != nil {
		log.Fatal(err)
	}

	sqlScript := string(content)

	// Выполняем скрипт
	err = db.Exec(sqlScript).Error
	if err != nil {
		log.Printf("Error executing script: %v\n", err)
	} else {
		fmt.Println("Script executed successfully!")
	}
}
