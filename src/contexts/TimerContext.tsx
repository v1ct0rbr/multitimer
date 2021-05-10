import { createContext, ReactNode, useContext, useState } from 'react';
import { TypeTimer } from '../@types/TypeTimer';
import { CurrentTimer } from '../@types/CurrentTimer';
import { convertDurationToTimeString, convertTimerDurationToNumber, removeItemByIndex } from '../utils/functions';

import { SubTimer } from '../@types/SubTimer';

type TimerContextData = {
	timerList: TypeTimer[];
	currentTimerIndex: number;
	currentTimer: CurrentTimer;
	currentSubtimerIndex: number;
	currentSubTimer: SubTimer;

	isExecuting: boolean;
	toggleExecute: () => void;
	// execute: (timer: TypeTimer) => void;
	setExecuteState: (state: boolean) => void;
	// executeList: (list: TypeTimer[], index: number) => void;
	executeNextTimer: () => boolean;
	executePreviousTimer: () => boolean;
	executePreviousSubtimer: () => boolean;
	executeNextSubtimer: () => boolean;
	clearExecuteState: () => void;
	setCurrentTimer: (timer: CurrentTimer) => void;
	setCurrentTimerIndex: (index: number) => void;
	setCurrentSubtimer: (subtimer: SubTimer) => void;
	setCurrentSubtimerIndex: (index: number) => void;
	setTimerList: ([]) => void;
	hasPreviousTimer: () => boolean;
	hasNextTimer: () => boolean;
	hasNextSubtimer: () => boolean;
	hasPreviousSubtimer: () => boolean;
	timerHasEnded: () => boolean;
	handleCurrentTimerPlay: (timer: TypeTimer) => void;

	playAlarm: boolean;
	setPlayAlarm: (unmute: boolean) => void;
};

export const TimerContext = createContext({} as TimerContextData);

type TimerContextProviderProps = {
	children: ReactNode;
};

export function TimerContextProvider({ children }: TimerContextProviderProps) {
	const [timerList, setTimerList] = useState([]);
	const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
	const [isExecuting, setIsExecuting] = useState(false);
	const [currentTimer, setCurrentTimer] = useState({} as CurrentTimer);
	const [currentSubtimerIndex, setCurrentSubtimerIndex] = useState(0);
	const [currentSubTimer, setCurrentSubtimer] = useState({} as SubTimer);
	const [playAlarm, setPlayAlarm] = useState(true);

	/* function executeList(list: TypeTimer[], index: number) {
		setTimerList(list);
		setCurrentTimerIndex(index);
	} */

	function toggleExecute() {
		if (currentTimer == null) {
			setCurrentTimer(null);
		}
		setIsExecuting(!isExecuting);
	}
	function setExecuteState(state: boolean) {
		setIsExecuting(!isExecuting);
	}

	function clearExecuteState() {
		setTimerList([]);
		setCurrentTimerIndex(0);
	}

	function timerHasEnded(): boolean {
		return currentTimer.subTimerList[currentSubtimerIndex].editableDuration < 1;
	}

	function handleCurrentTimerPlay(timer: TypeTimer) {
		let duration = convertTimerDurationToNumber(timer.duration);
		let current = {
			id: timer.id,
			duration: duration,
			durationString: convertDurationToTimeString(duration),
			interval: timer.interval,
			studyTime: timer.minutesBeforeInterval,
			intervalMode: false,
			name: timer.name,
			currentSubtimerIndex: 0,
		} as CurrentTimer;
		current.subTimerList = generateSubtimers(current);

		setCurrentTimer(current);
		setCurrentSubtimerIndex(0);
		setCurrentSubtimer(current.subTimerList[0]);
	}

	const hasPreviousSubtimer = () => {
		return currentSubtimerIndex > 0;
	};

	const hasNextSubtimer = () => {
		if (typeof currentTimer.subTimerList != 'undefined')
			return currentSubtimerIndex < currentTimer.subTimerList.length - 1;

		return false;
	};

	const hasPreviousTimer = () => currentTimerIndex > 0;

	const hasNextTimer = () => {
		return currentTimerIndex < timerList.length - 1;
	};

	function executeNextTimer(): boolean {
		if (hasNextTimer()) {
			const newIndex = currentTimerIndex + 1;
			setCurrentTimerIndex(newIndex);
			handleCurrentTimerPlay(timerList[newIndex]);
			return true;
		}
		return false;
	}

	function executePreviousTimer(): boolean {
		if (hasPreviousTimer()) {
			const newIndex = currentTimerIndex - 1;
			setCurrentTimerIndex(newIndex);
			handleCurrentTimerPlay(timerList[newIndex]);
			return true;
		}
		return false;
	}

	function executePreviousSubtimer(): boolean {
		if (hasPreviousSubtimer()) {
			const newIndex = currentSubtimerIndex - 1;
			setCurrentSubtimer({ ...currentTimer.subTimerList[newIndex] });
			setCurrentSubtimerIndex(newIndex);
			// return timerList[newIndex];
			return true;
		}
		return false;
	}

	function executeNextSubtimer(): boolean {
		if (hasNextSubtimer()) {
			const newIndex = currentSubtimerIndex + 1;
			setCurrentSubtimer({ ...currentTimer.subTimerList[newIndex] });
			setCurrentSubtimerIndex(newIndex);
			// return timerList[newIndex];
			return true;
		} else if (hasNextTimer) {
			return executeNextTimer();
		}
		return false;
	}

	function generateSubtimers(timer: CurrentTimer): Array<SubTimer> {
		let resto = timer.duration;
		let subTimers = [] as Array<SubTimer>;

		let studyTurn = true;

		while (resto > 0) {
			let subTimer = {} as SubTimer;
			let time = 0;
			if (studyTurn) {
				time = timer.studyTime * 60;
				if (time <= resto) {
					resto -= time;
					subTimer.duration = time;
				} else {
					subTimer.duration = resto;
					resto = 0;
				}
			} else {
				time = timer.interval * 60;
				if (time <= resto) {
					resto -= time;
				} else {
					resto = 0;
				}
				subTimer.duration = time;
			}

			subTimer.editableDuration = subTimer.duration;
			subTimer.durationString = convertDurationToTimeString(subTimer.duration);
			subTimer.type = studyTurn ? 'action' : 'break';
			studyTurn = !studyTurn;
			subTimers.push(subTimer);
		}

		if (subTimers[subTimers.length - 1].type === 'action') {
			let newSubTimer = {
				duration: timer.duration,
				editableDuration: timer.duration,
				durationString: convertDurationToTimeString(timer.interval * 60),
				type: 'break',
			} as SubTimer;
			subTimers.push(newSubTimer);
		}

		return subTimers;
	}

	return (
		<TimerContext.Provider
			value={{
				timerList,
				setTimerList,
				executePreviousSubtimer,
				executeNextSubtimer,
				currentTimerIndex,
				currentSubTimer,
				currentSubtimerIndex,
				isExecuting,
				toggleExecute,
				setExecuteState,
				clearExecuteState,
				executeNextTimer,
				executePreviousTimer,
				hasPreviousTimer,
				hasNextTimer,
				hasNextSubtimer,
				hasPreviousSubtimer,
				currentTimer,
				setCurrentTimer,
				timerHasEnded,
				setCurrentTimerIndex,
				setCurrentSubtimerIndex,
				setCurrentSubtimer,
				handleCurrentTimerPlay,
				playAlarm,
				setPlayAlarm,
			}}
		>
			{children}
		</TimerContext.Provider>
	);
}

export const useTimer = () => {
	return useContext(TimerContext);
};
