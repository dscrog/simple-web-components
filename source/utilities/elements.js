export const define = (type) => customElements.define(`q-${type.name.toLowerCase()}`, type);