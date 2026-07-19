import { useEffect, useState } from "react";

export function useToast() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message) return;

    const timer = window.setTimeout(() => setMessage(""), 2800);
    return () => window.clearTimeout(timer);
  }, [message]);

  return {
    message,
    showToast: setMessage,
  };
}
