import { ScoringModelListResponse } from "./api";

// Mock-данные для скоринговых моделей (используются при недоступном бэкенде)
export const SCORING_MODELS_MOCK: ScoringModelListResponse = {
    Total: 3,
    Orders: [
        {
            ID: 1,
            Title: "Базовый скоринг",
            Icon: "",
            ImageURL: "",
            Rate: "от 15%",
            Term: "до 12 месяцев",
            Amount: "до 500 000 ₽",
            Description: "Базовая модель оценки кредитоспособности",
            SumFrom: 50000,
            CreatedAt: "2023-01-01T00:00:00Z"
        },
        {
            ID: 2,
            Title: "Экспресс-скоринг",
            Icon: "",
            ImageURL: "",
            Rate: "от 18%",
            Term: "до 6 месяцев",
            Amount: "до 100 000 ₽",
            Description: "Быстрая оценка для небольших сумм",
            SumFrom: 10000,
            CreatedAt: "2023-01-02T00:00:00Z"
        },
        {
            ID: 3,
            Title: "Ипотечный скоринг",
            Icon: "",
            ImageURL: "",
            Rate: "от 10%",
            Term: "до 30 лет",
            Amount: "до 30 000 000 ₽",
            Description: "Расширенная модель для ипотечного кредитования",
            SumFrom: 1000000,
            CreatedAt: "2023-01-03T00:00:00Z"
        }
    ]
};

