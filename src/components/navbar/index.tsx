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
				<div className="navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ display: 'flex', flexDirection:'row', justifyContent:'right'}}>
						<li className="nav-item" style={{float: 'right'}}>
							<a
								href="https://www.linkedin.com/in/victor-queiroga/"
								className="nav-link"
								rel="noopener noreferrer"
								target="_blank"
							>
								<Icon type="fab" icon="linkedin" />
								<span> Linked In </span>
							</a>
						</li>

					{/* 	<li className="nav-item">
							<a
								href="https://github.com/v1ct0rbr/multitimer"
								target="_blank"
								className="nav-link"
								rel="noopener noreferrer"
							>
								<Icon type="fab" icon="github" />
								<span> GITHUB</span>
							</a>
						</li> */}
					</ul>
				</div>

				
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
