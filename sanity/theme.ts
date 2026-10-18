import { buildLegacyTheme } from 'sanity';

// JIC Brand Colors
// Dashboard cream:   #faf8f4  (used as bg on ALL studio pages)
// Dark Emerald:      #051410, #071914, #0a221b
// Gold Accent:       #d5a864, #c5a25d

export const jicTheme = buildLegacyTheme({
  /* Base — use cream as the "white" so all light-scheme panels inherit it */
  '--black': '#1a1714',
  '--white': '#faf8f4',

  '--gray': '#8a7f72',
  '--gray-base': '#6b6259',

  /* Brand */
  '--brand-primary': '#d5a864',

  /* Default buttons */
  '--default-button-color': '#6b6259',
  '--default-button-primary-color': '#d5a864',
  '--default-button-success-color': '#059669',
  '--default-button-warning-color': '#d97706',
  '--default-button-danger-color': '#dc2626',

  /* State */
  '--state-info-color': '#d5a864',
  '--state-success-color': '#059669',
  '--state-warning-color': '#f59e0b',
  '--state-danger-color': '#ef4444',

  /* Navbar — keep dark so top bar stays branded */
  '--main-navigation-color': '#ffffff',
  '--main-navigation-color--inverted': '#1a1714',

  /* Focus rings */
  '--focus-color': '#d5a864',
});
