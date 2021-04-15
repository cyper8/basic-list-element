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
export declare function SpyOn<T extends Event>(evtTarget: EventTarget, forTime: number, ...eventTypes: string[]): Promise<Map<string, T[]>>;
