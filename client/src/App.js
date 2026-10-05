import React from 'react';
import Main from './Components/Main/Main';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Theme } from './Theme';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
