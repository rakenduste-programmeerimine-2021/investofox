import { render, screen } from '@testing-library/react';
import NavBar from '../NavBar';

test('should-render-navbar-component', () => {
    render(<NavBar />);
    const navbarElement = screen.getByTestId('navbar');
    expect(navbarElement).toBeInTheDocument();
});
