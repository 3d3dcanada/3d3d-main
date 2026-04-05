import { useEffect, useState } from 'react';
import QuoteDrawer from './QuoteDrawer';

export default function QuoteDrawerIsland() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-quote-drawer', handler);
    return () => window.removeEventListener('open-quote-drawer', handler);
  }, []);

  return <QuoteDrawer isOpen={open} onClose={() => setOpen(false)} />;
}
