import { useState } from 'react';

import { useTimer } from '../../contexts/TimerContext';
import { TypeTimer, Time } from '../../@types/TypeTimer';
import Modal from 'react-modal';

import styles from './styles.module.scss';
import { convertTimerDurationToNumber, generateId } from '../../utils/functions';
import nextId from 'react-id-generator';
import Icon from '../icon';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		zIndex: '1000',
		heigth: '500px !important',
	},
};

interface FormTimerProps {
	modalIsOpen?: boolean;
	closeModal?: () => void;
	openModal?: () => void;
}

export default function FormTimer(props: FormTimerProps) {
	var subtitle;
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [minutesBeforeInterval, setMinutesBeforeInterval] = useState(0);
	const [interval, setIntervalMinutes] = useState(0);
	const [name, setName] = useState('');

	const { setTimerList, timerList, setCurrentTimer, setCurrentTimerIndex, handleCurrentTimerPlay } = useTimer();

	let numberHours = [];
	for (var i = 0; i <= 2; i++) {
		numberHours.push(i);
	}
	let numberMinutes = [];
	for (var i = 0; i <= 59; i++) {
		numberMinutes.push(i);
	}
	let numberSeconds = [];
	for (var i = 0; i <= 59; i++) {
		numberSeconds.push(i);
	}

	function clearForm() {
		setName('');
		setHours(0);
		setMinutes(0);
		setSeconds(0);
		setMinutesBeforeInterval(0);
		setIntervalMinutes(0);
	}

	async function handleAddTimer() {
		let time = { hours: hours, minutes: minutes, seconds: seconds } as Time;
		if (hours == 0 && minutes == 0 && seconds == 0) {
			alert('Duração não pode ser vazia');
			return;
		}
		if (convertTimerDurationToNumber(time) < minutesBeforeInterval * 60) {
			alert('O período de trabalho não pode ser maior que o tempo total');
			return;
		}

		if (minutesBeforeInterval < 1 || interval < 1) {
			alert('Both "working period time and interval must be informed');
			return;
		}

		let newId = generateId();

		const obj = {
			id: newId,
			name: name,
			duration: time,
			minutesBeforeInterval: minutesBeforeInterval,
			interval: interval,
			intervalMode: false,
		} as TypeTimer;

		setTimerList([...timerList, obj]);
		if (timerList.length == 0) {
			handleCurrentTimerPlay(obj);
		}
		props.closeModal();
		clearForm();
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		// subtitle.style.color = '#f00';
	}

	return (
		<div>
			<Modal
				isOpen={props.modalIsOpen}
				/* onAfterOpen={afterOpenModal}
				onRequestClose={closeModal} */
				style={customStyles}
				contentLabel="Example Modal"
				ariaHideApp={false}
			>
				<h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add Timer</h2>

				<div className="modal-body">
					<div className={`${styles.stretch}`}>
						<div className="row">
							<div className="col-sm-12">
								<label htmlFor="name" className="form-label">
									Name
								</label>
								<input
									id="name"
									type="text"
									className="form-control"
									maxLength={100}
									placeholder="name"
									value={name}
									onChange={(val) => {
										setName(val.target.value);
									}}
								/>
							</div>

							<fieldset>
								<legend>Tempo total</legend>
								<div className="row">
									<div className="col-sm-4">
										<label htmlFor="hours" className="form-label">
											Hours
										</label>
										<select
											className="form-control"
											id="hours"
											value={hours}
											onChange={(val) => {
												setHours(Number.parseInt(val.target.value));
											}}
										>
											{numberHours.map((num, idx) => {
												return (
													<option key={idx} value={num}>
														{num}
													</option>
												);
											})}
										</select>
									</div>

									<div className="col-sm-4">
										<label htmlFor="minutes" className="form-label">
											Minutes
										</label>
										<select
											className="form-control"
											value={minutes}
											onChange={(val) => {
												setMinutes(Number.parseInt(val.target.value));
											}}
										>
											{numberMinutes.map((num, idx) => {
												return (
													<option key={idx} value={num}>
														{num}
													</option>
												);
											})}
										</select>
									</div>

									<div className="col-sm-4">
										<label htmlFor="seconds" className="form-label">
											Seconds
										</label>
										<select
											className="form-control"
											value={seconds}
											onChange={(val) => {
												setSeconds(Number.parseInt(val.target.value));
											}}
										>
											{numberSeconds.map((num, idx) => {
												return (
													<option key={idx} value={num}>
														{num}
													</option>
												);
											})}
										</select>
									</div>
								</div>
							</fieldset>

							<fieldset>
								<legend>Internal periods</legend>
								<div className="row">
									<div className="col-sm-8">
										<label htmlFor="minutesBeforeInterval" className="form-label">
											action period time(in minutes)
										</label>
										<select
											className="form-control"
											value={minutesBeforeInterval}
											onChange={(val) => {
												setMinutesBeforeInterval(
													Number.parseInt(
														val.target.value.length > 0 ? val.target.value : '0'
													)
												);
											}}
										>
											{numberMinutes.map((num, idx) => {
												return (
													<option key={idx} value={num}>
														{num}
													</option>
												);
											})}
										</select>
									</div>
									<div className="col-sm-8">
										<label htmlFor="interval" className="form-label">
											Interval period time(min)
										</label>
										<select
											id="interval"
											className="form-control"
											value={interval}
											onChange={(val) => {
												setIntervalMinutes(
													Number.parseInt(
														val.target.value.length > 0 ? val.target.value : '0'
													)
												);
											}}
										>
											{numberMinutes.map((num, idx) => {
												return (
													<option key={idx} value={num}>
														{num}
													</option>
												);
											})}
										</select>
									</div>
								</div>
							</fieldset>
						</div>
					</div>
				</div>
				<div className={`btn-group ${styles.btnGroupForm}`}>
					<button type="button" className="btn btn-secondary" onClick={() => props.closeModal()}>
						<Icon icon="times"></Icon> Close
					</button>
					<button className="btn btn-primary" onClick={() => handleAddTimer()}>
						<Icon icon="plus"></Icon> Add Timer
					</button>
				</div>
			</Modal>
		</div>
	);
}
