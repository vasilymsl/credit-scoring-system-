export interface Service {
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

export interface ServiceListResponse {
    Total: number;
    Orders: Service[];
    orders?: Service[]; // Поддержка camelCase
}

export interface ServiceFilter {
    title?: string;
    date_from?: string;
    date_to?: string;
    price_min?: number;
    price_max?: number;
}

export const getServices = async (filter: ServiceFilter = {}): Promise<ServiceListResponse> => {
    const params = new URLSearchParams();
    if (filter.title) params.append("title", filter.title);
    if (filter.date_from) params.append("date_from", filter.date_from);
    if (filter.date_to) params.append("date_to", filter.date_to);
    if (filter.price_min) params.append("price_min", filter.price_min.toString());
    if (filter.price_max) params.append("price_max", filter.price_max.toString());

    const response = await fetch(`/api/credits?${params.toString()}`);
    if (!response.ok) {
        throw new Error("Failed to fetch services");
    }
    return response.json();
};

export const getServiceById = async (id: number): Promise<Service> => {
    const response = await fetch(`/api/credits/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch service");
    }
    return response.json();
};

// Запрос корзины (для демонстрации в Network, даже если вернет 401/403)
export const getBasket = async () => {
    // Этот запрос может упасть с 401 (Unauthorized), если мы не залогинены,
    // но он будет виден в браузере, что и требуется.
    try {
        await fetch('/api/applications/basket');
    } catch (e) {
        // Игнорируем ошибку, нам важен сам факт запроса
        console.log("Basket fetch failed (expected for guest)");
    }
};
