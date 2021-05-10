import nextId from 'react-id-generator';
import { CurrentTimer } from '../@types/CurrentTimer';
import { Time, TypeTimer } from '../@types/TypeTimer';

export function convertTimerDurationToNumber(duration: Time): number {
	const timeNumber = duration.hours * 60 * 60 + duration.minutes * 60 + duration.seconds;

	return timeNumber;
}

export function convertDurationToTimeString(duration: number): string {
	const hours = Math.floor(duration / 3600);
	const minutes = Math.floor((duration % 3600) / 60);
	const seconds = duration % 60;

	const timeString = [hours, minutes, seconds].map((unit) => String(unit).padStart(2, '0')).join(':');

	return timeString;
}

export function convertDurationToTime(duration: number): Time {
	const hours = Math.floor(duration / 3600);
	const minutes = Math.floor((duration % 3600) / 60);
	const seconds = duration % 60;

	const time = { hours: hours, minutes: minutes, seconds: seconds } as Time;

	return time;
}

export function formatTime(time: Time): string {
	let timeString = '';
	if (time != undefined)
		timeString = [time.hours, time.minutes, time.seconds].map((unit) => String(unit).padStart(2, '0')).join(':');

	return timeString;
}

export function decrementTime(time: Time): Time {
	const duration = time.hours * 60 * 60 + time.minutes * 60 + time.seconds - 1;

	const hours = Math.floor(duration / 3600);
	const minutes = Math.floor((duration % 3600) / 60);
	const seconds = duration % 60;

	return { hours: hours, minutes: minutes, seconds: seconds } as Time;
}

export function decrementTime2(duration: number): string {
	const tempDuration = duration - 1;
	const hours = Math.floor(tempDuration / 3600);
	const minutes = Math.floor((tempDuration % 3600) / 60);
	const seconds = tempDuration % 60;
	const timeString = [hours, minutes, seconds].map((unit) => String(unit).padStart(2, '0')).join(':');
	return timeString;
}

export function testTimeEnded(time: Time) {
	return time.hours < 1 && time.minutes < 1 && time.seconds < 1;
}

export function removeItemByIndex(array: Array<TypeTimer>, index: number): Array<TypeTimer> {
	let newArray = [...array];

	newArray.splice(index, 1)[0];
	return newArray;
}

export function parseBoolean(value: string): boolean {
	return value == 'true' ? true : false;
}

export function convertTypeTimerToPlayingTimer(timer: TypeTimer): CurrentTimer {
	let duration = convertTimerDurationToNumber(timer.duration);
	let convertedTimer = {
		id: timer.id,
		duration: duration,
		durationString: convertDurationToTimeString(duration),
		interval: timer.interval,
		studyTime: timer.minutesBeforeInterval,
		intervalMode: false,
		name: timer.name,
		currentSubtimerIndex: 0,
	} as CurrentTimer;

	return convertedTimer;
}

export function generateId(): Number {
	return Number.parseInt(nextId());
}
