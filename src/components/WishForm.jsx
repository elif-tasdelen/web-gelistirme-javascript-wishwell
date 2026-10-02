import { useState } from 'react'
import { PRIORITIES } from '../interfaces/wish'

export default function WishForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [priority, setPriority] = useState('medium')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = title.trim()
    const priceNum = Number(price)
    if (!trimmed || !(priceNum > 0)) {
      setError("İstek adı ve 0'dan büyük bir fiyat girmelisin.")
      return
    }
    onAdd({ title: trimmed, price: priceNum, priority })
    setTitle('')
    setPrice('')
    setPriority('medium')
    setError('')
  }

  const inputClass =
    'w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-pink-500'

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Yeni istek</h2>

      <input value={title} onChange={(e) => setTitle(e.target.value)}
             placeholder="Ne almak istiyorsun?" className={inputClass} />

      <div className="grid grid-cols-2 gap-3">
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
               placeholder="Fiyat (₺)" className={inputClass} />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}
                className={inputClass}>
          {Object.entries(PRIORITIES).map(([value, label]) => (
            <option key={value} value={value}>{label} öncelik</option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit"
              className="w-full bg-pink-600 text-white rounded-lg py-2 font-medium hover:bg-pink-700">
        Ekle
      </button>
    </form>
  )
}