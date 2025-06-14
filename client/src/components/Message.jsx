import React from 'react';
import { VscWarning } from 'react-icons/vsc';

const colorMap = {
  red: {
    bg: 'bg-red-200',
    iconBg: 'bg-red-600',
    text: 'text-red-600',
  },
  green: {
    bg: 'bg-green-200',
    iconBg: 'bg-green-600',
    text: 'text-green-600',
  },
};

const Message = ({ message }) => {
  const overlay = message.msgError ? 'red' : 'green';
  const { bg, iconBg, text } = colorMap[overlay];

  return (
    <div className={`flex ${bg} p-4 rounded-2xl max-h-16`}>
      <div className="mr-4">
        <div className={`h-10 w-10 text-white ${iconBg} rounded-full flex justify-center items-center`}>
          <i className="material-icons">
            <VscWarning className="font-bold text-2xl" />
          </i>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className={`${text}`}>
          <p className="mb-2 font-bold">
            {overlay === 'green' ? 'Success' : 'Error'}
          </p>
          <p className="text-xs">{message.msg}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
