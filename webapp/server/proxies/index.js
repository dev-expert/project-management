import proxyBuilder from './proxyBuilder';
import serverSettings from '../settings/serverSettings';
import clientSettings from '../settings/clientSettings';

export default app => {
    app.use(
        clientSettings.api,
        proxyBuilder(serverSettings.api, clientSettings.api, {ws: true})
    );
    
};
