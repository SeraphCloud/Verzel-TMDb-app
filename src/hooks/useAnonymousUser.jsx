/**
 * Hook personalizado para gerenciamento de usuário anônimo
 *
 * Responsabilidades:
 * - Gera e armazena um ID único para usuários não autenticados
 * - Persiste o ID no localStorage para sessões futuras
 * - Fornece ID consistente para funcionalidades que requerem identificação
 *
 * Utilizado principalmente para:
 * - Sistema de favoritos (cada usuário tem seus próprios favoritos)
 * - Compartilhamento de listas (identifica dono da lista)
 *
 * @returns {Object} Objeto contendo o userId atual
 */
import { useEffect, useState } from "react";

// Chave utilizada para armazenar o ID do usuário no localStorage
const USER_ID_KEY = "movie_app_user_id";

export const useAnonymousUser = () => {
  // Estado que armazena o ID do usuário atual
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Tenta recuperar ID existente do localStorage
    let storeId = localStorage.getItem(USER_ID_KEY);

    if (storeId) {
      // ID encontrado - utiliza o existente
      setUserId(storeId);
    } else {
      // ID não encontrado - gera novo ID único
      const newId = crypto.randomUUID();
      localStorage.setItem(USER_ID_KEY, newId);
      setUserId(newId);
    }
  }, []); // Executa apenas uma vez na montagem do componente

  // Retorna objeto com o ID do usuário
  return { userId };
};
