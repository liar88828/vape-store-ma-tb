import { BottomNavbar, Sidebar } from "@/app/components/sidebar"
import { Toaster } from "react-hot-toast"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className="  min-h-screen sm:grid grid-cols-12">
			<div className="sm:col-span-2">
				<Sidebar />
			</div>
			<div className="col-span-10  p-2 container">{children}</div>
			<BottomNavbar />
			<Toaster />
		</main>
	)
}
