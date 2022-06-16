import React, { lazy, Suspense } from 'react';
import { DashboardProps } from './Dashboard';

const LazyDashboard = lazy(() => import('./Dashboard'));

const Dashboard = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode } & DashboardProps,
) => (
  <Suspense fallback={null}>
    <LazyDashboard {...props} />
  </Suspense>
);

export default Dashboard;
