import { createAction, props } from "@ngrx/store";
import { Client, DeleteClientAction, UpdateClientAction } from "../../models/types";

export const addClient  = createAction('[Client Component] addClient', props<{payload: Client }>());
export const updateClient  = createAction('[Client Component] updateClient', props<{payload: UpdateClientAction }>());
export const deleteClient  = createAction('[Client Component] updateClient', props<{payload: DeleteClientAction }>());