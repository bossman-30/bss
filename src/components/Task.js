import React from 'react';

const Task = () => {
    return (
        <div className="task">
            <h2>Complete Task to Claim Tokens</h2>
            <p>Task: Follow us on Twitter to claim your airdrop tokens!</p>
            <button onClick={() => alert('Task Completed! Claim your tokens.')}>
                Mark as Done
            </button>
        </div>
    );
}

export default Task;
