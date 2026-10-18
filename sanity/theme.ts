import { buildLegacyTheme } from 'sanity';

// JIC Brand Colors
// Dark Emerald: #071914, #0a221b, #051410
// Gold Accent: #d5a864, #c5a25d, #b08d47
// Text: #ffffff, #fbf9f5, #a3a3a3

export const jicTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': '#071914',
  '--white': '#ffffff',

  '--gray': '#737373',
  '--gray-base': '#525252',

  '--component-bg': '#071914',
  '--component-text-color': '#fbf9f5',

  /* Brand */
  '--brand-primary': '#d5a864',

  // Default button
  '--default-button-color': '#0d2e24',
  '--default-button-primary-color': '#d5a864',
  '--default-button-success-color': '#059669',
  '--default-button-warning-color': '#d97706',
  '--default-button-danger-color': '#dc2626',

  /* State */
  '--state-info-color': '#d5a864',
  '--state-success-color': '#10b981',
  '--state-warning-color': '#f59e0b',
  '--state-danger-color': '#ef4444',

  /* Navbar */
  '--main-navigation-color': '#051410',
  '--main-navigation-color--inverted': '#ffffff',

  '--focus-color': '#d5a864',
});
