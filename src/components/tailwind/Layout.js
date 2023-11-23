"use client"
// Dashboard layout component
// Description: Layout wrapper for dashboard pages
// Used TailwindCSS Components: https://tailwindui.com/components/application-ui/application-shells/dashboard

import { Disclosure, Menu, Transition } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Fragment } from "react"
import Link from "next/link"

// Import hooks and components
import { useAuth } from "@/contexts/AuthContext"
import { auth } from "@/lib/firebase"

// Navigation definition
const navigation = [
    { name: "Analytics", href: "/dashboard/analytics" },
    { name: "Patients", href: "/dashboard" },
    { name: "Schedule", href: "/dashboard/schedule" },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
}

export default function Layout({ children }) {
    // Get user from AuthContext
    const { currentUser } = useAuth()
    // User navigation definition
    const pathname = usePathname()

    return (
        <div className="">
            <Disclosure as="nav" className="bg-[#141414]">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <Image
                                            src="/finniwhite.svg"
                                            alt="Finni"
                                            width={60}
                                            height={60}
                                        />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        pathname === item.href
                                                            ? "bg-[#272727] text-white"
                                                            : "text-gray-300 hover:bg-[#272727] hover:text-white",
                                                        "px-3 py-2 rounded-md text-sm font-medium"
                                                    )}
                                                    aria-current={
                                                        pathname === item.href
                                                            ? "page"
                                                            : undefined
                                                    }
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        {/* Profile dropdown */}
                                        <Menu
                                            as="div"
                                            className="ml-3 relative"
                                        >
                                            <div>
                                                <Menu.Button className="max-w-xs bg-[#272727] rounded-full flex items-center text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                    <span className="sr-only">
                                                        Open user menu
                                                    </span>
                                                    <div className="h-8 w-8 rounded-full bg-[#ED762F] flex items-center justify-center">
                                                        <span className="text-white text-base font-bold">
                                                            {currentUser?.email
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </span>
                                                    </div>
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-gray-100"
                                                                        : "",
                                                                    "block px-4 py-2 text-sm text-[#272727]"
                                                                )}
                                                                onClick={() =>
                                                                    auth.signOut()
                                                                }
                                                            >
                                                                Sign out
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="bg-[#272727] inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#272727] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <XIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <MenuIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            pathname === item.href
                                                ? "bg-[#272727] text-white"
                                                : "text-gray-300 hover:bg-[#272727] hover:text-white",
                                            "block px-3 py-2 rounded-md text-base font-medium"
                                        )}
                                        aria-current={
                                            pathname === item.href
                                                ? "page"
                                                : undefined
                                        }
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                            <div className="pt-4 pb-3 border-t border-[#272727]">
                                <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-[#ED762F] flex items-center justify-center">
                                            <span className="text-white text-base font-bold">
                                                {currentUser?.email
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-sm font-medium text-gray-400">
                                            {currentUser?.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 px-2 space-y-1">
                                    <Disclosure.Button
                                        as="a"
                                        onClick={() => auth.signOut()}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-[#272727]"
                                    >
                                        Sign out
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <div className="flex max-w-7xl py-12 px-4 sm:px-6 lg:px-8 mx-auto">
                {children}
            </div>
        </div>
    )
}
