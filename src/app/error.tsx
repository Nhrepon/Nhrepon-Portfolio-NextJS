'use client'
import Link from "next/link"

 // Error boundaries must be Client Components

export default function GlobalError({error, reset}:any) {
    return (
        <div className="min-h-screen flex items-center justify-center flex-col gap-5">
            <h2 className="text-4xl p-5">Something went wrong!</h2>
            <button className="hover:cursor-pointer bg-green-500 rounded-2xl py-4 px-6" onClick={()=>reset()}>Try again</button>
            <Link className="hover:cursor-pointer p-2" href="/">Go to Home</Link>
        </div>
)
}