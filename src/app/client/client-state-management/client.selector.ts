import { createSelector } from "@ngrx/store";
import { AppState } from "../../states/app.state";

export const selectClientsState = (state: AppState) => state.clientsInfo;

export const selectClients = createSelector(
    selectClientsState,
    (state) => state.clients
);