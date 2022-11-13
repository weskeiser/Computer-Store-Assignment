export const delegate = (el, selector, event, handler) => {
  el.addEventListener(event, (e) => {
    if (e.target.matches(selector)) handler(e, el);
  });
};

export const qs = (root, selector) => root.querySelector(selector);

export const qsA = (root, ...selectors) => root.querySelectorAll(selectors);

export const multiQs = (root, ...selectors) =>
  selectors.map((selector) => root.querySelector(selector));

export const insertHTML = (el, html) =>
  el.insertAdjacentHTML("afterbegin", html);

export const replaceHTML = (el, html) => {
  el.replaceChildren();
  insertHTML(el, html);
};

export const newShadowEvent = (target, event, selector, handler) => {
  delegate(target, selector, event, (e) => {
    const $el = e.target.closest(selector);
    handler(e, $el);
  });
};
