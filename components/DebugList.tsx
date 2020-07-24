import React from 'react'
import { LogEntry } from '../pages/api/invalidate'

export interface DebugListProps {
    items: LogEntry[]
}

export const DebugList: React.FC<DebugListProps> = ({items}) => {

    if (!items || !items.length) {
        return null;
    }

    return (
        <ul>
            {items.map(({type, message}) => <li>{type}: <code>{message}</code></li>)}
        </ul>
    )

}
