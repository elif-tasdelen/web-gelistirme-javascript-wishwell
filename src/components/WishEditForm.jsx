import { useState } from 'react'
import { PRIORITIES } from '../interfaces/wish'

export default function WishEditForm({ wish, onSave, onCancel }) {
  const [title, setTitle] = useState(wish.title)
  const [price, setPrice] = useState(String(wish.price))
  const [priority, setPriority] = useState(wish.priority)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = title.trim()
    const priceNum = Number(price)
    if (!trimmed || !(priceNum > 0)) {
      setError("İstek adı ve 0'dan büyük bir fiyat girmelisin.")
      return
    }
    onSave({ title: trimmed, price: priceNum, priority })
  }

  const inputClass =
    'w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-lagoon-500'

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input value={title} onChange={(e) => setTitle(e.target.value)}
             className={inputClass} autoFocus />

      <div className="grid grid-cols-2 gap-3">
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
               className={inputClass} />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}
                className={inputClass}>
          {Object.entries(PRIORITIES).map(([value, label]) => (
            <option key={value} value={value}>{label} öncelik</option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end items-center gap-4 text-sm">
        <button type="button" onClick={onCancel} className="text-gray-500 hover:text-gray-700">
          İptal
        </button>
        <button type="submit"
                className="bg-lagoon-600 text-white rounded-lg px-3 py-1 font-medium hover:bg-lagoon-700">
          Kaydet
        </button>
      </div>
    </form>
  )
}