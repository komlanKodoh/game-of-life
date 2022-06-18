import { createAction, props } from '@ngrx/store';
import { EcosystemRecord } from '../../user/reducer';
import { EcosystemDefinition } from './reducer';

export const addEcosystems = createAction(
  '[ECOSYSTEM] add ecosystem to word ecosystem list',
  props<EcosystemDefinition>()
);
