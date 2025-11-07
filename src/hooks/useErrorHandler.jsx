import { useCallback } from "react";

/**
 * Hook personalizado para tratamento estruturado de erros
 *
 * Funcionalidades principais:
 * - Log estruturado de erros com contexto
 * - Categorização de tipos de erro
 * - Possibilidade de callback customizado
 * - Suporte a métricas/analytics no futuro
 */
const useErrorHandler = () => {
  const handleError = useCallback(
    (error, context = {}, customCallback = null) => {
      // Log estruturado do erro
      const errorLog = {
        message: error.message || "Erro desconhecido",
        stack: error.stack,
        context: {
          ...context,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        },
      };

      // Log no console (apenas em desenvolvimento)
      if (import.meta.env.MODE === "development") {
        console.error("Erro tratado:", errorLog);
      }

      // TODO: Enviar para serviço de monitoramento (Sentry, LogRocket, etc.)
      // sendToMonitoringService(errorLog);

      // Executar callback customizado se fornecido
      if (customCallback && typeof customCallback === "function") {
        try {
          customCallback(error, errorLog);
        } catch (callbackError) {
          console.error("Erro no callback customizado:", callbackError);
        }
      }

      return errorLog;
    },
    []
  );

  // Método específico para erros de API
  const handleApiError = useCallback(
    (error, operation = "unknown", customCallback = null) => {
      return handleError(
        error,
        {
          type: "api_error",
          operation,
          status: error.response?.status,
          statusText: error.response?.statusText,
          endpoint: error.config?.url,
        },
        customCallback
      );
    },
    [handleError]
  );

  // Método específico para erros de UI/interação
  const handleUIError = useCallback(
    (
      error,
      component = "unknown",
      action = "unknown",
      customCallback = null
    ) => {
      return handleError(
        error,
        {
          type: "ui_error",
          component,
          action,
        },
        customCallback
      );
    },
    [handleError]
  );

  return {
    handleError,
    handleApiError,
    handleUIError,
  };
};

export default useErrorHandler;
