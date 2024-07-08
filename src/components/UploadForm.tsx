import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadForm: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [videoContentSummary, setVideoContentSummary] = useState<string>('');
    const [video, setVideo] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleSummaryChange = (e: ChangeEvent<HTMLTextAreaElement>) => setVideoContentSummary(e.target.value);
    const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setVideo(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!video) {
            alert('Please select a video to upload.');
            return;
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('videoContentSummary', videoContentSummary);
        formData.append('video', video);

        const response = await fetch('http://localhost:8000/upload/', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            navigate('/confirmation', {
                state: {
                    title,
                    description: data.description,
                    tags: data.tags,
                },
            });
        } else {
            alert('Error uploading video');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" value={title} onChange={handleTitleChange} required />
            </label>
            <label>
                Video Content Summary:
                <textarea value={videoContentSummary} onChange={handleSummaryChange} required />
            </label>
            <label>
                Video:
                <input type="file" onChange={handleVideoChange} required />
            </label>
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadForm;
