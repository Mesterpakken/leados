/** Nordic Tools demo commission rules — configurable in production. */

export const commissionTiers = [
  { threshold: 0, rate: 0.05 },
  { threshold: 200000, rate: 0.1 },
  { threshold: 300000, rate: 0.15 },
];

/** Rate applies to all qualifying (sent) revenue for the period. */
export function commissionFor(revenue) {
  const tier = [...commissionTiers].reverse().find((t) => revenue >= t.threshold);
  return { rate: tier.rate, amount: revenue * tier.rate, threshold: tier.threshold };
}

export function nextTierFor(revenue) {
  return commissionTiers.find((t) => t.threshold > revenue) || null;
}

export function money(n) {
  return `${new Intl.NumberFormat('da-DK').format(n)} kr.`;
}
