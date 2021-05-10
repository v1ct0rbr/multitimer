import { TimerContextProvider } from '../contexts/TimerContext';
import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


function MyApp({ Component, pageProps }) {
	return (
		<TimerContextProvider>
			<Component {...pageProps} />
		</TimerContextProvider>
	);
}

export default MyApp;
