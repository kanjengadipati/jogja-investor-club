import { heroSchema } from './hero';
import { propertyArchetypeSchema } from './propertyArchetype';
import { siteSettingsSchema } from './siteSettings';
import { processStepSchema } from './processStep';
import { projectSchema } from './project';

export const schemaTypes = [
  heroSchema,
  propertyArchetypeSchema,
  processStepSchema,
  siteSettingsSchema,
  projectSchema,
];
