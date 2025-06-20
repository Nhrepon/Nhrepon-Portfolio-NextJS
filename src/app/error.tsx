'use client' // Error boundaries must be Client Components

export default function GlobalError({error, reset}:any) {
    return (
        <div className="min-h-screen">
            <h2>Something went wrong! </h2>
            <button onClick={()=>reset()}>Try again</button>
        </div>
)
}