import parseEnv from './parseEnv';

export default {
    api: parseEnv('API'),
    serverPort: parseEnv('PORT'),
};
