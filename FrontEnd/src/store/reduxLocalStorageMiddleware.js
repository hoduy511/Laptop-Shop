const reduxLocalStorageMiddleware = store => next => action => {
    const result = next(action);
    localStorage.removeItem('reduxState');
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
    return result;
};
  
export default reduxLocalStorageMiddleware;
