import { useEffect, useState } from 'react'

const STORAGE_KEY = 'wishlist'

function loadWishes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

export function useWishes() {
  const [wishes, setWishes] = useState(loadWishes)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes))
  }, [wishes])

  const addWish = (data) =>
    setWishes((list) => [...list, { ...data, id: crypto.randomUUID() }])

  const updateWish = (id, changes) =>
    setWishes((list) => list.map((w) => (w.id === id ? { ...w, ...changes } : w)))

  const removeWish = (id) =>
    setWishes((list) => list.filter((w) => w.id !== id))

  return { wishes, addWish, updateWish, removeWish }
}