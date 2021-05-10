import { useEffect, useRef, useState } from 'react';
import { Collapse } from 'react-collapse';

import ReactTooltip from 'react-tooltip';

import { useTimer } from '../../contexts/TimerContext';
import {
	removeItemByIndex,
	formatTime,
	convertDurationToTimeString,
	convertTypeTimerToPlayingTimer,
} from '../../utils/functions';
import FormTimer from '../formTimer';
import Icon from '../icon';
import styles from './styles.module.scss';

export default function Timer() {
	const audioRef = useRef<HTMLAudioElement>(null);
	const previousTimerRef = useRef<HTMLParagraphElement>(null);

	const [fieldEdit, setFieldEdit] = useState('');
	const [modalIsOpen, setIsOpen] = useState(false);

	const [collapseSubtimers, setCollapseSubtimers] = useState(false);

	const {
		timerList,
		setTimerList,
		isExecuting,

		currentSubtimerIndex,
		currentTimer,
		currentSubTimer,
		setExecuteState,

		hasNextSubtimer,
		hasNextTimer,
		hasPreviousTimer,
		executePreviousTimer,
		hasPreviousSubtimer,
		handleCurrentTimerPlay,

		executeNextTimer,

		executeNextSubtimer,
		executePreviousSubtimer,
		setCurrentTimerIndex,
		setCurrentSubtimer,
		playAlarm,
	} = useTimer();

	useEffect(() => {
		const interval = setInterval(() => {
			updateSubtimer();
			// handleCurrentTimerPlay(timerDemo);
		}, 1000);
		return () => clearInterval(interval);
	}, [currentSubTimer, isExecuting]);

	/* 	const interval = setInterval(() => {
		updateSubtimer();
		// handleCurrentTimerPlay(timerDemo);
	}, 1000);
	 */

	const theme = {
		collapse: 'ReactCollapse--collapse',
		content: 'ReactCollapse--content',
	};

	function handleRemove(index: number) {
		setTimerList(removeItemByIndex(timerList, index));
	}

	function handlePauseExecution() {
		setExecuteState(false);
	}

	function handleExecute() {
		setExecuteState(true);
	}

	function handleStop() {
		if (isExecuting) setExecuteState(false);

		if (timerList.length > 0) {
			setCurrentTimerIndex(0);
			handleCurrentTimerPlay(timerList[0]);
		}
	}
	function executeAlarm() {
		if (playAlarm) audioRef.current.play();
	}

	function updateSubtimer() {
		let newSubTimer = 0;

		if (isExecuting && typeof currentSubTimer != 'undefined') {
			if (currentSubTimer.editableDuration > 0) {
				newSubTimer = currentSubTimer.editableDuration - 1;
				if (newSubTimer < 1) {
					executeAlarm();
				}

				setCurrentSubtimer({ ...currentSubTimer, editableDuration: newSubTimer });
				// setCounter(prevCounter => prevCounter + 1)
			} else {
				executeNextSubtimer();
			}
		}
	}

	return (
		<div className={`clock col-sm-6`} style={{ textAlign: 'center' }}>
			<h1
				className={`${styles.clock} ${styles.clockMain} ${
					currentSubTimer.editableDuration < 6
						? styles.textDanger
						: currentSubTimer.editableDuration < 11
						? 'text-warning'
						: ''
				}`}
			>
				{convertDurationToTimeString(currentSubTimer.editableDuration)}
			</h1>
			<span className="tipo" style={{ textAlign: 'right', fontStyle: 'italic' }}>
				<span>
					{'duration' in currentSubTimer ? (currentSubTimer.type == 'action' ? 'Action' : 'Break') : ''}
				</span>

				<span>
					{typeof currentTimer.subTimerList != 'undefined' ? (
						<span>
							Timer {currentSubtimerIndex + 1}/{currentTimer.subTimerList.length}
						</span>
					) : (
						''
					)}
				</span>
			</span>
			<audio ref={audioRef}>
				<source src="/sounds/alarme1.mp3" type="audio/mp3" />
				seu navegador não suporta HTML5
			</audio>
			<div
				className={`${styles.actionButtons} btn-toolbar text-right`}
				style={{ marginBottom: '1rem' }}
				role="toolbar"
				aria-label="Toolbar with button groups"
			>
				<div className="btn-group me-2" role="group" aria-label="First group">
					<button
						title="execute previous timer"
						type="button"
						disabled={!hasPreviousTimer()}
						className="btn btn-light"
						onClick={() => executePreviousTimer()}
					>
						<Icon icon="backward"></Icon>
					</button>
					<button
						title="execute previous subtimer"
						type="button"
						disabled={!hasPreviousSubtimer()}
						className="btn btn-light"
						onClick={() => executePreviousSubtimer()}
					>
						<Icon icon="step-backward"></Icon>
					</button>
					{isExecuting ? (
						<button
							title="pause execution"
							type="button"
							className="btn btn-light"
							onClick={() => handlePauseExecution()}
						>
							<Icon icon={'pause'}></Icon>
						</button>
					) : (
						<button
							type="button"
							title="begin/continue execution"
							className="btn btn-light"
							onClick={() => handleExecute()}
						>
							<Icon icon={isExecuting ? 'pause' : 'play'}></Icon>
						</button>
					)}

					<button title="stop execution" type="button" className="btn btn-light" onClick={() => handleStop()}>
						<i className="fas fa-stop"></i>
					</button>
					<button
						title="play next subtimer"
						disabled={!hasNextSubtimer()}
						type="button"
						className="btn btn-light"
						onClick={() => executeNextSubtimer()}
					>
						<Icon icon="step-forward"></Icon>
					</button>

					<button
						type="button"
						title="play next timer"
						className="btn btn-light"
						disabled={!hasNextTimer()}
						onClick={() => executeNextTimer()}
					>
						<Icon icon="forward"></Icon>
					</button>
				</div>
			</div>
			<div id="current-timer">
				<div className="card">
					{currentTimer.subTimerList ? (
						<div className="card-body">
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<span className={styles.cardTitle}>{currentTimer?.name}</span>
								<a href="#" role="button" onClick={() => setCollapseSubtimers(!collapseSubtimers)}>
									<Icon icon={collapseSubtimers ? 'chevron-up' : 'chevron-down'}></Icon>
								</a>
							</div>
							<Collapse isOpened={collapseSubtimers} theme={theme}>
								<div className="card-text">
									<ul className="list-group">
										{currentTimer.subTimerList.map((timer, idx) => {
											return (
												<li
													className={`list-group-item ${styles.listGroupItem} ${
														currentSubtimerIndex == idx ? 'active' : ''
													} ${currentTimer.subTimerList[idx].duration < 1 ? 'disabled' : ''}`}
													key={idx}
												>
													<span>{timer.type === 'action' ? 'ACTION' : 'BREAK'}</span>
													{currentSubtimerIndex == idx && isExecuting ? (
														<Icon icon="stopwatch"></Icon>
													) : (
														''
													)}
													<span className={styles.clock}>{timer.durationString}</span>
												</li>
											);
										})}
									</ul>
								</div>
							</Collapse>
						</div>
					) : (
						<em>Não há timer ativo</em>
					)}
				</div>
			</div>
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
