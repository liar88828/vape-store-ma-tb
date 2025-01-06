import React from "react"

export default async function layout({ children }: { children: React.ReactNode }) {
    // const session = await auth()
    // console.log(session, "layouts")
    // if (session && session.user?.email) {
    // 	redirect("/invoice")
    // }
	return <div className="pt-20 flex justify-center">{children}</div>
}
