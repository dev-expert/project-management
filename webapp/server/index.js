import 'sqreen';
import path from 'path';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import apiProxiesMiddleware from './proxies';
import serverSettings from './settings/serverSettings';
import pageRendering from './pageRendering';

const DAY_DURATION = 24 * 3600 * 1000;
const STATIC_OPTIONS = {
	maxAge: 7 * DAY_DURATION // One week
};

const app = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(cors());
app.use(
	'/media',
	express.static(path.join(__dirname, '../build/media'), STATIC_OPTIONS)
);
app.use(
	'/css',
	express.static(path.join(__dirname, '../build/css'), STATIC_OPTIONS)
);
app.use(
	'/js',
	express.static(path.join(__dirname, '../build/js'), STATIC_OPTIONS)
);
apiProxiesMiddleware(app);
app.get('*', pageRendering);

const server = app.listen(serverSettings.serverPort, () => {
	const serverAddress = server.address();
	console.info(
		`Project Management running at http://localhost:${serverAddress.port}`
	);
});
