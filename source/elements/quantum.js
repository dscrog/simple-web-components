import { elementOptions, shadowOptions } from '../constants/options.js';
import { getAttribute, setAttribute } from '../decorators/element.js';
import { formatAttribute } from '../utilities/format.js';

const callbacks = new Map();

export class Quantum extends HTMLElement {
    constructor(options) {
        super();

        this.options = {
            ...elementOptions,
            ...shadowOptions,
            ...options
        };

        if (this.options.shadow) {
            this.attachShadow(this.options);
        }
    }

    static get observedAttributes() {
        const observableAttributes = [];
        if (Array.isArray(this.attributes)) {
            for (const attribute of this.attributes) {
                const formattedAttribute = formatAttribute(attribute);
                Object.defineProperty(this.prototype, formattedAttribute, {
                    get() { return getAttribute(this, attribute); },
                    set(value) { setAttribute(this, attribute, value); }
                });

                const formattedCallback = `${formattedAttribute}ChangedCallback`;
                if (this.prototype.hasOwnProperty(formattedCallback)) {
                    observableAttributes.push(attribute);
                    if (!callbacks.has(attribute)) {
                        callbacks.set(attribute, formattedCallback);
                    }
                }
            }
        }

        return observableAttributes;
    }

    attributeChangedCallback(attribute, previous, current) {
        this[callbacks.get(attribute)](current, previous);
    }
}