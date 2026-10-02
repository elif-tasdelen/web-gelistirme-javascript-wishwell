import { useState } from 'react'
import { PRIORITIES } from '../interfaces/wish'
import WishEditForm from './WishEditForm'

const PRIORITY_STYLES = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-green-100 text-green-700',
}

const formatTL = (n) => `${n.toLocaleString('tr-TR')} ₺`

export default function WishItem({ wish, balance, onBuy, onUndo, onUpdate, onRemove }) {
  const [editing, setEditing] = useState(false)

  const purchased = Boolean(wish.purchasedAt)
  const percent = Math.min(100, Math.round((balance / wish.price) * 100))
  const affordable = balance >= wish.price

  function handleRemove() {
    if (window.confirm(`"${wish.title}" silinsin mi?`)) onRemove(wish.id)
  }

  function handleBuy() {
    if (window.confirm(`"${wish.title}" için kumbaradan ${formatTL(wish.price)} kullanılsın mı?`)) {
      onBuy(wish)
    }
  }

  function handleSave(changes) {
    onUpdate(wish.id, changes)
    setEditing(false)
  }

  if (purchased) {
    return (
      <li className="bg-white/70 rounded-2xl p-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-medium text-gray-500 line-through">{wish.title}</h3>
          <p className="text-xs text-gray-400">
            {formatTL(wish.price)} · {new Date(wish.purchasedAt).toLocaleDateString('tr-TR')} tarihinde alındı
          </p>
        </div>
        <div className="flex gap-3 text-sm shrink-0">
          <button type="button" onClick={() => onUndo(wish)} className="text-gray-500 hover:text-gray-700">
            Geri al
          </button>
          <button type="button" onClick={handleRemove} className="text-red-600 hover:text-red-800">
            Sil
          </button>
        </div>
      </li>
    )
  }

  if (editing) {
    return (
      <li className="bg-white rounded-2xl shadow p-4 ring-2 ring-pink-300">
        <WishEditForm wish={wish} onSave={handleSave} onCancel={() => setEditing(false)} />
      </li>
    )
  }

  return (
    <li className="bg-white rounded-2xl shadow p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-800">{wish.title}</h3>
          <p className="text-sm text-gray-500">{formatTL(wish.price)}</p>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${PRIORITY_STYLES[wish.priority]}`}>
          {PRIORITIES[wish.priority]}
        </span>
      </div>

      <div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${affordable ? 'bg-green-500' : 'bg-pink-500'}`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {affordable ? 'Kumbaradaki para yetiyor 🎉' : `Kumbara: %${percent} hazır`}
        </p>
      </div>

      <div className="flex justify-end items-center gap-4 text-sm">
        <button type="button" onClick={handleRemove} className="text-red-600 hover:text-red-800">
          Sil
        </button>
        <button type="button" onClick={() => setEditing(true)} className="text-gray-600 hover:text-gray-800">
          Düzenle
        </button>
        <button
          type="button"
          onClick={handleBuy}
          disabled={!affordable}
          className="bg-green-600 text-white rounded-lg px-3 py-1 font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Satın al
        </button>
      </div>
    </li>
  )
}