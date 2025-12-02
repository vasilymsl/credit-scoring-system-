import { ServiceListResponse } from "./api";

export const SERVICES_MOCK: ServiceListResponse = {
    Total: 3,
    Orders: [
        {
            ID: 1,
            Title: "Mock Service 1",
            Icon: "",
            ImageURL: "",
            Rate: "90%",
            Term: "1 day",
            Amount: "1000",
            Description: "This is a mock service",
            SumFrom: 1000,
            CreatedAt: "2023-01-01T00:00:00Z"
        },
        {
            ID: 2,
            Title: "Mock Service 2",
            Icon: "",
            ImageURL: "",
            Rate: "95%",
            Term: "2 days",
            Amount: "2000",
            Description: "This is another mock service",
            SumFrom: 2000,
            CreatedAt: "2023-01-02T00:00:00Z"
        },
        {
            ID: 3,
            Title: "Mock Service 3",
            Icon: "",
            ImageURL: "",
            Rate: "99%",
            Term: "3 days",
            Amount: "3000",
            Description: "This is a third mock service",
            SumFrom: 3000,
            CreatedAt: "2023-01-03T00:00:00Z"
        }
    ]
};

