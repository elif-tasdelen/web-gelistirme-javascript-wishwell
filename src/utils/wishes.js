const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

export function getActiveWishes(wishes) {
  return wishes
    .filter((w) => !w.purchasedAt)
    .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority] || a.price - b.price)
}

export function getFulfilledWishes(wishes) {
  return wishes
    .filter((w) => w.purchasedAt)
    .sort((a, b) => b.purchasedAt.localeCompare(a.purchasedAt))
}