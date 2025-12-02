import React from "react";
import { Container, Carousel } from "react-bootstrap";

export const HomePage: React.FC = () => {
  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Система скоринга</h1>
      <p className="text-center mb-5">
        Добро пожаловать в систему скоринга кредитных заявок.
        Здесь вы можете ознакомиться с доступными услугами.
      </p>
      
      <Carousel className="mb-5" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Carousel.Item>
          <div style={{ height: "400px", background: "#777", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "24px" }}>
            Скоринг заемщика
          </div>
          <Carousel.Caption>
            <h3>Быстрая оценка</h3>
            <p>Мгновенный расчет кредитного рейтинга.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div style={{ height: "400px", background: "#555", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "24px" }}>
            Анализ транзакций
          </div>
          <Carousel.Caption>
            <h3>Глубокий анализ</h3>
            <p>Проверка доходов и расходов.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div style={{ height: "400px", background: "#333", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "24px" }}>
            Ипотечный скоринг
          </div>
          <Carousel.Caption>
            <h3>Ипотека</h3>
            <p>Оценка недвижимости и рисков.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

