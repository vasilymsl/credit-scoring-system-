import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Image, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Service, getServiceById } from '../modules/api';
import { SERVICES_MOCK } from '../modules/mock';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { ROUTES, ROUTE_LABELS } from '../Routes';

const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23cccccc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%23666666'%3ENo Image%3C/text%3E%3C/svg%3E";

export const ServiceDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        getServiceById(Number(id))
            .then(data => setService(data))
            .catch(() => {
                // @ts-ignore
                const mockService = SERVICES_MOCK.Orders.find(s => s.ID === Number(id) || s.id === Number(id));
                setService(mockService || null);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
         return (
            <Container className="d-flex justify-content-center mt-5">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (!service) {
        return <Container className="mt-5">Service not found</Container>;
    }

    // Нормализация полей
    const title = service.Title || service.title || "Без названия";
    const description = service.Description || service.description || "";
    const rate = service.Rate || service.rate || "—";
    const term = service.Term || service.term || "—";
    const sumFrom = service.SumFrom || service.sum_from || 0;
    const amount = service.Amount || service.amount || "—";
    const imageURL = service.ImageURL || service.image_url || defaultImage;

    return (
        <Container>
            <BreadCrumbs 
                crumbs={[
                    { label: ROUTE_LABELS.SERVICES, path: ROUTES.SERVICES },
                    { label: title }
                ]} 
            />
            <Row className="mt-4">
                <Col md={6}>
                    <Image 
                        src={imageURL} 
                        alt={title} 
                        fluid 
                        onError={(e) => { e.currentTarget.src = defaultImage; }}
                    />
                </Col>
                <Col md={6}>
                    <h2>{title}</h2>
                    <p className="lead">{description}</p>
                    <p><strong>Ставка:</strong> {rate}</p>
                    <p><strong>Срок:</strong> {term}</p>
                    <p><strong>Сумма от:</strong> {sumFrom} руб.</p>
                    <p><strong>Сумма до:</strong> {amount}</p>
                    
                    {/* Кнопки убраны согласно замечаниям: 
                        1. "Подать заявку" не нужна гостю.
                        2. "Назад" не нужна, так как есть Breadcrumbs. 
                    */}
                </Col>
            </Row>
        </Container>
    );
};

