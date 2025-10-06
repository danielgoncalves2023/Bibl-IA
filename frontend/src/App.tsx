import { Auth0ProviderWithHistory } from './auth/Auth0ProviderWithHistory';
import { AppRouter } from './router/AppRouter';
import './index.css';

function App() {
  return (
    <Auth0ProviderWithHistory>
      <AppRouter />
    </Auth0ProviderWithHistory>
  );
}

export default App;
