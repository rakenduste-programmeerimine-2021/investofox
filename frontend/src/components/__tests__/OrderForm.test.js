import { render, screen } from '@testing-library/react';
import OrderForm from '../OrderForm';

test('should-render-orderform-component', () => {
    render(<OrderForm />);
    const orderFormElement = screen.getByTestId('orderFormPage');
    expect(orderFormElement).toBeInTheDocument();
});
