'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'jogja-investor-club',
  title: 'Jogja Investor Club',
  projectId: 'fxrpr0tm',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
  basePath: '/studio',
});
