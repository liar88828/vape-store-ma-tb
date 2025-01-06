"use client"
import { signIn } from "next-auth/react"
import React from "react"

export default function AuthButton() {
	return <button onClick={() => signIn()}>Sign In</button>
}
