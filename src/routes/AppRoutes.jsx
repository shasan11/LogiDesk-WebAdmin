import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import DashboardSectionPage from '../pages/DashboardSectionPage';
import { AuthenticatedRoutes, UnauthenticatedRoutes } from './RouteGuards';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<UnauthenticatedRoutes />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      <Route element={<AuthenticatedRoutes />}>
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route
            path="home"
            element={<DashboardSectionPage title="Home" description="Welcome to LogiDesk dashboard home." />}
          />
          <Route
            path="shipment"
            element={
              <DashboardSectionPage
                title="Shipment"
                description="Track and manage shipments, delivery status, and shipment records."
              />
            }
          />
          <Route
            path="accounting/chart-of-accounts"
            element={<DashboardSectionPage title="Chart of Accounts" description="Configure and maintain your account heads." />}
          />
          <Route
            path="accounting/bank-accounts"
            element={<DashboardSectionPage title="Bank Accounts" description="Manage available bank accounts for transactions." />}
          />
          <Route
            path="accounting/cheque-register"
            element={<DashboardSectionPage title="Cheque Register" description="Record and monitor incoming and outgoing cheques." />}
          />
          <Route
            path="accounting/cash-transfer"
            element={<DashboardSectionPage title="Cash Transfer" description="Create and track internal cash transfer entries." />}
          />
          <Route
            path="accounting/journal-voucher"
            element={<DashboardSectionPage title="Journal Voucher" description="Post journal vouchers and review ledger entries." />}
          />
          <Route
            path="profile"
            element={<DashboardSectionPage title="Profile" description="Manage your account profile and personal details." />}
          />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
