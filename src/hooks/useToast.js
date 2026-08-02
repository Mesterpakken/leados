import { useState } from 'react';

export default function useToast(duration = 2200) {
  const [toast, setToast] = useState('');

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), duration);
  }

  return { toast, notify };
}
