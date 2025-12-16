// Интерфейс скоринговой модели
export interface ScoringModel {
    ID: number;
    Title: string;
    Icon: string;
    ImageURL: string;
    Rate: string;
    Term: string;
    Amount: string;
    Description: string;
    SumFrom: number;
    CreatedAt: string;
    
    // Поля для совместимости с JSON от бэкенда (camelCase)
    id?: number;
    title?: string;
    icon?: string;
    image_url?: string;
    rate?: string;
    term?: string;
    amount?: string;
    description?: string;
    sum_from?: number;
    created_at?: string;
}

// Ответ со списком скоринговых моделей
export interface ScoringModelListResponse {
    Total: number;
    Orders: ScoringModel[];
    orders?: ScoringModel[]; // Поддержка camelCase
}

// Фильтр для поиска скоринговых моделей (только по названию)
export interface ScoringModelFilter {
    title?: string;
}

// Получение списка скоринговых моделей
export const getScoringModels = async (filter: ScoringModelFilter = {}): Promise<ScoringModelListResponse> => {
    const params = new URLSearchParams();
    if (filter.title) params.append("title", filter.title);

    const response = await fetch(`/api/credits?${params.toString()}`);
    if (!response.ok) {
        throw new Error("Failed to fetch scoring models");
    }
    return response.json();
};

// Получение одной скоринговой модели по ID
export const getScoringModelById = async (id: number): Promise<ScoringModel> => {
    const response = await fetch(`/api/credits/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch scoring model");
    }
    return response.json();
};

// Запрос корзины (иконка в Navbar, для демонстрации в Network)
export const getBasket = async () => {
    try {
        await fetch('/api/applications/basket');
    } catch (e) {
        console.log("Basket request sent");
    }
};
