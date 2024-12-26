'use client';

import { store } from '@/redux/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

interface PageProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: PageProps) {
  return <Provider store={store}>{children}</Provider>;
}
