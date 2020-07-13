export const shadow = (element, options) => element.attachShadow({ mode: 'open', ...options });

export const formatAttribute = attribute => attribute.split('-').map((string, index) => index ? string.charAt(0).toUpperCase() + string.slice(1) : string).join('');