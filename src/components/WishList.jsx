import WishItem from './WishItem'

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

export default function WishList({ wishes, balance, onBuy, onUndo, onUpdate, onRemove }) {
  const active = wishes
    .filter((w) => !w.purchasedAt)
    .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority] || a.price - b.price)

  const purchased = wishes
    .filter((w) => w.purchasedAt)
    .sort((a, b) => b.purchasedAt.localeCompare(a.purchasedAt))

      const itemProps = { balance, onBuy, onUndo, onUpdate, onRemove }

  return (
    <>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">İsteklerim ({active.length})</h2>
        {active.length === 0 ? (
          <p className="text-center text-gray-500">Aktif istek yok. Yukarıdan yeni bir istek ekle ✨</p>
        ) : (
          <ul className="space-y-3">
            {active.map((wish) => <WishItem key={wish.id} wish={wish} {...itemProps} />)}
          </ul>
        )}
      </section>

      {purchased.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Alınanlar 🛍️ ({purchased.length})</h2>
          <ul className="space-y-2">
            {purchased.map((wish) => <WishItem key={wish.id} wish={wish} {...itemProps} />)}
          </ul>
        </section>
      )}
    </>
  )
}