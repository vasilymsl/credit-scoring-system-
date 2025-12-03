import React, { useEffect, useState } from 'react';
import { Container, Spinner, Image, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { Service, getServiceById } from '../modules/api';
import { SERVICES_MOCK } from '../modules/mock';
import { ROUTES } from '../Routes';
import { transformImageUrl } from '../target_config';

const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23F0F0F0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";

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
                <Spinner animation="border" style={{ color: '#0b1f35' }} />
            </Container>
        );
    }

    if (!service) {
        return <Container className="mt-5" style={{ color: '#333' }}>Услуга не найдена</Container>;
    }

    // Нормализация полей
    const title = service.Title || service.title || "Без названия";
    const description = service.Description || service.description || "";
    const rate = service.Rate || service.rate || "";
    const term = service.Term || service.term || "";
    // Преобразуем URL картинки для Tauri (localhost -> IP)
    const rawImageURL = service.ImageURL || service.image_url || "";
    const imageURL = transformImageUrl(rawImageURL) || defaultImage;

    return (
        <Container style={{ paddingTop: '20px' }}>
            {/* Кнопка назад */}
            <Link to={ROUTES.SERVICES}>
                <Button 
                    style={{ 
                        backgroundColor: '#ef3124', 
                        borderColor: '#ef3124',
                        marginBottom: '25px',
                        padding: '10px 25px'
                    }}
                >
                    ← Назад на главную
                </Button>
            </Link>

            <div className="service-detail-container">
                <div className="service-detail-image">
                    <Image 
                        src={imageURL} 
                        alt={title} 
                        fluid 
                        style={{ 
                            borderRadius: '8px', 
                            backgroundColor: '#F0F0F0',
                            padding: '20px',
                            maxHeight: '300px',
                            objectFit: 'contain'
                        }}
                        onError={(e) => { e.currentTarget.src = defaultImage; }}
                    />
                </div>
                <div className="service-detail-info">
                    <h2 style={{ color: '#000', fontWeight: 'bold', marginBottom: '20px' }}>{title}</h2>
                    
                    <div style={{ marginBottom: '20px' }}>
                        {rate && <p style={{ color: '#333', margin: '8px 0' }}>• Точность: {rate}</p>}
                        {term && <p style={{ color: '#333', margin: '8px 0' }}>• Время расчёта: {term}</p>}
                    </div>
                    
                    {description && (
                        <>
                            <h4 style={{ color: '#000', fontWeight: 'bold', marginTop: '30px' }}>Описание:</h4>
                            <p style={{ color: '#555', lineHeight: '1.7' }}>{description}</p>
                        </>
                    )}
                </div>
            </div>
        </Container>
    );
};

