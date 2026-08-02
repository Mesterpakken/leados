import { commercialSales, sellerOrders as seedSellerOrders } from '../data/commercial';

const STORAGE_KEY = 'leados.salesOrders.v1';
const SEQ_KEY = 'leados.salesOrderSeq.v1';

export const ORDER_STATUSES = [
  'Kladde',
  'Afventer godkendelse',
  'Skal rettes',
  'Godkendt',
  'Klar til lager',
  'Afventer afsendelse',
  'Sendt',
  'Returneret',
  'Annulleret',
];

/** Visible on TV board once Michael has approved (not while awaiting). */
export const BOARD_STATUSES = new Set([
  'Godkendt',
  'Klar til lager',
  'Afventer afsendelse',
  'Sendt',
]);

export const PENDING_APPROVAL = 'Afventer godkendelse';
export const DEMO_SELLER = 'Christian';

const listeners = new Set();

function formatDate(d = new Date()) {
  return d.toLocaleString('da-DK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function seedFromLegacy() {
  return seedSellerOrders.map((o) => ({
    id: o.id,
    seller: o.seller,
    status: o.status === 'Registreret' ? PENDING_APPROVAL : o.status === 'Godkendt' ? 'Klar til lager' : o.status,
    registeredAt: o.registeredAt,
    submittedAt: Date.now() - Math.random() * 1e8,
    amount: o.amount,
    special: o.special,
    countsForCommission: o.status === 'Sendt' && o.amount > 0,
    reason: o.reason,
    leaderMessage: null,
    specialApproved: null,
    commissionApproved: null,
    customer: {
      company: o.customer,
      cvr: '',
      contact: '',
      phone: '',
      email: '',
      billingAddress: '',
      zip: '',
      city: '',
      sameDelivery: true,
      deliveryAddress: '',
      deliveryZip: '',
      deliveryCity: '',
      customerType: 'Eksisterende kunde',
      salesType: 'Gensalg',
    },
    lines: o.amount > 0
      ? [
          {
            id: 'line-1',
            product: 'Ordre (legacy demo)',
            sku: '',
            qty: 1,
            unitPrice: o.amount,
            discountPct: 0,
            lineTotal: o.amount,
          },
        ]
      : [],
    bonus: null,
    delivery: {
      desiredDate: '',
      note: '',
      customerRef: '',
      internalNotes: '',
      specialPrice: o.special || '',
      specialAgreement: '',
      customCommission: o.special?.includes('%') ? o.special : '',
    },
    totals: {
      subtotal: Math.max(0, o.amount),
      discountTotal: 0,
      orderTotal: Math.max(0, o.amount),
    },
    flags: {
      needsMichael: Boolean(o.special),
      specialPrice: Boolean(o.special),
      customCommission: Boolean(o.special?.includes('%')),
    },
    legacy: true,
  }));
}

function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {
    /* ignore */
  }
  return seedFromLegacy();
}

let orders = typeof window !== 'undefined' ? loadOrders() : seedFromLegacy();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    /* ignore */
  }
  listeners.forEach((fn) => fn());
}

export function subscribeSalesOrders(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getSalesOrders() {
  return orders;
}

export function resetSalesOrdersDemo() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SEQ_KEY);
  } catch {
    /* ignore */
  }
  orders = seedFromLegacy();
  persist();
}

export function nextOrderNumber() {
  let seq = 2910;
  try {
    const stored = Number(localStorage.getItem(SEQ_KEY));
    if (Number.isFinite(stored) && stored >= 2910) seq = stored;
  } catch {
    /* ignore */
  }
  const existing = orders.map((o) => {
    const m = String(o.id).match(/NT-(\d+)/);
    return m ? Number(m[1]) : 0;
  });
  const maxExisting = Math.max(seq, ...existing, 2910);
  const next = maxExisting + 1;
  try {
    localStorage.setItem(SEQ_KEY, String(next));
  } catch {
    /* ignore */
  }
  return `NT-${next}`;
}

export function lineTotal(qty, unitPrice, discountPct) {
  const q = Number(qty) || 0;
  const p = Number(unitPrice) || 0;
  const d = Math.min(100, Math.max(0, Number(discountPct) || 0));
  return Math.round(q * p * (1 - d / 100));
}

export function computeTotals(lines) {
  const subtotal = lines.reduce((s, l) => s + (Number(l.qty) || 0) * (Number(l.unitPrice) || 0), 0);
  const afterDiscount = lines.reduce((s, l) => s + lineTotal(l.qty, l.unitPrice, l.discountPct), 0);
  return {
    subtotal: Math.round(subtotal),
    discountTotal: Math.round(subtotal - afterDiscount),
    orderTotal: Math.round(afterDiscount),
  };
}

export function orderNeedsMichael(delivery = {}) {
  return Boolean(
    (delivery.specialPrice && String(delivery.specialPrice).trim()) ||
      (delivery.specialAgreement && String(delivery.specialAgreement).trim()) ||
      (delivery.customCommission && String(delivery.customCommission).trim()),
  );
}

export function submitSalesOrder(payload) {
  const totals = computeTotals(payload.lines);
  const needsMichael = orderNeedsMichael(payload.delivery);
  const order = {
    id: nextOrderNumber(),
    seller: payload.seller || DEMO_SELLER,
    status: PENDING_APPROVAL,
    registeredAt: formatDate(),
    submittedAt: Date.now(),
    amount: totals.orderTotal,
    special:
      payload.delivery.specialPrice ||
      payload.delivery.customCommission ||
      (payload.delivery.specialAgreement ? 'Særlig aftale' : null),
    countsForCommission: false,
    reason: 'Afventer ledergodkendelse før den kan tælle.',
    leaderMessage: null,
    specialApproved: null,
    commissionApproved: null,
    customer: payload.customer,
    lines: payload.lines.map((l) => ({
      ...l,
      lineTotal: lineTotal(l.qty, l.unitPrice, l.discountPct),
    })),
    bonus: payload.bonus?.product ? payload.bonus : null,
    delivery: payload.delivery,
    totals,
    flags: {
      needsMichael,
      specialPrice: Boolean(payload.delivery.specialPrice?.toString().trim()),
      customCommission: Boolean(payload.delivery.customCommission?.toString().trim()),
    },
    legacy: false,
  };
  orders = [order, ...orders];
  persist();
  return order;
}

export function updateSalesOrder(id, updater) {
  orders = orders.map((o) => {
    if (o.id !== id) return o;
    return typeof updater === 'function' ? updater(o) : { ...o, ...updater };
  });
  persist();
  return orders.find((o) => o.id === id);
}

export function approveSalesOrder(id, { message = '', approveSpecial = true, approveCommission = true } = {}) {
  return updateSalesOrder(id, (o) => ({
    ...o,
    status: 'Klar til lager',
    leaderMessage: message || null,
    specialApproved: o.flags?.specialPrice ? approveSpecial : null,
    commissionApproved: o.flags?.customCommission ? approveCommission : null,
    countsForCommission: false,
    reason: 'Godkendt — klar til lager. Provision tæller først ved Sendt.',
    special:
      o.flags?.customCommission && !approveCommission
        ? null
        : o.special,
  }));
}

export function returnSalesOrder(id, message) {
  return updateSalesOrder(id, (o) => ({
    ...o,
    status: 'Skal rettes',
    leaderMessage: message || 'Ret venligst ordren og send igen.',
    countsForCommission: false,
    reason: 'Sendt tilbage til rettelse.',
  }));
}

export function markSalesOrderSent(id) {
  return updateSalesOrder(id, (o) => {
    if (o.amount < 0) {
      return {
        ...o,
        status: 'Sendt',
        countsForCommission: false,
        reason: 'Negativt beløb — tæller ikke i provision.',
      };
    }
    return {
      ...o,
      status: 'Sendt',
      countsForCommission: true,
      reason: null,
      registeredAt: o.registeredAt,
      sentAt: formatDate(),
    };
  });
}

export function markSalesOrderReturned(id) {
  return updateSalesOrder(id, (o) => ({
    ...o,
    status: 'Returneret',
    amount: o.amount > 0 ? -Math.abs(o.amount) : o.amount,
    countsForCommission: false,
    reason: 'Returnering trækkes fra provisionsgivende omsætning.',
  }));
}

export function pendingApprovalOrders() {
  return getSalesOrders().filter((o) => o.status === PENDING_APPROVAL);
}

export function boardEligibleOrders() {
  return getSalesOrders().filter((o) => BOARD_STATUSES.has(o.status) && o.amount > 0);
}

export function commissionableRevenue(seller = DEMO_SELLER) {
  return getSalesOrders()
    .filter((o) => o.seller === seller && o.countsForCommission)
    .reduce((s, o) => s + o.amount, 0);
}

export function pendingRevenue(seller = DEMO_SELLER) {
  return getSalesOrders()
    .filter(
      (o) =>
        o.seller === seller &&
        o.amount > 0 &&
        !o.countsForCommission &&
        !['Returneret', 'Annulleret', 'Skal rettes'].includes(o.status),
    )
    .reduce((s, o) => s + o.amount, 0);
}

export function returnsTotal(seller = DEMO_SELLER) {
  return getSalesOrders()
    .filter((o) => o.seller === seller && (o.status === 'Returneret' || o.status === 'Annulleret'))
    .reduce((s, o) => s + Math.abs(o.amount), 0);
}

/**
 * TV leaderboard: base commercialSales, plus newly registered demo orders
 * that are board-eligible (approved or further). Pending approval never appears.
 */
export function boardLeaderboard() {
  const seedIds = new Set(seedSellerOrders.map((o) => o.id));
  const bumps = {};
  for (const o of boardEligibleOrders()) {
    if (seedIds.has(o.id) || o.amount <= 0) continue;
    bumps[o.seller] = (bumps[o.seller] || 0) + o.amount;
  }
  return commercialSales
    .map((row) => ({
      ...row,
      amount: row.amount + (bumps[row.name] || 0),
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function latestBoardSale() {
  const list = boardEligibleOrders().sort((a, b) => (b.submittedAt || 0) - (a.submittedAt || 0));
  return list[0] || null;
}

export function statusPillClass(status) {
  if (status === 'Sendt') return '';
  if (status === 'Skal rettes' || status === 'Returneret' || status === 'Annulleret') return 'amber';
  if (status === PENDING_APPROVAL) return 'amber';
  return 'amber';
}
