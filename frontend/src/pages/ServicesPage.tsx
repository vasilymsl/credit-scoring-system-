import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { ScoringModel, getScoringModels, ScoringModelFilter } from '../modules/api';
import { SCORING_MODELS_MOCK } from '../modules/mock';
import { ScoringModelCard } from '../components/ServiceCard';
import { Filter } from '../components/Filter';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { ROUTE_LABELS } from '../Routes';

export const ScoringModelsPage: React.FC = () => {
    const [models, setModels] = useState<ScoringModel[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchModels = async (filter: ScoringModelFilter = {}) => {
        setLoading(true);
        try {
            const response = await getScoringModels(filter);
            // Поддержка разного регистра ключей (Orders или orders)
            // @ts-ignore
            const data = response.Orders || response.orders || [];
            setModels(data);
        } catch (e) {
            console.error(e);
            // Fallback to mock data if fetch fails
            setModels(SCORING_MODELS_MOCK.Orders);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchModels();
    }, []);

    return (
        <Container>
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.SERVICES }]} />
            <h1>{ROUTE_LABELS.SERVICES}</h1>
            <Filter onFilter={fetchModels} />
            
            {loading ? (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {models.map(model => (
                        <Col key={model.ID || model.id}>
                            <ScoringModelCard model={model} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

