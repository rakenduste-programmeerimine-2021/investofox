import { render, screen } from '@testing-library/react';
import LoginForm from '../LoginForm';

test('should-render-loginform-component', () => {
    render(<LoginForm />);
    const loginElement = screen.getByTestId('loginform');
    expect(loginElement).toBeInTheDocument();
});
