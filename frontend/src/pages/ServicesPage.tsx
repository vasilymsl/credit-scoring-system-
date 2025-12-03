import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { Service, getServices, ServiceFilter } from '../modules/api';
import { SERVICES_MOCK } from '../modules/mock';
import { ServiceCard } from '../components/ServiceCard';
import { Filter } from '../components/Filter';
import { BreadCrumbs } from '../components/Breadcrumbs';
import { ROUTE_LABELS } from '../Routes';
import { useFilter } from '../slices/filterSlice';

// Клиентская фильтрация для mock данных (когда API недоступен)
const filterMockData = (data: Service[], filter: ServiceFilter): Service[] => {
    let result = [...data];
    if (filter.title) {
        const searchTerm = filter.title.toLowerCase();
        result = result.filter(item => {
            const title = (item.Title || item.title || '').toLowerCase();
            const description = (item.Description || item.description || '').toLowerCase();
            return title.includes(searchTerm) || description.includes(searchTerm);
        });
    }
    return result;
};

export const ServicesPage: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);
    
    // Получаем состояние фильтра из Redux для начальной загрузки
    const filterState = useFilter();

    const fetchServices = async (filter: ServiceFilter = {}) => {
        setLoading(true);
        try {
            const response = await getServices(filter);
            // Поддержка разного регистра ключей (Orders или orders)
            // @ts-ignore
            const orders = response.Orders || response.orders || [];
            setServices(orders);
        } catch (e) {
            console.error('Fetch error:', e);
            // Fallback to mock data with client-side filtering
            const filteredMock = filterMockData(SERVICES_MOCK.Orders, filter);
            setServices(filteredMock);
        } finally {
            setLoading(false);
        }
    };

    // При монтировании компонента загружаем данные с учётом сохранённого фильтра
    useEffect(() => {
        const apiFilter: ServiceFilter = {
            title: filterState.title || undefined,
        };
        fetchServices(apiFilter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Только при монтировании

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
                <div className="services-grid">
                    {services.map(service => (
                        <div key={service.ID || service.id} className="service-card-wrapper">
                            <ServiceCard service={service} />
                        </div>
                    ))}
                </div>
            )}
        </Container>
    );
};

