'use client';
import React from 'react'
import { usePathname } from 'next/navigation'

export default function BreadCrumb() {
    const currentPath = usePathname();
  return (
    <div>
        {"Home" + " > " + currentPath.split("/").slice(1).join(" > ")}
    </div>
  )
}
