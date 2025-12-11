"use client"

import { NotchNavbar } from "@/components/ui/notch-navbar"
import { Home, User, Briefcase, Mail } from "lucide-react"

export function NotchNavbarDemo() {
    return (
        <div className="w-full h-[300px] relative bg-neutral-100 dark:bg-neutral-950 overflow-hidden rounded-lg">
            <NotchNavbar
                className="!fixed !relative"
                logoSrc="/logo/bg-less.png"
            />
            <div className="pt-20 px-4 text-center text-sm text-muted-foreground">
                <p>Scroll area content goes here</p>
            </div>
        </div>
    )
}

export function NotchNavbarCustomDemo() {
    return (
        <div className="w-full h-[300px] relative bg-neutral-100 dark:bg-neutral-950 overflow-hidden rounded-lg">
            <NotchNavbar
                className="!fixed !relative"
                leftItems={[
                    { label: "Home", href: "#", icon: Home },
                    { label: "About", href: "#", icon: User },
                ]}
                rightItems={[
                    { label: "Work", href: "#", icon: Briefcase },
                    { label: "Contact", href: "#", icon: Mail },
                ]}
                showAuth={false}
            />
        </div>
    )
}
