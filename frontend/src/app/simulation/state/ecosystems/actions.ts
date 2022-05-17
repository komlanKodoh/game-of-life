import { createAction, props } from '@ngrx/store';
import { EcosystemDefinition } from './reducer';


export const add = createAction('[ECOSYSTEM] add ecosystem to word ecosystem list', props< EcosystemDefinition >());

