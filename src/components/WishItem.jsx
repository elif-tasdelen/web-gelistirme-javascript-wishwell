import { useState } from 'react'
import { PRIORITIES } from '../interfaces/wish'
import WishEditForm from './WishEditForm'

const PRIORITY_STYLES = {
  high: 'bg-rose-100 text-rose-700',
  medium: 'bg-honey-100 text-honey-700',
  low: 'bg-lagoon--100 text-lagoon--700',
}

const formatTL = (n) => `${n.toLocaleString('tr-TR')} ₺`

const noteBase = 'paper relative overflow-hidden rounded-lg p-5 transition-all duration-300'

function FoldedCorner() {
  return (
    <span aria-hidden="true"
          className="absolute top-0 right-0 w-7 h-7 bg-honey-100 rounded-bl-xl shadow-sm" />
  )
}

export default function WishItem({ wish, tilt, balance, onBuy, onUndo, onUpdate, onRemove }) {
  const [editing, setEditing] = useState(false)

  const fulfilled = Boolean(wish.purchasedAt)
  const percent = Math.min(100, Math.round((balance / wish.price) * 100))
  const affordable = balance >= wish.price

  function handleRemove() {
    if (window.confirm(`"${wish.title}" silinsin mi?`)) onRemove(wish.id)
  }

  function handleBuy() {
    if (window.confirm(`"${wish.title}" için çeşmeden ${formatTL(wish.price)} kullanılarak gerçekleştirilsin mi?`)) {
      onBuy(wish)
    }
  }

  function handleSave(changes) {
    onUpdate(wish.id, changes)
    setEditing(false)
  }

  if (fulfilled) {
    return (
      <li className={`${noteBase} shadow-sm opacity-75 ${tilt}`}>
        <span className="absolute top-3 right-3 rotate-12 border-2 border-lagoon-500 text-lagoon-600 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded">
          Gerçekleşti
        </span>
        <h3 className="font-hand text-3xl leading-tight text-slate-500 line-through pr-24">{wish.title}</h3>
        <p className="text-xs text-slate-400">
          {formatTL(wish.price)} · {new Date(wish.purchasedAt).toLocaleDateString('tr-TR')} tarihinde gerçekleşti
        </p>
        <div className="flex justify-end gap-4 text-sm mt-3">
          <button type="button" onClick={() => onUndo(wish)} className="text-slate-500 hover:text-slate-700">
            Geri al
          </button>
          <button type="button" onClick={handleRemove} className="text-rose-500 hover:text-rose-700">
            Sil
          </button>
        </div>
      </li>
    )
  }

  if (editing) {
    return (
      <li className={`${noteBase} shadow-lg shadow-lagoon--100 ring-2 ring-lagoon-300`}>
        <WishEditForm wish={wish} onSave={handleSave} onCancel={() => setEditing(false)} />
      </li>
    )
  }

  return (
    <li className={`${noteBase} paper-in shadow-md shadow-lagoon--100 space-y-3 hover:rotate-0 hover:-translate-y-1 hover:shadow-lg ${tilt}`}>
      <FoldedCorner />

      <div className="flex items-start justify-between gap-3 pr-6">
        <div>
          <h3 className="font-hand text-3xl leading-tight text-slate-700">{wish.title}</h3>
          <p className="text-sm text-slate-500">{formatTL(wish.price)}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full shrink-0 ${PRIORITY_STYLES[wish.priority]}`}>
          {PRIORITIES[wish.priority]}
        </span>
      </div>

      <div>
        <div className="h-2 bg-lagoon--100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${affordable ? 'bg-sage-400' : 'bg-lagoon-400'}`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          {affordable ? 'Çeşmedeki birikim yetiyor' : `Çeşme %${percent} dolu`}
        </p>
      </div>

      <div className="flex justify-end items-center gap-4 text-sm">
        <button type="button" onClick={handleRemove} className="text-rose-500 hover:text-rose-700">
          Sil
        </button>
        <button type="button" onClick={() => setEditing(true)} className="text-slate-500 hover:text-slate-700">
          Düzenle
        </button>
        <button
          type="button"
          onClick={handleBuy}
          disabled={!affordable}
          className="bg-lagoon-600 text-white rounded-lg px-3 py-1 font-semibold hover:bg-lagoon-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
        >
          Gerçekleştir
        </button>
      </div>
    </li>
  )
}