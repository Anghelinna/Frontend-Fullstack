import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  it('should render navigation links', () => {
    render(<Navbar />);

    expect(screen.getByText('Cómo funciona')).toBeInTheDocument();
    expect(screen.getByText('Funcionalidades')).toBeInTheDocument();
    expect(screen.getByText('Plantillas')).toBeInTheDocument();
  });

  it('should render the logo image', () => {
    render(<Navbar />);

    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/kuska-logov2.png');
  });

  it('should not have hidden class by default', () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector('nav');
    expect(nav?.className).not.toContain('navbar-hidden');
  });

  it('should have hidden class when isHidden is true', () => {
    const { container } = render(<Navbar isHidden={true} />);
    const nav = container.querySelector('nav');
    expect(nav?.className).toContain('navbar-hidden');
  });

  it('should have correct href attributes on links', () => {
    render(<Navbar />);

    expect(screen.getByText('Cómo funciona').closest('a')).toHaveAttribute(
      'href',
      '#como-funciona'
    );
    expect(screen.getByText('Funcionalidades').closest('a')).toHaveAttribute(
      'href',
      '#funcionalidades'
    );
    expect(screen.getByText('Plantillas').closest('a')).toHaveAttribute(
      'href',
      '#plantillas'
    );
  });
});
