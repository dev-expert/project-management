import { indexHtml } from './readIndexHtml';

export default (req, res) => {
	res.status(200).send(indexHtml);
};
