/* eslint-disable no-undef */
/* eslint-disable one-var */

import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import '../src/auro-counter.js';

describe('auro-counter', () => {
  it('sets the CSS class on auro-counter > div element', async () => {
    const el = await fixture(html`
      <auro-counter cssclass="testClass"></auro-counter>
    `);

    const div = el.shadowRoot.querySelector('div');

    expect(div.className).to.equal('auro-counter');
  });

  it('auro-counter is accessible', async () => {
    const el = await fixture(html`
      <auro-counter cssclass="testClass"></auro-counter>
    `);

    await expect(el).to.be.accessible();
  });

  it('auro-counter custom element is defined', async () => {
    const el = await Boolean(customElements.get("auro-counter"));

    await expect(el).to.be.true;
  });

  it('auro-counter defaults to 0', async () => {
    const defaultCount = 0;
    const el = await fixture(html`<auro-counter cssclass="testClass"></auro-counter>`);
    const span = parseInt(el.shadowRoot.querySelector('span').textContent, 10);

    await expect(span).to.equal(defaultCount);
  })

  it('auro-counter decrement button decreases count', async () => {
    const decrementedCount = -1;
    const el = await fixture(html`<auro-counter cssclass="testClass"></auro-counter>`);
    const buttonDecrement = el.shadowRoot.querySelector('#auro-counter-decrement');

    buttonDecrement.click();
    await elementUpdated(el);
    const span = parseInt(el.shadowRoot.querySelector('span').textContent, 10);

    await expect(span).to.equal(decrementedCount);
  })

  it('auro-counter increment button increases count', async () => {
    const incrementedCount = 1;
    const el = await fixture(html`<auro-counter cssclass="testClass"></auro-counter>`);
    const buttonIncrement = el.shadowRoot.querySelector('#auro-counter-increment');

    buttonIncrement.click();
    await elementUpdated(el);
    const span = parseInt(el.shadowRoot.querySelector('span').textContent, 10);

    await expect(span).to.equal(incrementedCount);
  })


  it('auro-counter keyboard can decrease count', async () => {
    const decrementedCount = -1;
    const el = await fixture(html`<auro-counter cssclass="testClass"></auro-counter>`);
    const buttonDecrement = el.shadowRoot.querySelector('#auro-counter-decrement');

    buttonDecrement.dispatchEvent(new KeyboardEvent('keydown', { key: "Enter" }));
    await elementUpdated(el);
    const span = parseInt(el.shadowRoot.querySelector('span').textContent, 10);

    await expect(span).to.equal(decrementedCount);
  })

  it('auro-counter keyboard can increase count', async () => {
    const incrementedCount = 1;
    const el = await fixture(html`<auro-counter cssclass="testClass"></auro-counter>`);
    const buttonIncrement = el.shadowRoot.querySelector('#auro-counter-increment');

    buttonIncrement.dispatchEvent(new KeyboardEvent('keydown', { key: "Enter" }));
    await elementUpdated(el);
    const span = parseInt(el.shadowRoot.querySelector('span').textContent, 10);

    await expect(span).to.equal(incrementedCount);
  })

  it('auro-counter non-enter keys do not decrease count', async () => {
    const defaultCount = 0;
    const el = await fixture(html`<auro-counter cssclass="testClass"></auro-counter>`);
    const buttonDecrement = el.shadowRoot.querySelector('#auro-counter-decrement');

    buttonDecrement.dispatchEvent(new KeyboardEvent('keydown', { key: "Tab" }));
    await elementUpdated(el);
    const span = parseInt(el.shadowRoot.querySelector('span').textContent, 10);

    await expect(span).to.equal(defaultCount);
  })

  it('auro-counter non-enter keys do not increase count', async () => {
    const defaultCount = 0;
    const el = await fixture(html`<auro-counter cssclass="testClass"></auro-counter>`);
    const buttonIncrement = el.shadowRoot.querySelector('#auro-counter-increment');

    buttonIncrement.dispatchEvent(new KeyboardEvent('keydown', { key: "Tab" }));
    await elementUpdated(el);
    const span = parseInt(el.shadowRoot.querySelector('span').textContent, 10);

    await expect(span).to.equal(defaultCount);
  })
});
