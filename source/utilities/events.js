export const dispatch = (element, event, options) => element.dispatchEvent(new CustomEvent(event, { cancelable: true, ...options }));

export const dispatcher = (element, event) => options => dispatch(element, event, options);