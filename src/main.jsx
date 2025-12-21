import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          color: '#ff6b6b',
          background: '#1a1a1a',
          minHeight: '100vh',
          fontFamily: 'monospace'
        }}>
          <h2>The Chronicle has encountered an error:</h2>
          <pre style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#000',
            borderRadius: '8px',
            overflow: 'auto'
          }}>
            {this.state.error?.toString()}
          </pre>
          <p style={{ marginTop: '1rem', opacity: 0.7 }}>
            Check the console for more details.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
