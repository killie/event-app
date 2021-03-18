import React, { ReactElement } from 'react';
import EventsFilter from './EventsFilter';
import EventsList from './EventsList';
import Event from './Event';

export default function Events(props: EventsProps): ReactElement {

    const sources: string[] = ["hei", "you"];

    const onFilterChange = (fromDate: number, toDate: number, sourceId?: string) => {
	console.info(`filter changed ${props.appName} ${fromDate} ${toDate} ${sourceId}`);
    };

    const events: Event[] = [
	{from: 1, to: 2, text: "Hey"},
	{from: 5, to: 6, text: "Ho"}
    ];
    
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
