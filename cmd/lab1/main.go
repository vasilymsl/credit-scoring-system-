package main

import (
	"context"
	"fmt"

	"lab1/internal/app/config"
	"lab1/internal/app/dsn"
	"lab1/internal/app/handler"
	"lab1/internal/app/redis"
	"lab1/internal/app/repository"
	"lab1/internal/app/service"
	"lab1/internal/pkg"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/sirupsen/logrus"
	
	// Swagger imports
	_ "lab1/docs"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title Lab4 Scoring Service API
// @version 1.0
// @description API для системы скоринга и управления кредитными заявками
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://example.com/support
// @contact.email support@example.com

// @license.name MIT
// @license.url https://opensource.org/licenses/MIT

// @host localhost:8080
// @BasePath /api

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @description JWT токен в формате: Bearer {token}

func main() {
	// Загружаем переменные окружения из .env файла
	_ = godotenv.Load()

	// Настраиваем логирование
	logrus.SetFormatter(&logrus.TextFormatter{
		FullTimestamp: true,
	})
	logrus.SetLevel(logrus.InfoLevel)

	logrus.Info("Starting application...")

	// Контекст приложения
	ctx := context.Background()

	// Загружаем конфигурацию
	conf, err := config.NewConfig()
	if err != nil {
		logrus.Fatalf("error loading config: %v", err)
	}
	logrus.Info("Configuration loaded successfully")

	// Подключаемся к базе данных
	postgresString := dsn.FromEnv()
	fmt.Println("Database connection string:", postgresString)

	rep, errRep := repository.New(postgresString)
	if errRep != nil {
		logrus.Fatalf("error initializing repository: %v", errRep)
	}
	logrus.Info("Database connected successfully")

	// Инициализируем MinIO сервис
	minioService, errMinio := service.NewMinioService(conf.Minio)
	if errMinio != nil {
		logrus.Fatalf("error initializing MinIO service: %v", errMinio)
	}
	logrus.Info("MinIO service initialized successfully")

	// Подключаемся к Redis
	redisClient, errRedis := redis.New(ctx, conf.Redis)
	if errRedis != nil {
		logrus.Fatalf("error initializing Redis client: %v", errRedis)
	}
	defer redisClient.Close()
	logrus.Info("Redis connected successfully")

	// Создаем роутер
	router := gin.Default()

	// Добавляем middleware для CORS
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Добавляем Swagger UI
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	logrus.Info("Swagger UI available at http://localhost:8080/swagger/index.html")

	// Создаем handler с репозиторием, MinIO сервисом, конфигом и Redis
	hand := handler.NewHandler(rep, minioService, conf, redisClient)

	// Создаем и запускаем приложение
	application := pkg.NewApp(conf, router, hand)
	application.RunApp()
}
