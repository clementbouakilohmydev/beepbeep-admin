// ╔══════════════════════════════════════════════════════════════════╗
// ║  AUTO-GENERATED — DO NOT EDIT                                    ║
// ║  Source: BEEP/shared/formatters.ts                                 ║
// ║  Run `/sync-shared` or `node scripts/sync-shared.mjs` to update.  ║
// ╚══════════════════════════════════════════════════════════════════╝

/**
 * Formatters partagés entre admin et app.
 * Source canonique : BEEP/shared/formatters.ts
 *
 * Tous les formatters utilisent fr-FR + timezone Europe/Paris pour cohérence.
 */

import { CURRENCY, LOCALE, TIMEZONE } from "./constants";

// ─── Dates ─────────────────────────────────────────────────────────────

const DATE_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: TIMEZONE,
};

const SHORT_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: TIMEZONE,
};

const DAY_AND_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  hour12: false,
  weekday: "long",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: TIMEZONE,
};

/**
 * Formate une date en "JJ/MM/AAAA HH:mm".
 * @example formatDate("2024-01-20T15:30:00Z") // "20/01/2024 16:30"
 */
export function formatDate(date: string | null | undefined): string {
  if (!date) return "—";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(LOCALE, DATE_TIME_OPTIONS);
}

/**
 * Formate une date en "JJ/MM/AAAA" (sans heure).
 */
export function formatShortDate(date: string | null | undefined): string {
  if (!date) return "—";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(LOCALE, SHORT_DATE_OPTIONS);
}

/**
 * Formate une date ISO en "samedi 20 janv. 15:30".
 * Format long, utile pour affichage de trajet.
 */
export function getDayAndTime(isoDateStr: string | null | undefined): string {
  if (!isoDateStr) return "";
  const date = new Date(isoDateStr);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString(LOCALE, DAY_AND_TIME_OPTIONS);
}

// ─── Currency ──────────────────────────────────────────────────────────

/**
 * Formate un montant en euros (ex: 13,50 €).
 * @param value Montant en euros (number).
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
    minimumFractionDigits: 2,
  }).format(value);
}

type GetPriceParams = {
  /** Montant total payé par le passenger (= Course.price côté back, V1) */
  price: string | number;
  /** Commission plateforme retenue sur le driver (= Course.fees côté back, V1) */
  fees: string | number;
  /** True = montant net reçu par le driver (price - fees), false = montant payé par le passenger (price) */
  isDriver: boolean;
};

/**
 * Affiche le prix d'une course du point de vue de l'utilisateur courant.
 * Sémantique V1 (cf back/api/src/services/distance.ts) :
 *   - `price` = montant total passenger (TTC plateforme).
 *   - `fees`  = commission plateforme prélevée sur le driver.
 * Format français : "13,00 €".
 */
export const getPrice = ({ fees, price, isDriver }: GetPriceParams): string => {
  const priceNum = Number(price);
  const feesNum = Number(fees);

  if (!priceNum && priceNum !== 0) {
    return "0 €";
  }

  const finalPrice = isDriver ? priceNum - feesNum : priceNum;
  return `${finalPrice.toFixed(2).replace(".", ",")} €`;
};

// ─── User display ──────────────────────────────────────────────────────

type UserLike = {
  firstname?: string | null;
  lastname?: string | null;
  email?: string | null;
};

/**
 * Renvoie un nom d'affichage pour un user : "Prénom Nom" sinon email sinon "—".
 */
export function getUserDisplay(user: UserLike | null | undefined): string {
  if (!user) return "—";
  const name = `${user.firstname ?? ""} ${user.lastname ?? ""}`.trim();
  return name || user.email || "—";
}
