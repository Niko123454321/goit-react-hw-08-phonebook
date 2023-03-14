import { createSlice } from '@reduxjs/toolkit';

import {
  feachAllContacts,
  feachAddContact,
  feachDeleteContsct,
} from './contacts-operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(feachAllContacts.pending, store => {
        store.isLoading = true;
      })
      .addCase(feachAllContacts.fulfilled, (store, { payload }) => {
        store.isLoading = false;
        store.items = payload;
      })
      .addCase(feachAllContacts.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.error = payload;
      })
      .addCase(feachAddContact.pending, store => {
        store.isLoading = true;
      })
      .addCase(feachAddContact.fulfilled, (store, { payload }) => {
        store.isLoading = false;
        store.items.push(payload);
      })
      .addCase(feachAddContact.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.error = payload;
      })
      .addCase(feachDeleteContsct.pending, store => {
        store.isLoading = true;
      })
      .addCase(feachDeleteContsct.fulfilled, (store, { payload }) => {
        store.isLoading = false;
        const index = store.items.findIndex(item => item.id === payload);
        store.items.splice(index, 1);
      })
      .addCase(feachDeleteContsct.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.error = payload;
      });
  },
});

export default contactsSlice.reducer;
