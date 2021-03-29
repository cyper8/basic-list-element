import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit-html';
import { BasicListElement } from '../src/BasicListElement.js';
import '../basic-list-element.js';
import { SpyOn } from './lib/EventSpy.js';
import { SelectionEvent } from '../src/SelectionEvent.js';

describe('BasicListElement', () => {
  it('can have label', async () => {
    const el = await fixture<BasicListElement>(
      html`<basic-list-element label="Header"></basic-list-element>`
    );
    expect(el.shadowRoot?.textContent).to.include('Header');
  });

  it('has name property', async () => {
    const testPropName = 'selectableProperty';
    const ble = await fixture<BasicListElement>(
      html`<basic-list-element name="${testPropName}"></basic-list-element>`
    );
    expect(ble.name).to.equal(testPropName);
    expect(ble.hasAttribute('name')).to.be.true;
    expect(ble.getAttribute('name')).to.equal(testPropName);
  });

  it('shows light DOM children as selectable options', async () => {
    const options: string[] = ['Option 1', 'Option 2', 'Option 3'];
    const ble = await fixture<BasicListElement>(
      html`<basic-list-element label="List">
        ${options.map(op => html`<p>${op}</p>`)}
      </basic-list-element>`
    );

    const renderedOptions:
      | NodeListOf<HTMLLIElement>
      | undefined = ble.shadowRoot?.querySelectorAll<HTMLLIElement>('li.item');
    if (renderedOptions) {
      expect(renderedOptions.length).to.equal(3);
      options.forEach((opt, index) =>
        expect(renderedOptions.item(index).textContent).to.contain(opt)
      );
    } else {
      throw new Chai.AssertionError('Element failed to render shadow root');
    }
  });

  it('selects option upon click', async () => {
    const options: string[] = ['Option 1', 'Option 2', 'Option 3'];
    const ble = await fixture<BasicListElement>(
      html`<basic-list-element label="List">
        ${options.map(op => html`<p>${op}</p>`)}
      </basic-list-element>`
    );
    const renderedOptions:
      | NodeListOf<HTMLLIElement>
      | undefined = ble.shadowRoot?.querySelectorAll<HTMLLIElement>('li.item');
    if (renderedOptions) {
      const theItem = renderedOptions.item(0);
      theItem.click();
      await ble.updateComplete;
      expect(theItem).to.have.attribute('selected');
    } else {
      throw new Chai.AssertionError('Element failed to render shadow root');
    }
  });

  it('has multiple selection mode', async () => {
    const options: string[] = ['Option 1', 'Option 2', 'Option 3'];
    const ble = await fixture<BasicListElement>(
      html`<basic-list-element multiple label="List">
        ${options.map(op => html`<p>${op}</p>`)}
      </basic-list-element>`
    );
    const renderedOptions:
      | NodeListOf<HTMLLIElement>
      | undefined = ble.shadowRoot?.querySelectorAll<HTMLLIElement>('li.item');
    if (renderedOptions) {
      const theItems = [renderedOptions.item(0), renderedOptions.item(2)];
      theItems.forEach(i => i.click());
      await ble.updateComplete;
      theItems.forEach(i => expect(i).to.have.attribute('selected'));
    } else {
      throw new Chai.AssertionError('Element failed to render shadow root');
    }
  });

  it('has getters to expose selected items, and indexes', async () => {
    const options: string[] = ['Option 1', 'Option 2', 'Option 3'];
    const ble = await fixture<BasicListElement>(
      html`<basic-list-element multiple label="List">
        ${options.map(op => html`<p>${op}</p>`)}
      </basic-list-element>`
    );
    const renderedOptions:
      | NodeListOf<HTMLLIElement>
      | undefined = ble.shadowRoot?.querySelectorAll<HTMLLIElement>('li.item');
    if (renderedOptions) {
      const theItems = [renderedOptions.item(0), renderedOptions.item(2)];
      theItems.forEach(i => i.click());
      await ble.updateComplete;
      expect(theItems.length).to.equal(ble.selected.length);
      theItems.forEach(i => {
        expect(ble.selected).to.include(i.children[0]);
      });
    } else {
      throw new Chai.AssertionError('Element failed to render shadow root');
    }
  });

  it('fires event when select', async () => {
    const options: string[] = ['Option 1', 'Option 2', 'Option 3'];
    const selectIndexes = [0, 2];
    const ble = await fixture<BasicListElement>(
      html`<basic-list-element multiple label="List">
        ${options.map(op => html`<p>${op}</p>`)}
      </basic-list-element>`
    );
    const renderedOptions:
      | NodeListOf<HTMLLIElement>
      | undefined = ble.shadowRoot?.querySelectorAll<HTMLLIElement>('li.item');
    if (renderedOptions) {
      const theItems = selectIndexes.map(i => renderedOptions.item(i));
      const capturedEvents = SpyOn<SelectionEvent>(
        ble,
        1000,
        'selection-changed'
      );
      theItems.forEach(i => i.click());
      await ble.updateComplete;
      const events = (await capturedEvents).get('selection-changed');
      if (events) {
        expect(events.length).to.be.greaterThan(0);
        const lastEvent = events.pop();
        expect(lastEvent?.detail.selection)
          .to.haveOwnProperty('index')
          .to.deep.equal(selectIndexes);
      } else throw new Chai.AssertionError('No events have been fired');
    } else {
      throw new Chai.AssertionError('Element failed to render shadow root');
    }
  });

  xit('responds on keyboard navigation and selection');

  it('passes the a11y audit', async () => {
    const el = await fixture<BasicListElement>(
      html`<basic-list-element></basic-list-element>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
