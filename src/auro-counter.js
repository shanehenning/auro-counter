// Copyright (c) 2021 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

// If use litElement base class
import { LitElement, html, css } from "lit-element";

// If using auroElement base class
// See instructions for importing auroElement base class https://git.io/JULq4
// import { html, css } from "lit-element";
// import AuroElement from '@alaskaairux/webcorestylesheets/dist/auroElement/auroElement';

// Import touch detection lib
import "focus-visible/dist/focus-visible.min.js";
import styleCss from "./style-css.js";

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * auro-counter provides users a way to count
 *
 * @attr {Number} count - tracks the current count as recorded by the +/- triggers
 */

// build the component class
class AuroCounter extends LitElement {
  constructor() {
    super();
    this.count = 0;
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {
      // ...super.properties,
      count: { type: Number }
    };
  }

  static get styles() {
    return css`
      ${styleCss}
    `;
  }

  // should highlight icon on focus, similar to when tabbing to the "See code accordion"
  // connectedCallback() {
  //   super.connectedCallback();
  //   this.triggers = Array.from(this.querySelectorAll('.auro-counter-trigger'));

  //   this.addEventListener('focusSelected', this.handleFocusSelected);
  // }

  // handleFocusSelected() {
  //   const focusedTrigger = this.triggers[this.index].shadowRoot.querySelector('.auro-counter-trigger');

  //   focusedTrigger.focus();
  // }

  handleDecrement(event) {
    this.count -= 1;
    const customEvent = new CustomEvent(event.type, event);

    this.dispatchEvent(customEvent);
  }

  handleIncrement(event) {
    this.count += 1;
    const customEvent = new CustomEvent(event.type, event);

    this.dispatchEvent(customEvent);
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (event.target.id === "auro-counter-decrement") {
        this.handleDecrement(event);
      }
      if (event.target.id === "auro-counter-increment") {
        this.handleIncrement(event);
      }
    }
  }

  // When using auroElement, use the following attribute and function when hiding content from screen readers.
  // aria-hidden="${this.hideAudible(this.hiddenAudible)}"

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div class="auro-counter">
        <auro-icon 
          accent
          category="interface" 
          class="auro-counter-trigger"
          @click="${this.handleDecrement}"
          id="auro-counter-decrement"
          @keydown="${this.handleKeyDown}"
          name="minus-filled" 
          tabindex="0"
        >
        </auro-icon>
        <span class="auro-count">${this.count}</span>
        <auro-icon
          accent
          category="interface"
          class="auro-counter-trigger"
          @click="${this.handleIncrement}"
          id="auro-counter-increment"
          @keydown="${this.handleKeyDown}"
          name="plus-filled"
          tabindex="0"
        >
        </auro-icon>
      </div>
    `;
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-counter")) {
  customElements.define("auro-counter", AuroCounter);
}
