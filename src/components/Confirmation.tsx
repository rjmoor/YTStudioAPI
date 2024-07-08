import React from 'react';
import { useLocation } from 'react-router-dom';

interface LocationState {
    title: string;
    description: string;
    tags: string[];
}

const Confirmation: React.FC = () => {
    const location = useLocation();
    const { title, description, tags } = location.state as LocationState;

    return (
        <div>
            <h1>Upload Successful</h1>
            <p>Your video has been uploaded successfully!</p>
            <h2>Video Details</h2>
            <p><strong>Title:</strong> {title}</p>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Tags:</strong> {tags.join(', ')}</p>
        </div>
    );
};

export default Confirmation;
