import { render, screen } from '@testing-library/react';
import PortfolioForm from '../PortfolioForm';

test('should-render-portfolioForm-component', () => {
    render(<PortfolioForm />);
    const portfolioElement = screen.getByTestId('portfolioFormPage');
    expect(portfolioElement).toBeInTheDocument();
});