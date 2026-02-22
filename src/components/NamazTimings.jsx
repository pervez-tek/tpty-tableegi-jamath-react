import React from 'react'
import LiveClock from './LiveClock'
import NamazCards from './NamazCards'

const NamazTimings = () => {
    return (
        <div className="card shadow p-0">
            <div className="card-body p-0 m-0">             
                <LiveClock/>
                <NamazCards/>
            </div>
        </div>
    )
}

export default NamazTimings