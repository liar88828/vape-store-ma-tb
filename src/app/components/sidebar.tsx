import Link from "next/link";


export const Sidebar: React.FC = () => {
    return (
        <div className="min-h-screen w-full bg-gray-800 text-white p-4 hidden sm:block ">
            <h1 className="text-2xl font-bold mb-6  ">Dashboard</h1>
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link href="/invoice" className="block py-2 px-4 hover:bg-gray-700 rounded">Invoices</Link>
                    </li>
                    <li>
                        <Link href="/invoice/form" className="block py-2 px-4 hover:bg-gray-700 rounded">Form</Link>
                    </li>
                    <li>
                        <Link href="/product" className="block py-2 px-4 hover:bg-gray-700 rounded">Product</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};



