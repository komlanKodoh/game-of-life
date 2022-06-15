import { createAction, props } from '@ngrx/store';
import { ClipboardData } from './reducer';

export const write = createAction('[CLIPBOARD] Write to clipboard', props< ClipboardData >());

