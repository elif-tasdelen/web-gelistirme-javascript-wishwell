import PiggyBank from '../components/PiggyBank'
import WishForm from '../components/WishForm'
import WishList from '../components/WishList'
import { usePiggyBank } from '../hooks/usePiggyBank'
import { useWishes } from '../hooks/useWishes'

export default function HomePage() {
  const { wishes, addWish, updateWish, removeWish } = useWishes()
  const { balance, deposit, withdraw } = usePiggyBank()

  function buyWish(wish) {
    if (balance < wish.price) return
    withdraw(wish.price)
    updateWish(wish.id, { purchasedAt: new Date().toISOString() })
  }

  function undoPurchase(wish) {
    deposit(wish.price)
    updateWish(wish.id, { purchasedAt: null })
  }

  return (
    <main className="min-h-screen bg-pink-50 py-10 px-4">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-pink-600">Wishlist 🎁</h1>
        <PiggyBank balance={balance} onDeposit={deposit} />
        <WishForm onAdd={addWish} />
        <WishList
          wishes={wishes}
          balance={balance}
          onBuy={buyWish}
          onUndo={undoPurchase}
          onUpdate={updateWish}
          onRemove={removeWish}
        />
      </div>
    </main>
  )
}