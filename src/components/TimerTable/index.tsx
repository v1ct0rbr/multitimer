import { useRef, useState } from 'react';
import { CurrentTimer } from '../../@types/CurrentTimer';
import { SubTimer } from '../../@types/SubTimer';

import { useTimer } from '../../contexts/TimerContext';
import { formatTime } from '../../utils/functions';

import styles from './styles.module.scss';

export default function TimerTable() {
	const [fieldEdit, setFieldEdit] = useState('');

	const {
		timerList,
		setTimerList,
		currentTimer,
		currentTimerIndex,
		setCurrentTimerIndex,
		setCurrentTimer,
		setCurrentSubtimer,
		setExecuteState,
		handleCurrentTimerPlay,
		isExecuting,
	} = useTimer();

	/* function handleRemove(index: number) {
		setTimerList(removeItemByIndex(timerList, index));
	} */

	function removeTimer(id) {
		let newTimerList = timerList.filter((timer) => timer.id != id);

		/* console.log(newTimerList);
		console.log(newTimerList[currentTimerIndex]);
		return; */
		let newTimerIndex = 0;

		if (id == currentTimer.id) {
			if (isExecuting) setExecuteState(false);

			if (typeof newTimerList[currentTimerIndex] != 'undefined') {
				handleCurrentTimerPlay(newTimerList[currentTimerIndex]);
				// setCurrentTimer(convertTypeTimerToPlayingTimer(newTimerList[currentTimerIndex]));
			} else if (typeof newTimerList[currentTimerIndex - 1] != 'undefined') {
				newTimerIndex = currentTimerIndex - 1;

				handleCurrentTimerPlay(newTimerList[newTimerIndex]);
				setCurrentTimerIndex[newTimerIndex];
			} else {
				setCurrentTimer({} as CurrentTimer);
				setCurrentSubtimer({editableDuration: 0} as SubTimer);
			}
		} else if (id < currentTimer.id) {
			setCurrentTimerIndex(currentTimerIndex - 1);
		}

		setTimerList(newTimerList);
	}

	return (
		<div className="col-sm-12 col-md-12">
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Duration</th>
						<th scope="col">Working period time (min)</th>
						<th scope="col">Interval period time (min)</th>
						<th scope="col">options</th>
					</tr>
				</thead>
				<tbody>
					{timerList.map((timer, key) => {
						return (
							<tr key={timer.id} className={`${currentTimerIndex == key ? 'table-primary' : ''}`}>
								<td>
									{fieldEdit == `name_${key}`}
									<span>{timer.name}</span>
								</td>
								<td>
									{' '}
									<span className={styles.title}>{formatTime(timer.duration)}</span>{' '}
								</td>
								<td>{timer.minutesBeforeInterval}</td>
								<td>{timer.interval}</td>
								<td>
									<a
										href="#"
										className="btn btn-danger"
										onClick={() => {
											removeTimer(timer.id);
										}}
									>
										<i className="fas fa-trash"></i>
									</a>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

/* function useInterval(callback, delay) {
	const savedCallback = useRef();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}
 */
