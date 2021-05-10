import { SubTimer } from './SubTimer';

export interface CurrentTimer {
	id: number;
	name: string;
	durationString: string;
	duration: number;
	studyTime: number;
	interval: number;
	intervalMode: boolean;
	subTimerList: SubTimer[];
	currentSubtimerIndex: number;
}
