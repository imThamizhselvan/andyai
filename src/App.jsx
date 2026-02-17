import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut, SignIn, SignUp, useAuth } from '@clerk/clerk-react'
import { setGetToken } from './lib/api'
import MarketingLayout from './layouts/MarketingLayout'
import AppLayout from './layouts/AppLayout'
import Home from './pages/Home'
import HowItWorksPage from './pages/HowItWorksPage'
import DemosPage from './pages/DemosPage'
import PricingPage from './pages/PricingPage'
import ContactPage from './pages/ContactPage'
import Dashboard from './app/Dashboard'
import Calls from './app/Calls'
import CallDetail from './app/CallDetail'
import Settings from './app/Settings'
import Billing from './app/Billing'
import Onboarding from './app/Onboarding'

function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to="/sign-in" replace />
      </SignedOut>
    </>
  )
}

function TokenProvider({ children }) {
  const { getToken } = useAuth()
  useEffect(() => {
    setGetToken(getToken)
  }, [getToken])
  return children
}

function App() {
  return (
    <TokenProvider>
    <Routes>
      {/* Marketing Pages */}
      <Route
        path="/"
        element={
          <MarketingLayout>
            <Home />
          </MarketingLayout>
        }
      />
      <Route
        path="/how-it-works"
        element={
          <MarketingLayout>
            <HowItWorksPage />
          </MarketingLayout>
        }
      />
      <Route
        path="/demos"
        element={
          <MarketingLayout>
            <DemosPage />
          </MarketingLayout>
        }
      />
      <Route
        path="/pricing"
        element={
          <MarketingLayout>
            <PricingPage />
          </MarketingLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <MarketingLayout>
            <ContactPage />
          </MarketingLayout>
        }
      />

      {/* Auth Pages */}
      <Route
        path="/sign-in/*"
        element={
          <div className="min-h-screen bg-navy flex items-center justify-center">
            <SignIn routing="path" path="/sign-in" afterSignInUrl="/app" />
          </div>
        }
      />
      <Route
        path="/sign-up/*"
        element={
          <div className="min-h-screen bg-navy flex items-center justify-center">
            <SignUp routing="path" path="/sign-up" afterSignUpUrl="/app/onboarding" />
          </div>
        }
      />

      {/* Onboarding (no sidebar) */}
      <Route
        path="/app/onboarding"
        element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        }
      />

      {/* App Pages (with sidebar) */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/calls"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Calls />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/calls/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <CallDetail />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/settings"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Settings />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/billing"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Billing />
            </AppLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
    </TokenProvider>
  )
}

export default App
