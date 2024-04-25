'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardIcon, HomeIcon, RocketIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

const links = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Vehicles', href: '/vehicles', icon: RocketIcon },
    { name: 'Maintenance', href: '/maintenance', icon: ClipboardIcon }
]

export default function NavigationBar() {
    const pathname = usePathname();

    return (
        <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-[60px] items-center border-b px-6">
                    <Link className="flex items-center gap-2 font-semibold" href="#">
                        <span className="">Courier VMS</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-4 text-sm font-medium">
                        {links.map(link => {
                            const LinkIcon = link.icon;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={clsx(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                        {
                                            'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50': pathname === link.href
                                        }
                                    )}
                                >
                                    <LinkIcon className="w-6" />
                                    {link.name}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>
        </div>
    )
}