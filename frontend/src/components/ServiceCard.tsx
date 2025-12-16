import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../Routes';
import { ScoringModel } from '../modules/api';

// Картинка по умолчанию (если у модели нет изображения)
const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23cccccc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%23666666'%3ENo Image%3C/text%3E%3C/svg%3E";

interface Props {
    model: ScoringModel;
}

// Карточка скоринговой модели
export const ScoringModelCard: React.FC<Props> = ({ model }) => {
    // Нормализация полей (берем либо UpperCase, либо camelCase)
    const title = model.Title || model.title || "Без названия";
    const description = model.Description || model.description || "";
    const rate = model.Rate || model.rate || "—";
    const term = model.Term || model.term || "—";
    const id = model.ID || model.id;
    const imageURL = model.ImageURL || model.image_url || defaultImage;

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

