import React, { ReactElement } from 'react';
import Event from './Event';

interface EventsListProps {
    events: Event[]
}

export default function EventsList(props: EventsListProps): ReactElement {

    const events = (events: Event[]) => events.map((event) => {
	return <tr id={event.id}><td>{event.from}</td><td>{event.to}</td><td>{event.text}</td></tr>
    });

    return (
	<table>
	    <thead>
	    <tr><td>From</td><td>To</td><td>Text</td></tr>
	    </thead>
	    <tbody>
	    {events(props.events)}
	    </tbody>
	</table>
    );
}
