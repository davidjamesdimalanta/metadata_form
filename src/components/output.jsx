import React from 'react';

export default function TerminalDisplay({ formData }) {
  return (
    <div className="terminal-container">
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}
