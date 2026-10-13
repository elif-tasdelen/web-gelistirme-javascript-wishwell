import { useEffect, useRef, useState } from 'react'
import { Settings } from 'lucide-react'
import ConfirmDialog from './ConfirmDialog'

const formatTL = (n) => `${n.toLocaleString('tr-TR')} ₺`

export default function SettingsMenu({ balance, onResetBalance }) {
  const [open, setOpen] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const handleClick = (e) => {
      if (!menuRef.current.contains(e.target)) setOpen(false)
    }
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  function handleConfirm() {
    onResetBalance()
    setConfirming(false)
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Ayarlar"
        aria-expanded={open}
        className={`grid place-items-center w-10 h-10 rounded-full bg-white/80 ring-1 ring-sand-200 shadow-sm text-lagoon-700 hover:bg-white transition-[rotate,background-color] duration-300 ${
          open ? 'rotate-90' : ''
        }`}
      >
        <Settings className="w-5 h-5" />
      </button>

      {open && (
        <div className="menu-in absolute right-0 mt-2 w-64 z-40 bg-white rounded-2xl shadow-xl ring-1 ring-sand-200 p-2">
          <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Ayarlar</p>
          <button
            type="button"
            disabled={balance === 0}
            onClick={() => {
              setOpen(false)
              setConfirming(true)
            }}
            className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed"
          >
            <span className="block font-semibold text-rose-600">Birikimi sıfırla</span>
            <span className="block text-xs text-slate-500">Çeşmedeki birikim silinir</span>
          </button>
        </div>
      )}

      <ConfirmDialog
        open={confirming}
        title="Birikimi sıfırla"
        message={`Çeşmedeki ${formatTL(balance)} birikim sıfırlanacak ve bu işlem geri alınamaz. Sıfırlamak istediğinize emin misiniz?`}
        confirmLabel="Evet, sıfırla"
        onConfirm={handleConfirm}
        onCancel={() => setConfirming(false)}
      />
    </div>
  )
}