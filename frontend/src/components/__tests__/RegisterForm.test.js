import { render, screen } from '@testing-library/react';
import RegisterForm from '../RegisterForm';

test('should-render-registerform-component', () => {
    render(<RegisterForm />);
    const registerElement = screen.getByTestId('registerFormPage');
    expect(registerElement).toBeInTheDocument();
});
