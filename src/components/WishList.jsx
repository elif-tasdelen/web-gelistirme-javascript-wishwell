import WishItem from './WishItem'
import { getActiveWishes, getFulfilledWishes } from '../utils/wishes'

const TILTS = ['-rotate-1', 'rotate-1', 'rotate-0', '-rotate-2']

export default function WishList({ wishes, balance, onBuy, onUndo, onUpdate, onRemove }) {
  const active = getActiveWishes(wishes)
  const fulfilled = getFulfilledWishes(wishes)
  const itemProps = { balance, onBuy, onUndo, onUpdate, onRemove }

  return (
    <>
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-700">Dileklerim ({active.length})</h2>
        {active.length === 0 ? (
          <p className="text-center text-slate-500">Henüz dilek yok. Yukarıdan ilk dileğini tut.</p>
        ) : (
          <ul className="grid sm:grid-cols-2 gap-5">
            {active.map((wish, i) => (
              <WishItem key={wish.id} wish={wish} tilt={TILTS[i % TILTS.length]} {...itemProps} />
            ))}
          </ul>
        )}
      </section>

      {fulfilled.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-700">Gerçekleşenler ({fulfilled.length})</h2>
          <ul className="grid sm:grid-cols-2 gap-5">
            {fulfilled.map((wish, i) => (
              <WishItem key={wish.id} wish={wish} tilt={TILTS[i % TILTS.length]} {...itemProps} />
            ))}
          </ul>
        </section>
      )}
    </>
  )
}