/**
 * SpyOn function creates series of spies for event list
 *
 * @export
 * @template T - class of Events returned
 * @param {EventTarget} evtTarget - where events are to be fired and caught
 * @param {number} forTime - watchdog timer to wait for events before autorejection
 * @param {...string[]} eventTypes - to listen for
 * @returns {Promise<Map<string,T[]>>} Promise of a Map of Events, sorted by type
 */
export async function SpyOn<T extends Event>(
  evtTarget: EventTarget,
  forTime: number,
  ...eventTypes: string[]
): Promise<Map<string, T[]>> {
  return new Promise(
    (
      resolve: (value: Map<string, T[]>) => void,
      failed: (reason: Error) => unknown
    ) => {
      const capturedEvents = new Map<string, T[]>();
      setTimeout(() => {
        if (capturedEvents.size) {
          resolve(capturedEvents);
        } else {
          failed(
            new Error(`Timeout - No events happened within ${forTime} ms.`)
          );
        }
      }, forTime);
      eventTypes.forEach(eType => {
        evtTarget.addEventListener(eType, (event: Event) => {
          let registered;
          (registered = capturedEvents.get(eType)) ||
            capturedEvents.set(eType, (registered = []));
          registered.push(event as T);
        });
      });
    }
  );
}
