"use client"
import { SessionProvider } from "next-auth/react"
import React, { type ReactNode } from "react"

export default function SessionProviderLayout({
	children,
}: {
	children: ReactNode
}) {
	return <SessionProvider>{children}</SessionProvider>
}
