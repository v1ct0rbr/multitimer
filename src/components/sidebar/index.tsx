import { progress } from 'bootstrap';
import { useEffect, useRef, useState } from 'react';
import { isEmptyBindingElement } from 'typescript';
import { useTimer } from '../../contexts/TimerContext';

import { decrementTime, formatTime, parseBoolean, removeItemByIndex } from '../../utils/functions';

import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import format from 'date-fns/format';
import { parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from './styles.module.scss';
import Icon from '../icon';
import FormTimer from '../formTimer';

type SideBarProps = {
	collapsed: boolean;
	rtl: boolean;
	toggled: boolean;

	handleToggleSidebar: (value: boolean) => void;
	handleCollapsedChange: (value: boolean) => void;
};

export default function SideBar(props: SideBarProps) {
	/* function formatTimer(timer: TypeTimer) {
		let totalTime = timer.time.hours * 60 * 60 + timer.time.minutes * 60 + timer.time.seconds;
	}
 */
	const { playAlarm, setPlayAlarm } = useTimer();
	const [modalIsOpen, setModalIsOpen] = useState(false);
	function openModal() {
		setModalIsOpen(true);
	}
	function closeModal() {
		setModalIsOpen(false);
	}

	return (
		<div>
			{' '}
			<FormTimer modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} />
			<ProSidebar
				className={styles.sideBar}
				collapsed={props.collapsed}
				rtl={props.rtl}
				toggled={props.toggled}
				breakPoint="md"
				onToggle={props.handleToggleSidebar}
			>
				<SidebarHeader className={styles.sideBarHeader}>
					{/**
					 *  You can add a header for the sidebar ex: logo
					 *
					 */}

					<div className={styles.sideBarTitle}>Multi Timer</div>
				</SidebarHeader>
				<SidebarContent>
					<Menu iconShape="circle">
						<MenuItem icon={<Icon icon="plus" />} onClick={() => openModal()}>
							Adicionar Timer
						</MenuItem>
						<SubMenu title="Options" icon={<Icon icon="cog" />}>
							<MenuItem>
								<div className="form-check form-switch">
									<input
										className="form-check-input"
										type="checkbox"
										id="menu-collapsed"
										value={props.collapsed.toString()}
										defaultChecked={props.collapsed}
										onChange={(val) => {
											props.handleCollapsedChange(!props.collapsed);
										}}
									/>
									<label className="form-check-label" htmlFor="menu-collapsed">
										collapsed
									</label>
								</div>
							</MenuItem>
							<MenuItem>
								<div className="form-check form-switch">
									<input
										className="form-check-input"
										type="checkbox"
										id="checkPlayAlarm"
										value={props.collapsed.toString()}
										defaultChecked={playAlarm}
										onChange={(val) => {
											setPlayAlarm(!playAlarm);
										}}
									/>
									<label className="form-check-label" htmlFor="menu-collapsed">
										Play Alarm
									</label>
								</div>
							</MenuItem>
						</SubMenu>
					</Menu>
				</SidebarContent>
				<SidebarFooter style={{ textAlign: 'center' }}>
					<div
						className="sidebar-btn-wrapper"
						style={{
							padding: '20px 24px',
						}}
					>
					
					</div>
				</SidebarFooter>
			</ProSidebar>
		</div>
	);
}
