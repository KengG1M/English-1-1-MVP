import React from 'react';

const ComingSoonFeature: React.FC = () => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        fontFamily: 'sans-serif'
    }}>
        <h1>Coming Soon</h1>
        <p>This feature is under development. Stay tuned!</p>
    </div>
);

export default ComingSoonFeature;