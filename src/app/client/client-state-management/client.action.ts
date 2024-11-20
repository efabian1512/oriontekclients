import { createAction, props } from "@ngrx/store";
import { Client } from "../../models/types";

export const addClient  = createAction('[Client Component] addClient', props<{payload: Client }>());