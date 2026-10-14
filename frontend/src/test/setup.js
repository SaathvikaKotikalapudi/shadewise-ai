import '@testing-library/jest-dom';

// JSDOM mocks for browser APIs not fully implemented in JSDOM
if (typeof window !== 'undefined') {
  window.scrollTo = () => {};
  if (!window.HTMLElement.prototype.scrollIntoView) {
    window.HTMLElement.prototype.scrollIntoView = () => {};
  }
}
