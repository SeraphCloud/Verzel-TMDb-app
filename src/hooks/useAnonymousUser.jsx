import { useEffect, useState } from "react";

const USER_ID_KEY = "movie_app_user_id";

export const useAnonymousUser = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let storeId = localStorage.getItem(USER_ID_KEY);

    if (storeId) {
      setUserId(storeId);
    } else {
      const newId = crypto.randomUUID();
      localStorage.setItem(USER_ID_KEY, newId);
      setUserId(newId);
    }
  }, []);

  return { userId };
};
