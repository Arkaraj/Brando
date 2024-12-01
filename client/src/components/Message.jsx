import React from 'react';
import { VscWarning } from "react-icons/vsc";

const Message = ({ message }) => {

    const overlay = message.msgError ? 'red' : 'green';

    return (
        <div className={`flex bg-${overlay}-200 p-4 rounded-2xl max-h-16`}>
            <div className="mr-4">
                <div className={`h-10 w-10 text-white bg-${overlay}-600 rounded-full flex justify-center items-center`}>
                    <i className="material-icons"><VscWarning className="font-bold text-2xl" /></i>
                </div>
            </div>
            <div className="flex justify-between w-full">
                <div className={`text-${overlay}-600`}>
                    <p className="mb-2 font-bold">
                        {overlay === "green" ? 'Success' : 'Error'}
                    </p>
                    <p className="text-xs">
                        {message.msg}
                    </p>
                </div>
            </div>
        </div>

    );
}

export default Message;
