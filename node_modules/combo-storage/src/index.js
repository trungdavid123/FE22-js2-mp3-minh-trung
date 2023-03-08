import CookieComponent from './components/Cookie.js';
import StorageComponent from './components/Storage.js';

export const Cookie = CookieComponent;
export const LocalStorage = typeof localStorage !== 'undefined' ? new StorageComponent(localStorage) : null;
export const SessionStorage = typeof sessionStorage !== 'undefined' ? new StorageComponent(sessionStorage) : null;
