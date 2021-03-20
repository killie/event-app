import React, { ReactElement } from 'react';
import Event from './Event';
import { utils } from './../utils/Utils';

interface EventDetailsProps {
    event: Event
}

export default function EventDetails(props: EventDetailsProps): ReactElement {
    return (
        <div className="EventDetails">
            <div className="event-text">{props.event.text}</div>
            <div className="event-period">
                <div className="event-timestamp">{utils.formatDate(props.event.from)}</div>
                <div className="event-timestamp">{props.event.to}</div>
            </div>
        </div>
    );
}
