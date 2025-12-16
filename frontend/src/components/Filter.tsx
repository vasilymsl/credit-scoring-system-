import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { ScoringModelFilter } from '../modules/api';

interface Props {
    onFilter: (filter: ScoringModelFilter) => void;
}

export const Filter: React.FC<Props> = ({ onFilter }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = () => {
        onFilter({ title });
    };

    return (
        <Form className="mb-4 p-3 bg-light border rounded">
            <Row>
                <Col md={9}>
                    <Form.Control 
                        placeholder="Поиск по названию" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                    />
                </Col>
                <Col md={3}>
                    <Button variant="primary" onClick={handleSubmit} className="w-100">Найти</Button>
                </Col>
            </Row>
        </Form>
    );
};

