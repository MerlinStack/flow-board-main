import { createContext, useContext, useCallback, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((msg, type = 'info') => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Toast stack */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <Snackbar
            key={t.id}
            open={true}
            autoHideDuration={3500}
            onClose={() => setToasts((s) => s.filter((x) => x.id !== t.id))}
            className="pointer-events-auto"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert
              severity={t.type === 'warn' ? 'warning' : t.type}
              variant="filled"
              onClose={() => setToasts((s) => s.filter((x) => x.id !== t.id))}
              sx={{
                backgroundColor: 'rgb(30, 30, 46) !important',
                color: '#f0eff8',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {t.msg}
            </Alert>
          </Snackbar>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
