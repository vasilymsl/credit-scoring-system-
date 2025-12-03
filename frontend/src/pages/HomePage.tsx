import React from "react";
import { Container, Carousel } from "react-bootstrap";

export const HomePage: React.FC = () => {
  return (
    <Container className="mt-4 mt-md-5">
      <h1 className="mb-3 mb-md-4 text-center" style={{ color: '#0b1f35' }}>
        Оценка кредитоспособности
      </h1>
      <p className="text-center mb-4 mb-md-5 px-2" style={{ color: '#555' }}>
        Добро пожаловать в систему скоринга кредитных заявок.
        Здесь вы можете ознакомиться с доступными услугами оценки.
      </p>
      
      <Carousel className="home-carousel mb-4 mb-md-5">
        <Carousel.Item>
          <div 
            style={{ 
              background: "#0b1f35", 
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              borderRadius: '8px',
              padding: '20px'
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>📊</div>
            <h3 style={{ margin: 0, textAlign: 'center' }}>Базовый скоринг заемщика</h3>
            <p style={{ margin: '10px 0 0', opacity: 0.8, fontSize: '14px' }}>Точность до 87% • &lt; 2 сек</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div 
            style={{ 
              background: "#142a47", 
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              borderRadius: '8px',
              padding: '20px'
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>💳</div>
            <h3 style={{ margin: 0, textAlign: 'center' }}>Анализ транзакций</h3>
            <p style={{ margin: '10px 0 0', opacity: 0.8, fontSize: '14px' }}>Точность до 92% • до 10 дней</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div 
            style={{ 
              background: "#1a3453", 
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              borderRadius: '8px',
              padding: '20px'
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🏠</div>
            <h3 style={{ margin: 0, textAlign: 'center' }}>Ипотечный скоринг</h3>
            <p style={{ margin: '10px 0 0', opacity: 0.8, fontSize: '14px' }}>Точность до 94% • до 5 дней</p>
          </div>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

