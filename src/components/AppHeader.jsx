import WellIcon from './WellIcon'

export default function AppHeader() {
  return (
    <header className="text-center space-y-2">
      <div className="inline-flex items-center gap-3">
        <span className="grid place-items-center w-12 h-12 rounded-2xl bg-linear-to-br from-lagoon-400 to-lagoon-600 text-white shadow-lg shadow-lagoon-200">
          <WellIcon className="w-7 h-7" />
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-lagoon-700 via-lagoon-600 to-lagoon-500 bg-clip-text text-transparent">
          WishWell
        </h1>
      </div>
      <p className="text-slate-500">Bir para at, bir dilek tut.</p>
    </header>
  )
}