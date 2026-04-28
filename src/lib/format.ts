/**
 * Façade vers le module shared.
 *
 * La logique réelle vit dans `BEEP/shared/formatters.ts` (synchronisé via
 * `/sync-shared` vers `src/shared/`). Ce fichier garde le chemin d'import
 * historique `@/lib/format` pour ne pas casser les usages existants.
 *
 * Pour ajouter ou modifier un formatter : éditer BEEP/shared/formatters.ts.
 */

export {
  formatDate,
  formatShortDate,
  formatCurrency,
  getUserDisplay,
  getDayAndTime,
  getPrice,
} from "@/shared/formatters";
