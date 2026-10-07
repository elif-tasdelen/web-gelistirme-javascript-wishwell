import AppHeader from '../components/AppHeader'
import PiggyBank from '../components/PiggyBank'
import WishForm from '../components/WishForm'
import WishList from '../components/WishList'
import { usePiggyBank } from '../hooks/usePiggyBank'
import { useWishes } from '../hooks/useWishes'
import { getActiveWishes } from '../utils/wishes'
import SettingsMenu from '../components/SettingsMenu'

export default function HomePage() {
  const { wishes, addWish, updateWish, removeWish } = useWishes()
  const { balance, deposit, withdraw, reset: resetBalance } = usePiggyBank()
  const nextWish = getActiveWishes(wishes)[0]

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
    <main className="min-h-screen bg-linear-to-b from-sand-50 via-lagoon-50 to-sage-100 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
                <div className="relative">
          <AppHeader />
          <div className="absolute right-0 top-0">
            <SettingsMenu balance={balance} onResetBalance={resetBalance} />
          </div>
        </div>
        <PiggyBank balance={balance} nextWish={nextWish} onDeposit={deposit} />
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