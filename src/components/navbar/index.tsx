import Icon from '../icon';
import styles from './styles.module.scss';

type NavBarProps = {
	collapsed: boolean;
	rtl: boolean;
	toggled: boolean;
	handleRtlChange: (rtl: boolean) => void;
	handleCollapsedChange: (collapsed: boolean) => void;
	handleToggleSidebar: (toggle: boolean) => void;
};

export default function Navbar(props: NavBarProps) {
	return (
		<nav className={`${styles.navbar} navbar navbar-dark bg-dark`}>
			<div className="container-fluid">
				<button
					className={`${styles.buttonToggler} navbar-toggler`}
					onClick={() => {
						props.handleToggleSidebar(!props.toggled);
					}}
				>
					<Icon icon="bars"></Icon>
				</button>
					<div className=""></div>
				<a href="#" className="text-end" style={{ float: 'right' }}>
					DEMO
				</a>
				{/* <form className="d-flex">
					<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
					<button className="btn btn-outline-success" type="submit">
						Search
					</button>
				</form> */}
			</div>
		</nav>
	);
}
