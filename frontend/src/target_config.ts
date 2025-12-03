/**
 * Конфигурация для Tauri и web-приложения
 * 
 * При сборке Tauri build нужно установить target_tauri = true
 * и указать IP адрес сервера в локальной сети
 */

// Флаг: true для Tauri build, false для web (GitHub Pages, dev)
// !!! ВАЖНО: Для web/Docker установить false, для Tauri build - true !!!
export const target_tauri = false;

// IP адрес сервера в локальной сети (изменить на реальный IP!)
export const server_ip = "192.168.2.66";

// IP адрес API сервера
export const api_server_ip = `http://${server_ip}:8080`;

// IP адрес MinIO (для картинок)
export const minio_server_ip = `http://${server_ip}:9000`;

// Путь к API для разных режимов
// Для Tauri нужен полный путь с /api, для web - просто /api (через прокси)
export const dest_api = target_tauri ? `${api_server_ip}/api` : "/api";

// Базовый путь для роутера (пустой для Tauri, с именем репо для GitHub Pages)
export const dest_root = target_tauri ? "" : "/credit-scoring-system-";

/**
 * Преобразует URL картинки для Tauri
 * Заменяет localhost:9000 на реальный IP MinIO
 */
export const transformImageUrl = (url: string | undefined): string => {
    if (!url) return "";
    if (target_tauri) {
        return url.replace("http://localhost:9000", minio_server_ip);
    }
    return url;
};

