import { type NextRequest, NextResponse } from "next/server"
import NextAuth from "next-auth"
import authConfig from "../auth.config"

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req: NextRequest) {
    // console.log(req.url.includes("/login"), "----------")
    // console.log(req.url)
    // -------

    if (!req.url.includes("/login")) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (!req.auth) {
            return NextResponse.redirect(new URL("/login", req.url))
        }
    } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (req.auth) {
            return NextResponse.redirect(new URL("/", req.url))
        }
    }

    // --------
	// Your custom middleware logic goes here
	// console.log(req.auth, "middleware - auth")
    NextResponse.next()
})

// Optionally, don't invoke Middleware on some paths
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
