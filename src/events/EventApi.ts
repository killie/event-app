import axios from 'axios';

const service = "http://localhost:8000/events";

export default function getEvents(
    appName?: string,
    from?: number,
    to?: number
): Promise<any> {
    let url = service;
    let char = "?";
    if (appName !== null) {
	url += `${char}appName=${appName}`;
	char = "&";
    }
    if (from !== null) {
	url += `${char}from=${from}`;
	char = "&";
    }
    if (to !== null) {
	url += `${char}to=${to}`;
    }

    return new Promise((resolve, reject) => axios.get(url).then(resolve).catch(reject));
};
