import React from "react";

interface MessageErrorFormProps {
    errors?: string[]; // Optional array of error messages
}

export const MessageErrorForm: React.FC<MessageErrorFormProps> = ({ errors }) => {

    if (!errors || errors.length === 0) {
        return null;
    }

    return (
        <>
            { errors.map((error, index) => (
                <p className="text-error text-xs" key={ index }>
                    { error }
                </p>
            )) }
        </>
    );
};