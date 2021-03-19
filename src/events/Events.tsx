import React, { useState, ReactElement } from 'react';
import EventsFilter from './EventsFilter';
import EventsList from './EventsList';
import Event from './Event';
import getEvents from './EventApi';

export default function Events(props: EventsProps): ReactElement {

    const [events, setEvents] = useState([]);

    const sources: string[] = ["hei", "you"];

    const onFilterChange = (fromDate: number, toDate: number, sourceId?: string) => {
	console.info(`filter changed ${props.appName} ${fromDate} ${toDate} ${sourceId}`);
	loadEvents(props.appName, fromDate, toDate);
    };

    const loadEvents = (appName?: string, from?: number, to?: number) => {
	getEvents(appName, from, to)
	    .then((response) => {
		// TODO: Check general response and envelope
		if (response.status === 200) {
		    setEvents(response.data.data);
		}
	    })
	    .catch((response) => console.error(response));
    };
    
    return (
	<main>
	    <EventsFilter sources={sources} onFilterChange={onFilterChange}></EventsFilter>
	    <EventsList events={events}></EventsList>
	</main>
    );
}

interface EventsProps {
    appName: string;
}
