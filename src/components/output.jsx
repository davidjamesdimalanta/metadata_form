import React from 'react';

export default function TerminalDisplay({ formData }) {
  return (
    <div className="terminal-container">
      <pre>export const metadata = {JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}
