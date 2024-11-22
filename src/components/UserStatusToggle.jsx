import React, { useState } from 'react';
import { Switch } from '@headlessui/react';

const UserStatusToggle = ({ initialStatus, onStatusChange }) => {
  const [status, setStatus] = useState(initialStatus);

  const toggleStatus = () => {
    const newStatus = status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
    setStatus(newStatus);
    onStatusChange(newStatus);
  };

  return (
    <Switch
      checked={status === 'ACTIVE'}
      onChange={toggleStatus}
      className={`${
        status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
    >
      <span className="sr-only">Toggle user status</span>
      <span
        className={`${
          status === 'ACTIVE' ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
      <span className="ml-2 text-xs font-medium text-white">{status}</span>
    </Switch>
  );
};

export default UserStatusToggle;

