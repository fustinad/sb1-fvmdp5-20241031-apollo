import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Login } from '../Login';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

vi.mock('@auth0/auth0-react');
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('Login', () => {
  const mockLoginWithRedirect = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it('shows loading spinner when authenticating', () => {
    vi.mocked(useAuth0).mockReturnValue({
      isLoading: true,
      isAuthenticated: false,
      loginWithRedirect: mockLoginWithRedirect,
    } as any);

    render(<Login />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('redirects to dashboard if already authenticated', () => {
    vi.mocked(useAuth0).mockReturnValue({
      isLoading: false,
      isAuthenticated: true,
      loginWithRedirect: mockLoginWithRedirect,
    } as any);

    render(<Login />);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('shows login button when not authenticated', () => {
    vi.mocked(useAuth0).mockReturnValue({
      isLoading: false,
      isAuthenticated: false,
      loginWithRedirect: mockLoginWithRedirect,
    } as any);

    render(<Login />);
    const loginButton = screen.getByRole('button', { name: /sign in with auth0/i });
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);
    expect(mockLoginWithRedirect).toHaveBeenCalled();
  });
});