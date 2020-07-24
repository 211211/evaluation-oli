import React from 'react'
import { LogEntry } from 'interfaces'

export interface DebugListProps {
    items: LogEntry[]
}

export const DebugList: React.FC<DebugListProps> = ({ items }) => {

    if (!items || !items.length) {
        return null;
    }

    return (
        <ul>
            {items.map(({ type, message }) => <li key={type}>{type}: <code>{message}</code></li>)}
        </ul>
    )
}
