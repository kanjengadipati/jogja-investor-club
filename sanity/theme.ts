import { buildLegacyTheme } from 'sanity';

// JIC Brand Colors
// Dark Emerald: #051410, #071914, #0a221b
// Gold Accent: #d5a864, #c5a25d
// Clear Contrast Buttons: Pure White foreground (#ffffff) for maximum legibility

export const jicTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': '#071914',
  '--white': '#ffffff',

  '--gray': '#64748b',
  '--gray-base': '#475569',

  /* Brand */
  '--brand-primary': '#d5a864',

  /* Default buttons */
  '--default-button-color': '#64748b',
  '--default-button-primary-color': '#d5a864',
  '--default-button-success-color': '#059669',
  '--default-button-warning-color': '#d97706',
  '--default-button-danger-color': '#dc2626',

  /* State */
  '--state-info-color': '#d5a864',
  '--state-success-color': '#059669',
  '--state-warning-color': '#f59e0b',
  '--state-danger-color': '#ef4444',

  /* Navbar */
  '--main-navigation-color': '#051410',
  '--main-navigation-color--inverted': '#ffffff',

  /* Focus rings */
  '--focus-color': '#d5a864',
});
