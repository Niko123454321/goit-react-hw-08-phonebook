export const getAllContacts = ({ contacts }) => contacts.items;
export const getFilteredContacts = ({ contacts, filter }) => {
  if (!filter) {
    return contacts;
  }
  const normalizFilter = filter.toLowerCase();
  const result = contacts.items.filter(({ name }) => {
    return name.toLowerCase().includes(normalizFilter);
  });
  return result;
};
