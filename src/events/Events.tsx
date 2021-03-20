import React, { useState, ReactElement } from 'react';
import EventsFilter from './EventsFilter';
import EventsList from './EventsList';
import EventWindow from './EventWindow';
import Event from './Event';
import getEvents from './EventApi';
import { utils, HalForms } from './../utils/Utils';

export default function Events(props: EventsProps): ReactElement {

    const [events, setEvents] = useState<Event[]>([]);

    const [halForms, setHalForms] = useState<HalForms | undefined>();

    const [event, setEvent] = useState<Event | undefined>();

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
                    console.info("Affordances:", response.data); // Keep these
		        }
	        })
	        .catch((response) => console.error(response));
    };

    return (
        <main>
	        <EventsFilter sources={sources} onFilterChange={onFilterChange}>
                <span>yo</span>
            </EventsFilter>
	        <EventsList events={events} onEventClick={setEvent}></EventsList>
            <EventWindow event={event} onClose={() => setEvent(undefined)}></EventWindow>
	    </main>
    );
}

interface EventsProps {
    appName: string;
}
