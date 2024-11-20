import { createReducer, on } from "@ngrx/store";
import { Client } from "../../models/types";
import { addClient, updateClient } from "./client.action";

export interface ClientState {
    clients: Client[];
}

const initialState: ClientState = {
    clients: []
}

export const clientReducer = createReducer(
    initialState, 
    on(addClient, (state, action ) => ({...state, clients: [...state.clients, action.payload]})),
    on(updateClient, (state, action ) => ({...state, clients: state.clients.map(client => client.id === action.payload.idToUpdate ? {...action.payload.client} : client)}))
);
