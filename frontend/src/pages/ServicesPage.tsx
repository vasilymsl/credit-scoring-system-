import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Service, getServices, ServiceFilter } from '../modules/api';
import { SERVICES_MOCK } from '../modules/mock';
import { ServiceCard } from '../components/ServiceCard';
import { Filter } from '../components/Filter';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { ROUTE_LABELS } from '../Routes';

export const ServicesPage: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchServices = async (filter: ServiceFilter = {}) => {
        setLoading(true);
        try {
            const response = await getServices(filter);
            // Поддержка разного регистра ключей (Orders или orders)
            // @ts-ignore
            const orders = response.Orders || response.orders || [];
            setServices(orders);
        } catch (e) {
            console.error(e);
            // Fallback to mock data if fetch fails
            setServices(SERVICES_MOCK.Orders);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <Container>
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.SERVICES }]} />
            <h1>{ROUTE_LABELS.SERVICES}</h1>
            <Filter onFilter={fetchServices} />
            
            {loading ? (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {services.map(service => (
                        <Col key={service.ID}>
                            <ServiceCard service={service} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

