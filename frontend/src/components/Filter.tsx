import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { ServiceFilter } from '../modules/api';

interface Props {
    onFilter: (filter: ServiceFilter) => void;
}

export const Filter: React.FC<Props> = ({ onFilter }) => {
    const [title, setTitle] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');

    const handleSubmit = () => {
        onFilter({
            title,
            date_from: dateFrom,
            date_to: dateTo,
            price_min: priceMin ? Number(priceMin) : undefined,
            price_max: priceMax ? Number(priceMax) : undefined,
        });
    };

    return (
        <Form className="mb-4 p-3 bg-light border rounded">
            <Row className="mb-3">
                <Col md={3}>
                    <Form.Control 
                        placeholder="Название" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                    />
                </Col>
                <Col md={3}>
                    <Form.Control 
                        type="date" 
                        placeholder="Дата от" 
                        value={dateFrom} 
                        onChange={e => setDateFrom(e.target.value)} 
                    />
                </Col>
                <Col md={3}>
                    <Form.Control 
                        type="date" 
                        placeholder="Дата до" 
                        value={dateTo} 
                        onChange={e => setDateTo(e.target.value)} 
                    />
                </Col>
                <Col md={3}>
                    <Button variant="primary" onClick={handleSubmit} className="w-100">Применить фильтр</Button>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                     <Form.Control 
                        type="number" 
                        placeholder="Цена от" 
                        value={priceMin} 
                        onChange={e => setPriceMin(e.target.value)} 
                    />
                </Col>
                <Col md={3}>
                     <Form.Control 
                        type="number" 
                        placeholder="Цена до" 
                        value={priceMax} 
                        onChange={e => setPriceMax(e.target.value)} 
                    />
                </Col>
            </Row>
        </Form>
    );
};

