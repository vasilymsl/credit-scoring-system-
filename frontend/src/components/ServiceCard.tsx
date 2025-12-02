import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../Routes';
import { Service } from '../modules/api';

// Локальная заглушка (цветной квадрат), чтобы не зависеть от внешних сервисов
const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23cccccc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%23666666'%3ENo Image%3C/text%3E%3C/svg%3E";

interface Props {
    service: Service;
}

export const ServiceCard: React.FC<Props> = ({ service }) => {
    // Нормализация полей (берем либо UpperCase, либо camelCase)
    const title = service.Title || service.title || "Без названия";
    const description = service.Description || service.description || "";
    const rate = service.Rate || service.rate || "—";
    const term = service.Term || service.term || "—";
    const id = service.ID || service.id;
    const imageURL = service.ImageURL || service.image_url || defaultImage;

    return (
        <Card className="card" style={{ width: '100%' }}>
            <Card.Img 
                variant="top" 
                src={imageURL} 
                height={200} 
                style={{ objectFit: 'contain' }}
                onError={(e) => { e.currentTarget.src = defaultImage; }}
            />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {description}
                    <br/>
                    <strong>Ставка:</strong> {rate}
                    <br/>
                    <strong>Срок:</strong> {term}
                </Card.Text>
                <Link to={`${ROUTES.SERVICES}/${id}`}>
                    <Button variant="primary">Подробнее</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

