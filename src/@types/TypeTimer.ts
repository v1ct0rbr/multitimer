export type Time = {
	hours: number;
	minutes: number;
	seconds: number;
	type?: 'action' | 'break';
};

export type TypeTimer = {
	id: number;
	name: string;
	duration: Time;
	minutesBeforeInterval: number;
	interval: number;
	// editableDuration: number;
	intervalMode: boolean;
};
