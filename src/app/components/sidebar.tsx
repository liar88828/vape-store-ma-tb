"use client"
import { House, ScanBarcode, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react";

export const Sidebar: React.FC = () => {
	return (
		<div className="min-h-screen w-full bg-gray-800 text-white p-4 hidden sm:block ">
			<h1 className="text-2xl font-bold mb-6  ">Dashboard</h1>
			<nav>
				<ul className="space-y-4">
					<li>
						<Link
							href="/invoice"
							className="block py-2 px-4 hover:bg-gray-700 rounded"
						>
							Invoices
						</Link>
					</li>
					{/* <li>
                        <Link href="/invoice/form" className="block py-2 px-4 hover:bg-gray-700 rounded">Form</Link>
                    </li> */}
					<li>
						<Link
							href="/product"
							className="block py-2 px-4 hover:bg-gray-700 rounded"
						>
							Product
						</Link>
					</li>
					<li>
						<Link
							href="/scan"
							className="block py-2 px-4 hover:bg-gray-700 rounded"
						>
							Scan
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}
export function BottomNavbar() {
	const path = usePathname()

	return (
		<div className="btm-nav sm:hidden  ">
			<Link
				href="/invoice"
				className={`${path.includes("/invoice") && "active"}`}
			>
				<House />
				<span className={`btm-nav-label  `}>Invoice</span>
			</Link>
			{/* <Link href="/invoice/form">
				<Book />
				<span className="btm-nav-label">Form</span>
			</Link> */}

			<Link
				href="/product"
				className={`${path.includes("/product") && "active"}`}
			>
				<ShoppingCart />
				<span className={`btm-nav-label  `}>Product</span>
			</Link>

			<Link href="/scan" className={`${path.includes("/scan") && "active"}`}>
				<ScanBarcode />
				<span className={`btm-nav-label  `}>Scan</span>
			</Link>
		</div>
	)
}
