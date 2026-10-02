import PiggyBank from '../components/PiggyBank'
import WishForm from '../components/WishForm'
import { usePiggyBank } from '../hooks/usePiggyBank'
import { useWishes } from '../hooks/useWishes'

export default function HomePage() {
  const { wishes, addWish } = useWishes()
  const { balance, deposit } = usePiggyBank()

  return (
    <main className="min-h-screen bg-pink-50 py-10 px-4">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-pink-600">Wishlist 🎁</h1>
        <PiggyBank balance={balance} onDeposit={deposit} />
        <WishForm onAdd={addWish} />
        <p className="text-gray-600">Toplam {wishes.length} istek</p>
      </div>
    </main>
  )
}