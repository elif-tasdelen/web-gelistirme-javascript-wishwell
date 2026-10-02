import { useState } from 'react'

const QUICK_AMOUNTS = [50, 100, 250]

export default function PiggyBank({ balance, onDeposit }) {
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [bounce, setBounce] = useState(false)

  function deposit(value) {
    if (!(value > 0)) {
      setError("Önce 0'dan büyük bir tutar yaz.")
      return
    }
    onDeposit(value)
    setAmount('')
    setError('')
    setBounce(true)
    setTimeout(() => setBounce(false), 300)
  }

  return (
    <section className="bg-white rounded-2xl shadow p-6 text-center space-y-4">
      <button
        type="button"
        onClick={() => deposit(Number(amount))}
        aria-label="Kumbaraya at"
        className={`text-7xl transition-transform duration-300 ${
          bounce ? 'scale-125 -rotate-12' : 'hover:scale-110'
        }`}
      >
        🐷
      </button>

      <div>
        <p className="text-sm text-gray-500">Kumbara bakiyesi</p>
        <p className="text-3xl font-bold text-pink-600">
          {balance.toLocaleString('tr-TR')} ₺
        </p>
      </div>

      <div className="flex justify-center gap-2">
        {QUICK_AMOUNTS.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => deposit(value)}
            className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200"
          >
            +{value} ₺
          </button>
        ))}
      </div>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Başka bir tutar yaz, sonra 🐷'ye tıkla"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-pink-500"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </section>
  )
}