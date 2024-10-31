import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Profile } from '../Profile';
import { useAuth0 } from '@auth0/auth0-react';

vi.mock('@auth0/auth0-react');

describe('Profile', () => {
  const mockUser = {
    name: 'Test User',
    email: 'test@example.com',
    picture: 'https://example.com/avatar.jpg',
    email_verified: true,
  };

  beforeEach(() => {
    vi.mocked(useAuth0).mockReturnValue({
      user: mockUser,
    } as any);
  });

  it('renders user information', () => {
    render(<Profile />);

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByAltText(mockUser.name)).toHaveAttribute('src', mockUser.picture);
  });

  it('shows email verification status', () => {
    render(<Profile />);
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  it('uses avatar placeholder when no picture is provided', () => {
    vi.mocked(useAuth0).mockReturnValue({
      user: { ...mockUser, picture: undefined },
    } as any);

    render(<Profile />);
    expect(screen.getByAltText(mockUser.name)).toHaveAttribute(
      'src',
      `https://ui-avatars.com/api/?name=${mockUser.name}`
    );
  });
});