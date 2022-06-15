import { createAction, props } from '@ngrx/store';
import { EcosystemDefinition } from './reducer';


export const addEcosystems = createAction('[ECOSYSTEM] add ecosystem to word ecosystem list', props< EcosystemDefinition >());
export const setEcosystems = createAction("[ECOSYSTEM] set world ecosystems");


