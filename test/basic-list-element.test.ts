import { html, fixture, expect } from '@open-wc/testing';

import { BasicListElement } from '../src/BasicListElement.js';
import '../basic-list-element.js';

describe('BasicListElement', () => {
  it('can have label', async () => {
    const el = await fixture<BasicListElement>(
      html`<basic-list-element label="Header"></basic-list-element>`
    );
    expect(el.shadowRoot?.textContent).to.include('Header');
  });

  it('has name property', async () => {
    const testPropName: string = 'selectableProperty';
    const ble = await fixture<BasicListElement>(
      html`<basic-list-element name="${testPropName}"></basic-list-element>`
    );
    expect(ble.name).to.equal(testPropName);
    expect(ble.hasAttribute('name')).to.be.true;
    expect(ble.getAttribute('name')).to.equal(testPropName);
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<BasicListElement>(
      html`<basic-list-element></basic-list-element>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
