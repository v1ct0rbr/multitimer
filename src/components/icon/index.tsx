
interface IconProps {
	icon: string;
	type?: string;
}


export default function Icon(props: IconProps) {
	/* function formatTimer(timer: TypeTimer) {
		let totalTime = timer.time.hours * 60 * 60 + timer.time.minutes * 60 + timer.time.seconds;
	}
 */

	return (
		<i className={`${props.type == 'fab'? 'fab': 'fas'} fa-${props.icon}`}></i>
	);
}
