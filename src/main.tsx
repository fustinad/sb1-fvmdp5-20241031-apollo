import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import { AuthProvider } from './lib/auth';
import { ThemeProvider } from './components/ThemeProvider';
import { client } from './lib/graphql/client';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>
);