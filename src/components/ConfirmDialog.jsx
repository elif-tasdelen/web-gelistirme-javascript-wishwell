import { useEffect } from 'react'

export default function ConfirmDialog({ open, title, message, confirmLabel = 'Onayla', onConfirm, onCancel }) {
  useEffect(() => {
    if (!open) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="dialog-backdrop absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={onCancel} />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="dialog-panel relative w-full max-w-sm bg-white rounded-2xl shadow-xl ring-1 ring-sand-200 p-6 space-y-4"
      >
        <h2 id="confirm-title" className="text-lg font-bold text-slate-800">{title}</h2>
        <p className="text-slate-600">{message}</p>
        <div className="flex justify-end gap-3">
          <button type="button" autoFocus onClick={onCancel}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
            Vazgeç
          </button>
          <button type="button" onClick={onConfirm}
                  className="px-4 py-2 rounded-lg bg-rose-500 text-white font-semibold hover:bg-rose-600 transition-colors">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}