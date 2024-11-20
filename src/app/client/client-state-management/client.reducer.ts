import { createReducer, on } from "@ngrx/store";
import { Client } from "../../models/types";
import { addClient } from "./client.action";

export interface ClientState {
    clients: Client[];
}

const initialState: ClientState = {
    clients: []
}

export const clientReducer = createReducer(
    initialState, 
    on(addClient, (state, action ) => ({...state, clients: [...state.clients, action.payload]}))
);
