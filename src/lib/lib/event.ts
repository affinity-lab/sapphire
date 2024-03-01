
export type Event = {
	type: number,
	data?: any
}

export type EventCallback = (e: Event) => void;


class EventEmitter {
	protected subscriptions: Record<number, Array<EventCallback>> = {};

	subscribe(type: number, callback: EventCallback) {
		if (!this.subscriptions.hasOwnProperty(type)) this.subscriptions[type] = [];
		this.subscriptions[type].push(callback);
	}

	emit(e: number, data?: any): void;
	emit(e: Event): void;
	emit(e: Event | number, data?: any): void {
		if (typeof e == 'number') e = {type: e, data}
		for (let subscribedFn of this.subscriptions[e.type] || []) subscribedFn(e);
	}
}

export const emitter = new EventEmitter();
