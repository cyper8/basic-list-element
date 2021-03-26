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

  it('passes the a11y audit', async () => {
    const el = await fixture<BasicListElement>(
      html`<basic-list-element></basic-list-element>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
