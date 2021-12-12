import React from 'react';
import OrderForm from '../components/OrderForm';
import './Order.css';

export function AddOrder() {

    return (
        <div className="order-body">
            <div className="order-orderForm">
                <OrderForm />
            </div>
        </div>
    )
}

export default AddOrder
