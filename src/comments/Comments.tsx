import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';
import Event from './../events/Event';
import Comment from './Comment';

interface CommentsProps {
    event: Event;
}

/**
 * Shows comments for one particular event, using HAL-FORMS on event object.
 */
export default function Comments(props: CommentsProps): ReactElement {

    const [comments, setComments] = useState<Comment[]>([]);
    
    useEffect(() => {
        // TODO: _links and _templates should be maps instead of arrays
        if ("_links" in props.event) {
            const eventId = props.event["id"];
            const url = `http://localhost:8000/events/${eventId}/comments`;
            axios.get(url)
                .then((response) => console.info(response))
                .catch(console.error);
            
        } else {
            console.warn("Could not find _links in event object");
        }
    }, []);

    function renderComments(comments: Comment[]) {
        if (comments.length === 0) {
            return <span>No comments.</span>;
        }
        return comments.map((comment) => {
            return (
                <div className="event-comment" key={comment.id}>
                    <div><div>{comment.userId}</div><div>{comment.timestamp}</div></div>
                    <div>{comment.comment}</div>
                </div>
            );
        });
    }

    return <div className="event-comments">{renderComments(comments)}</div>;
}
