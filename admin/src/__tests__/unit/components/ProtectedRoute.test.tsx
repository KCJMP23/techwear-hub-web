import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('ProtectedRoute', () => {
  const mockUseSession = useSession as jest.MockedFunction<typeof useSession>
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

  beforeEach(() => {
    mockUseSession.mockClear()
    mockUseRouter.mockClear()
  })

  it('renders children when user is authenticated', () => {
    mockUseSession.mockReturnValue({
      data: { user: { email: 'test@example.com' } },
      status: 'authenticated',
    })

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('shows loading state when session is loading', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
    })

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('redirects to signin when user is not authenticated', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    })

    const mockPush = jest.fn()
    mockUseRouter.mockReturnValue({
      push: mockPush,
    } as ReturnType<typeof useRouter>)

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(mockPush).toHaveBeenCalledWith('/auth/signin')
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })
}) 