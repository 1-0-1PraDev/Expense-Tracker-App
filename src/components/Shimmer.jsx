import React from 'react'

export const Shimmer = ({ rows }) => {
    return (
        <div className="shimmer-wrapper">
            {Array.from({ length: rows }).fill().map((_, ind) => (
                <div key={ind} className="shimmer"></div>
            ))}
        </div>
    )
}
