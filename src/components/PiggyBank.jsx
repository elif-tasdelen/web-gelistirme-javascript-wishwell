import { useRef, useState } from 'react'
import WishingFountain from './WishingFountain'

const PRESETS = [50, 100, 250]
const formatTL = (n) => `${n.toLocaleString('tr-TR')} ₺`

export default function PiggyBank({ balance, nextWish, onDeposit }) {
  const [preset, setPreset] = useState(50)
  const [custom, setCustom] = useState('')
  const [flight, setFlight] = useState(null)
  const [landed, setLanded] = useState(null)
  const [coinKey, setCoinKey] = useState(0)
  const coinRef = useRef(null)
  const targetRef = useRef(null)

  const customValue = Number(custom)
  const amount = customValue > 0 ? customValue : preset
  const progress = nextWish ? Math.min(1, balance / nextWish.price) : 0
  const glowing = Boolean(nextWish) && progress >= 1

  function throwCoin() {
    if (flight) return
    const from = coinRef.current.getBoundingClientRect()
    const to = targetRef.current.getBoundingClientRect()
    setFlight({
      dx: to.left + to.width / 2 - (from.left + from.width / 2),
      dy: to.top + to.height / 2 - (from.top + from.height / 2),
      value: amount,
    })
  }

  function handleAnimationEnd(e) {
    if (e.animationName !== 'coin-fly') return
    onDeposit(flight.value)
    setLanded({ id: Date.now(), value: flight.value })
    setFlight(null)
    setCustom('')
    setCoinKey((k) => k + 1)
  }

  return (
    <section className="bg-white/70 backdrop-blur rounded-3xl ring-1 ring-sand-200 shadow-lg shadow-lagoon-100 p-6 space-y-5">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
        <div className="relative">
          <WishingFountain glowing={glowing} dropId={landed?.id} />
          <div ref={targetRef} className="absolute left-[37%] top-[77%] w-1 h-1" aria-hidden="true" />
          {landed && (
            <span
              key={`label-${landed.id}`}
              className="float-up absolute left-[28%] top-[50%] text-sm font-bold text-honey-500"
            >
              +{formatTL(landed.value)}
            </span>
          )}
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className={flight ? '' : 'coin-idle'}>
            <button
              key={coinKey}
              ref={coinRef}
              type="button"
              onClick={throwCoin}
              onAnimationEnd={handleAnimationEnd}
              disabled={Boolean(flight)}
              aria-label={`Çeşmeye ${formatTL(amount)} at`}
              style={flight ? { '--dx': `${flight.dx}px`, '--dy': `${flight.dy}px` } : undefined}
              className={`group relative z-10 block w-20 h-20 rounded-full outline-none focus-visible:ring-4 focus-visible:ring-lagoon-300 transition-[scale,rotate,translate] duration-200 ease-out ${
                flight
                  ? 'coin-fly'
                  : 'coin-in cursor-pointer hover:scale-110 hover:-rotate-6 hover:-translate-y-1 active:scale-95'
              }`}
            >
              <span
                className={`absolute inset-0 grid place-items-center overflow-hidden rounded-full bg-radial-[at_30%_25%] from-honey-100 via-honey-300 to-honey-500 ring-4 ring-honey-200 shadow-lg shadow-honey-300/50 text-honey-900 ${
                  flight ? 'coin-flip' : ''
                }`}
              >
                <span className="absolute inset-2 rounded-full border-2 border-honey-100/80" aria-hidden="true" />
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-white/50 -translate-x-full group-hover:translate-x-[350%] transition-transform duration-700 ease-out"
                />
                <span className="relative text-sm font-extrabold leading-tight text-center">
                  {amount.toLocaleString('tr-TR')}
                  <br />₺
                </span>
              </span>
            </button>
          </div>
          <p className="text-xs text-slate-500">Paraya dokun, çeşmeye atılsın</p>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-slate-500">Çeşmedeki birikim</p>
        <p className="text-3xl font-extrabold text-lagoon-600">{formatTL(balance)}</p>
      </div>

      {nextWish && (
        <div className="max-w-sm mx-auto">
          <div className="h-2 bg-lagoon-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${glowing ? 'bg-sage-400' : 'bg-lagoon-400'}`}
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1 text-center">
            {glowing
              ? `"${nextWish.title}" için yeterli birikim var`
              : `Sıradaki dilek: ${nextWish.title} · %${Math.round(progress * 100)}`}
          </p>
        </div>
      )}

      <div className="flex flex-wrap justify-center items-center gap-2">
        {PRESETS.map((value) => {
          const active = !(customValue > 0) && preset === value
          return (
            <button
              key={value}
              type="button"
              onClick={() => {
                setPreset(value)
                setCustom('')
              }}
              className={`px-4 py-1.5 rounded-full font-semibold transition-colors ${
                active ? 'bg-honey-300 text-honey-950' : 'bg-honey-100 text-honey-700 hover:bg-honey-200'
              }`}
            >
              {value} ₺
            </button>
          )
        })}
        <input
          type="number"
          min="1"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="Diğer"
          className={`w-24 rounded-full border px-3 py-1.5 text-center focus:outline-lagoon-400 ${
            customValue > 0 ? 'border-honey-300 bg-honey-50' : 'border-sand-300 bg-white/60'
          }`}
        />
      </div>
    </section>
  )
}