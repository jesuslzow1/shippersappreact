import React from 'react'
import {Link} from 'react-router-dom';

export const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/linker/create_request'>Create Request</Link>
                </li>
            </ul>
        </nav>
    )
}
