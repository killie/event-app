import React, { ReactElement } from 'react';
import Event from './Event';
import { utils } from './../utils/Utils';

interface EventsListProps {
    events: Event[],
    onEventClick: (event: Event) => void
}

export default function EventsList(props: EventsListProps): ReactElement {

    const events = (events: Event[]) => events.map((event) => {
	    return <tr key={event.id} onClick={() => props.onEventClick(event)}>
            <td>{utils.formatDate(event.from)}</td>
            <td>{utils.formatDate(event.to)}</td>
            <td>{event.text}</td>
            </tr>
    });

    return (
        <table className="EventsList">
	        <thead>
	            <tr><td>From</td><td>To</td><td>Text</td></tr>
	        </thead>
	        <tbody>
    	        {events(props.events)}
	        </tbody>
	    </table>
    );
}
