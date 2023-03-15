import { useEffect, useState } from "react";

function UseLocalStorage(itemName, initialValue) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [item, setItem] = useState(initialValue);
  useEffect(() => {
    setTimeout(() => {
      try {
        setItem(JSON.parse(localStorage.getItem(itemName)) || initialValue);
        setLoading(false);
      } catch (e) {
        setError(e);
        console.log(e);
      }
    }, 1000);
  });
  const saveItem = (newItem) => {
    try {
      localStorage.setItem(itemName, JSON.stringify(newItem));
      setItem(newItem);
    } catch (e) {
      setError(e);
      console.log(e);
    }
  };
  return { item, saveItem, loading, error };
}
export { UseLocalStorage };
