import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../Navbar';
import { useAuth0 } from '@auth0/auth0-react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@auth0/auth0-react');

describe('Navbar', () => {
  const mockLogout = vi.fn();

  beforeEach(() => {
    vi.mocked(useAuth0).mockReturnValue({
      logout: mockLogout,
      user: {
        email: 'test@example.com',
        name: 'Test User',
      },
    } as any);
  });

  it('renders user email', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('calls logout when logout button is clicked', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(mockLogout).toHaveBeenCalledWith({
      logoutParams: { returnTo: window.location.origin },
    });
  });

  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /settings/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument();
  });
});