import React from 'react';
import { Card } from 'react-bootstrap';

const StatsCard = ({ title, value, icon, color }) => {
  const getCardClass = () => {
    switch (color) {
      case 'primary':
        return 'bg-card-primary';
      case 'success':
        return 'bg-card-success';
      case 'info':
        return 'bg-card-info';
      case 'warning':
        return 'bg-card-warning';
      case 'danger':
        return 'bg-card-danger';
      default:
        return 'bg-card-primary';
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <h6 className="card-subtitle text-muted mb-1">{title}</h6>
          <h3 className="card-title fw-bold mb-0">{value}</h3>
        </div>
        <div className={`card-icon ${getCardClass()} p-3 rounded-circle`}>
          {icon}
        </div>
      </Card.Body>
    </Card>
  );
};


export default StatsCard;
