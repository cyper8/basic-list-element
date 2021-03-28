import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit-html';
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

  it('shows light DOM children as selectable options', async () => {
    const ble = await fixture<BasicListElement>(
      html`<basic-list-element label="List">
        <p>Option 1</p>
        <p>Option 2</p>
        <p>Option 3</p>
      </basic-list-element>`
    );

    // eslint-disable-next-line no-undef
    const renderedOptions: NodeListOf<HTMLLIElement> = ble.shadowRoot!.querySelectorAll<HTMLLIElement>(
      'li.item'
    );

    expect(renderedOptions.length).to.equal(3);
    expect(renderedOptions.item(0).textContent).to.include('Option 1');
    expect(renderedOptions.item(1).textContent).to.include('Option 2');
    expect(renderedOptions.item(2).textContent).to.include('Option 3');
  });

  xit('selects option upon click', async () => {});
  xit('has multiple selection mode', async () => {});
  xit('has getters to expose selected items, and indexes', async () => {});
  xit('fires event when select', async () => {});
  xit('responds on keyboard navigation and selection', async () => {});

  it('passes the a11y audit', async () => {
    const el = await fixture<BasicListElement>(
      html`<basic-list-element></basic-list-element>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
