import { fixture, expect } from '@open-wc/testing';
import { html, TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { SpyOn } from 'dom-event-spy';

import { BasicListElement } from '../src/BasicListElement.js';
import '../basic-list-element.js';

import { SelectionChangedEvent } from '../src/SelectionChangedEvent.js';
import { ItemsChangedEvent } from '../src/ItemsChangedEvent.js';

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

    const renderedOptions: NodeListOf<HTMLLIElement> | undefined =
      ble.shadowRoot?.querySelectorAll<HTMLLIElement>('.item');
    if (renderedOptions) {
      expect(renderedOptions.length).to.equal(3);
      options.forEach((opt, index) =>
        expect(renderedOptions.item(index).textContent).to.contain(opt)
      );
    } else {
      throw new Chai.AssertionError('Element failed to render shadow root');
    }
  });

  it('replaces items, when slotted children change', async () => {
    const varOptions: string[][] = [
      ['Option 1', 'Option 2', 'Option 3'],
      ['Option 1', 'Option2', 'Option 4', 'Option 5'],
    ];

    const ble = async (items: TemplateResult | TemplateResult[]) =>
      fixture<BasicListElement>(
        html`<basic-list-element label="List">${items}</basic-list-element>`
      );

    for (const variant of varOptions) {
      // eslint-disable-next-line no-await-in-loop
      const list = await ble(variant.map(opt => html`<p>${opt}</p>`));
      expect(list.items.length).equal(variant.length);
      list.items.forEach((item, index) => {
        expect(item.textContent).to.contain(variant[index]);
      });
    }
  });

  it("fires 'items-changed' event upon slot changes", async () => {
    const varOptions: string[][] = [
      ['Option 1', 'Option 2', 'Option 3'],
      ['Option 4', 'Option 5'],
    ];

    const testEventHandler =
      (variant: string[]) => (event: ItemsChangedEvent) => {
        event.detail.items.forEach((item, index) => {
          expect(item.textContent).to.contain(variant[index]);
        });
      };

    const ble = async (items: string[]) =>
      fixture<BasicListElement>(
        html`<basic-list-element
          @items-changed=${testEventHandler(items)}
          label="List"
          >${repeat(items, opt => html`<p>${opt}</p>`)}</basic-list-element
        >`
      );

    for (const variant of varOptions) {
      // eslint-disable-next-line no-await-in-loop
      await ble(variant);
    }
  });

  it('selects option upon click', async () => {
    const options: string[] = ['Option 1', 'Option 2', 'Option 3'];
    const ble = await fixture<BasicListElement>(
      html`<basic-list-element label="List">
        ${options.map(op => html`<p>${op}</p>`)}
      </basic-list-element>`
    );
    const renderedOptions: NodeListOf<HTMLLIElement> | undefined =
      ble.shadowRoot?.querySelectorAll<HTMLLIElement>('.item');
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
    const renderedOptions: NodeListOf<HTMLLIElement> | undefined =
      ble.shadowRoot?.querySelectorAll<HTMLLIElement>('.item');
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
    const renderedOptions: NodeListOf<HTMLLIElement> | undefined =
      ble.shadowRoot?.querySelectorAll<HTMLLIElement>('.item');
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

  it('has setter to alow imperative setting selection', async () => {
    const options: string[] = ['Option 1', 'Option 2', 'Option 3'];
    const ble = await fixture<BasicListElement>(
      html`<basic-list-element multiple label="List" .selectedIndexes=${[0, 2]}>
        ${options.map(op => html`<p>${op}</p>`)}
      </basic-list-element>`
    );
    const renderedOptions: NodeListOf<HTMLLIElement> | undefined =
      ble.shadowRoot?.querySelectorAll<HTMLLIElement>('.item');
    if (renderedOptions) {
      expect(renderedOptions.item(0)).to.have.attribute('selected');
      expect(renderedOptions.item(2)).to.have.attribute('selected');
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
    const renderedOptions: NodeListOf<HTMLLIElement> | undefined =
      ble.shadowRoot?.querySelectorAll<HTMLLIElement>('.item');
    if (renderedOptions) {
      const theItems = selectIndexes.map(i => renderedOptions.item(i));
      const capturedEvents = SpyOn<SelectionChangedEvent>(
        ble,
        500,
        'selection-changed'
      );
      theItems.forEach(i => i.click());
      await ble.updateComplete;
      const events = (await capturedEvents).get('selection-changed');
      if (events) {
        expect(events.length).to.be.greaterThan(0);
        const lastEvent = events.pop();
        expect(lastEvent?.detail)
          .to.haveOwnProperty('index')
          .to.deep.equal(selectIndexes);
      } else throw new Chai.AssertionError('No events have been fired');
    } else {
      throw new Chai.AssertionError('Element failed to render shadow root');
    }
  });

  it('responds on keyboard navigation and selection', async () => {
    const arrowDownEvent = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    const arrowUpEvent = new KeyboardEvent('keydown', {
      key: 'ArrowUp',
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    const enterEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    const spaceEvent = new KeyboardEvent('keydown', {
      key: ' ',
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    const options: string[] = ['Option 1', 'Option 2', 'Option 3'];
    const ble = await fixture<BasicListElement>(
      html`<basic-list-element label="List">
        ${options.map(op => html`<p>${op}</p>`)}
      </basic-list-element>`
    );
    const renderedOptions: NodeListOf<HTMLLIElement> | undefined =
      ble.shadowRoot?.querySelectorAll<HTMLLIElement>('.item');
    if (renderedOptions) {
      const theItem = renderedOptions.item(0);
      theItem.focus();
      await ble.updateComplete;
      expect(
        window.getComputedStyle(theItem).backgroundColor ===
        'rgb(197, 243, 255)' ||
        window.getComputedStyle(theItem).backgroundColor === '#c5f3ff'
      ).to.be.true;
      theItem.dispatchEvent(arrowDownEvent);
      await ble.updateComplete;
      expect(
        window.getComputedStyle(renderedOptions.item(1)).backgroundColor ===
        'rgb(197, 243, 255)' ||
        window.getComputedStyle(renderedOptions.item(1)).backgroundColor ===
        '#c5f3ff'
      ).to.be.true;
      renderedOptions.item(1).dispatchEvent(arrowUpEvent);
      await ble.updateComplete;
      expect(
        window.getComputedStyle(renderedOptions.item(1)).backgroundColor
      ).to.be.equal('rgba(0, 0, 0, 0)');
      theItem.dispatchEvent(spaceEvent);
      await ble.updateComplete;
      expect(theItem).to.have.attribute('selected');
      theItem.dispatchEvent(spaceEvent);
      await ble.updateComplete;
      expect(theItem.hasAttribute('selected')).to.be.false;
      theItem.dispatchEvent(enterEvent);
      await ble.updateComplete;
      expect(theItem).to.have.attribute('selected');
    } else {
      throw new Chai.AssertionError('Element failed to render shadow root');
    }
  });

  it('passes the a11y audit', async () => {
    const options: string[] = ['Option 1', 'Option 2', 'Option 3'];
    const ble = await fixture<BasicListElement>(
      html`<basic-list-element label="List">
        ${options.map(op => html`<p>${op}</p>`)}
      </basic-list-element>`
    );

    await expect(ble).shadowDom.to.be.accessible();
  });
});

describe('BasicListElement in disabled state', async () => {
  let disabledBLE: BasicListElement;

  before(async () => {
    disabledBLE = await fixture<BasicListElement>(
      html`<basic-list-element disabled >
      ${['Option 1', 'Option 2', 'Option 3'].map(op => html`<div>${op}</div>`)}
    </basic-list-element>`);
  })

  it('marks items with \'disabled\' attribute', () => {
    expect(disabledBLE.shadowRoot?.querySelectorAll('.item[disabled]')?.length).equal(3);
  });

  it('does not select anything upon click (and fires no selection events)', async () => {
    const capturedEvents = SpyOn<SelectionChangedEvent>(
      disabledBLE,
      500,
      'selection-changed'
    );
    (disabledBLE.items[0] as HTMLElement).click();
    await disabledBLE.updateComplete;
    expect(capturedEvents).to.throw;
    expect(disabledBLE.selected.length).to.equal(0);
  });

  it('has no keyboard navigation', async () => {
    const arrowDownEvent = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    let item1 = disabledBLE.shadowRoot?.querySelectorAll<HTMLElement>('.item').item(0);
    let item2 = disabledBLE.shadowRoot?.querySelectorAll<HTMLElement>('.item').item(1);
    if (item1 && item2) {

      let initialBG = window.getComputedStyle(item1).backgroundColor;

      item1.focus();
      await disabledBLE.updateComplete;
      let selectedBG = window.getComputedStyle(item1).backgroundColor;
      expect(initialBG).equal(selectedBG);

      item1.dispatchEvent(arrowDownEvent);
      await disabledBLE.updateComplete;
      expect(getComputedStyle(item2).backgroundColor).equal(getComputedStyle(item1).backgroundColor).equal(initialBG);

    } else expect.fail(`BLE setup failure`);
  });

});
