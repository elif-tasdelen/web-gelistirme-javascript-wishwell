import { useEffect, useState } from 'react'

const STORAGE_KEY = 'piggybank'

function loadBalance() {
  const value = Number(localStorage.getItem(STORAGE_KEY))
  return Number.isFinite(value) ? value : 0
}

export function usePiggyBank() {
  const [balance, setBalance] = useState(loadBalance)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(balance))
  }, [balance])

  const deposit = (amount) => setBalance((b) => b + amount)
  const withdraw = (amount) => setBalance((b) => Math.max(0, b - amount))
  const reset = () => setBalance(0)

  return { balance, deposit, withdraw, reset }
}