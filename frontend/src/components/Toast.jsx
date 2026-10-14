import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-live="polite" aria-label="Notifications">
      {toasts.map((toast) => {
        const Icon = toast.type === 'error' ? AlertCircle : toast.type === 'info' ? Info : CheckCircle2;
        return (
          <div key={toast.id} className="toast" role="alert">
            <Icon size={20} color={toast.type === 'error' ? '#FF6B6B' : '#74C69D'} />
            <span>{toast.message}</span>
            <button
              onClick={() => onDismiss(toast.id)}
              style={{ marginLeft: 'auto', background: 'transparent', color: 'rgba(255,255,255,0.7)', padding: '2px' }}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
