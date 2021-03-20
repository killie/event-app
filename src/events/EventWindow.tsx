import React, { ReactElement } from 'react';
import Event from './Event';
import EventDetails from './EventDetails';
import Comments from './../comments/Comments';

interface EventWindowProps {
    event?: Event,
    onClose: () => void,
}

export default function EventWindow(props: EventWindowProps): ReactElement {
    const displayEvent = () => {
        if (props.event === undefined) {
            return <div></div>;
        }
        return (
            <div className="EventWindow">
                <div className="window-border">
                  <button className="close-button" onClick={() => props.onClose()}>x</button>
                </div>
                <EventDetails event={props.event}></EventDetails>
                <Comments event={props.event}></Comments>
            </div>
        );
    };
    
    return displayEvent();
}
