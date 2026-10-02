/**
 * Bir istek kaydı.
 * @typedef {Object} Wish
 * @property {string} id
 * @property {string} title                 İsteğin adı
 * @property {number} price                 Fiyatı (₺)
 * @property {'high'|'medium'|'low'} priority  Öncelik
 * @property {string|null} purchasedAt     Satın alma tarihi (null = henüz alınmadı)
 */

export const PRIORITIES = {
  high: 'Yüksek',
  medium: 'Orta',
  low: 'Düşük',
}