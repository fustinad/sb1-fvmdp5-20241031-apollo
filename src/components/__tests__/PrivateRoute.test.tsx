import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PrivateRoute } from '../PrivateRoute';
import { useAuth0 } from '@auth0/auth0-react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@auth0/auth0-react');

describe('PrivateRoute', () => {
  it('shows loading spinner when authenticating', () => {
    vi.mocked(useAuth0).mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
    } as any);

    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Protected Content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders children when authenticated', () => {
    vi.mocked(useAuth0).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    } as any);

    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Protected Content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', () => {
    vi.mocked(useAuth0).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    } as any);

    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Protected Content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});