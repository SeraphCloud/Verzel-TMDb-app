import React from "react";
import "./index.scss";

/**
 * ErrorBoundary - Componente para capturar e tratar erros JavaScript
 *
 * Funcionalidades principais:
 * - Captura erros não tratados nos componentes filhos
 * - Exibe interface amigável ao usuário em caso de erro
 * - Log estruturado de erros para debugging
 * - Possibilidade de tentar recuperar da falha
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o state para que a próxima renderização mostre a UI de fallback
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log estruturado do erro
    console.error("Erro capturado pelo ErrorBoundary:", {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // UI de fallback personalizada
      return (
        <div className="error-boundary">
          <div className="error-content">
            <h2>Ops! Algo deu errado</h2>
            <p>
              Desculpe pelo inconveniente. Ocorreu um erro inesperado na
              aplicação.
            </p>

            <div className="error-actions">
              <button className="retry-btn" onClick={this.handleRetry}>
                Tentar Novamente
              </button>
              <button
                className="reload-btn"
                onClick={() => window.location.reload()}
              >
                Recarregar Página
              </button>
            </div>

            {import.meta.env.MODE === "development" && (
              <details className="error-details">
                <summary>Detalhes do erro (desenvolvimento)</summary>
                <pre className="error-stack">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
