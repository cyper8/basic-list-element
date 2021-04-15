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
export async function SpyOn(evtTarget, forTime, ...eventTypes) {
    return new Promise((resolve, failed) => {
        const capturedEvents = new Map();
        setTimeout(() => {
            if (capturedEvents.size) {
                resolve(capturedEvents);
            }
            else {
                failed(new Error(`Timeout - No events happened within ${forTime} ms.`));
            }
        }, forTime);
        eventTypes.forEach(eType => {
            evtTarget.addEventListener(eType, (event) => {
                let registered;
                (registered = capturedEvents.get(eType)) ||
                    capturedEvents.set(eType, (registered = []));
                registered.push(event);
            });
        });
    });
}
//# sourceMappingURL=EventSpy.js.map