"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, Copy } from "lucide-react"
import { useTheme } from "next-themes"
import { Highlight, themes, PrismTheme } from "prism-react-renderer"
import { motion } from "framer-motion"

// Custom VS Code Dark+ inspired theme with subtle refinements (Darker Version)
const vibrantDarkTheme: PrismTheme = {
    plain: {
        color: "#c0c0c0",
        backgroundColor: "transparent",
    },
    styles: [
        {
            types: ["comment", "prolog", "doctype", "cdata"],
            style: {
                color: "#66666e", // Subtle Zinc Grey for comments
            },
        },
        {
            types: ["punctuation"],
            style: {
                color: "#71717a", // Muted punctuation
            },
        },
        {
            types: ["property", "tag", "boolean", "number", "constant", "symbol", "deleted"],
            style: {
                color: "#8abac2", // Soft Teal for numbers/tags
            },
        },
        {
            types: ["tag"],
            style: {
                color: "#4b89bf", // Blue for tags
            },
        },
        {
            types: ["selector", "attr-name", "string", "char", "builtin", "inserted"],
            style: {
                color: "#b58069", // Keep Orange for strings but it's warm
            },
        },
        {
            types: ["attr-name"],
            style: {
                color: "#8ac6e6", // Light Blue
            },
        },
        {
            types: ["operator"],
            style: {
                color: "#71717a", // Muted operator
            },
        },
        {
            types: ["url", "variable"],
            style: {
                color: "#8ac6e6", // Light Blue
            },
        },
        {
            types: ["atrule", "attr-value", "keyword"],
            style: {
                color: "#b078ac", // Purple
            },
        },
        {
            types: ["keyword"],
            style: {
                color: "#4b89bf", // Blue
            },
        },
        {
            types: ["function", "class-name"],
            style: {
                color: "#c5c599", // Yellow
            },
        },
        {
            types: ["class-name"],
            style: {
                color: "#42ad98", // Teal
            },
        },
        {
            types: ["regex", "important"],
            style: {
                color: "#bf5e5e", // Red
            },
        },
    ],
}

function useCopy() {
    const [hasCopied, setHasCopied] = React.useState(false)

    const copy = (text: string) => {
        navigator.clipboard.writeText(text)
        setHasCopied(true)
        setTimeout(() => setHasCopied(false), 2000)
    }

    return { hasCopied, copy }
}

interface CodeBlockProps {
    code: string
    language?: string
    className?: string
    expandable?: boolean
}

export function CodeBlock({ code, language = "bash", className, expandable = false }: CodeBlockProps) {
    const { resolvedTheme } = useTheme()
    const { hasCopied, copy } = useCopy()
    const [isExpanded, setIsExpanded] = React.useState(false)

    return (
        <div className={cn(
            "relative group/code rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-[#161616] shadow-sm",
            className
        )}>
            <div className="absolute right-3 top-3 z-20 opacity-0 group-hover/code:opacity-100 transition-opacity duration-200">
                <button
                    onClick={() => copy(code)}
                    className="flex items-center justify-center w-7 h-7 rounded-md bg-white/10 dark:bg-neutral-800/50 backdrop-blur-md border border-black/5 dark:border-white/10 text-neutral-500 hover:text-foreground transition-all active:scale-95"
                    aria-label="Copy code"
                >
                    {hasCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
            </div>
            <div className={cn(
                "relative text-[14px] font-mono leading-relaxed overflow-x-auto p-4 scrollbar-hide",
                expandable && !isExpanded && "max-h-32 overflow-hidden"
            )}>
                <Highlight
                    theme={resolvedTheme === 'dark' ? vibrantDarkTheme : themes.vsLight}
                    code={code}
                    language={language}
                >
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <pre style={{ ...style, backgroundColor: 'transparent', margin: 0, padding: 0 }}>
                            {tokens.map((line, i) => (
                                <div key={i} {...getLineProps({ line })} className="table-row">
                                    <span className="table-cell select-none text-right w-8 pr-4 text-neutral-400/30 text-xs">
                                        {i + 1}
                                    </span>
                                    <span className="table-cell">
                                        {line.map((token, key) => (
                                            <span key={key} {...getTokenProps({ token })} />
                                        ))}
                                    </span>
                                </div>
                            ))}
                        </pre>
                    )}
                </Highlight>
            </div>
            {expandable && !isExpanded && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-t from-neutral-100 via-neutral-100/40 to-transparent dark:from-[#161616] dark:via-[#161616]/40 dark:to-transparent pt-20">
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="px-4 py-1.5 rounded-full bg-neutral-200/50 dark:bg-neutral-800/50 backdrop-blur-sm text-[12px] font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-300/50 dark:border-neutral-700/50 shadow-sm hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 transition-all hover:scale-105 active:scale-95"
                    >
                        Expand code
                    </button>
                </div>
            )}
            {expandable && isExpanded && (
                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center z-10 pointer-events-none">
                    <button
                        onClick={() => setIsExpanded(false)}
                        className="pointer-events-auto px-4 py-1.5 rounded-full bg-neutral-200/50 dark:bg-neutral-800/50 backdrop-blur-sm text-[12px] font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-300/50 dark:border-neutral-700/50 shadow-sm hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 transition-all hover:scale-105 active:scale-95"
                    >
                        Collapse
                    </button>
                </div>
            )}
        </div>
    )
}

interface DependenciesProps {
    step?: number
    title?: string
    children?: React.ReactNode
}

export const Dependencies = ({ step, title, children }: DependenciesProps) => {
    return (
        <div className="flex flex-col gap-5 relative">
            <div className="absolute flex h-9 w-9 select-none items-center justify-center rounded-full border-[4px] border-background bg-neutral-100 dark:bg-neutral-800 z-10">
                <span className="font-bold text-sm text-foreground">{step}</span>
            </div>
            <div
                className={cn(
                    "ml-[1.125rem]",
                    children && "border-l border-neutral-200 dark:border-neutral-800"
                )}
            >
                <div className="flex flex-col gap-1 pb-12 pl-8 pt-1">
                    <h2 className="font-semibold text-primary/90 leading-none mb-2">{title}</h2>
                    <div className="text-sm text-foreground/80">{children}</div>
                </div>
            </div>
        </div>
    );
};

interface ComponentInstallationProps {
    cli: string
    manual: React.ReactNode
    className?: string
}

export function ComponentInstallation({ cli, manual, className }: ComponentInstallationProps) {
    const [sourceManual, setSourceManual] = React.useState(false)

    return (
        <div className={cn("group relative my-8", className)}>
            <h2
                id="installation"
                className="mt-12 scroll-m-20 border-b border-neutral-200 dark:border-neutral-800 pb-2 !text-3xl !font-bold tracking-tight first:mt-0"
            >
                Installation
            </h2>

            <div className="my-6 flex flex-col gap-2 border-b border-neutral-200 dark:border-neutral-800 xs:flex-row xs:justify-between">
                <div className="relative flex flex-row gap-2">
                    <button
                        className={cn(
                            "relative inline-flex h-9 items-center justify-center gap-1.5 rounded-none px-4 pb-3 pt-2 text-sm font-medium transition-colors outline-none",
                            !sourceManual
                                ? "text-foreground font-semibold"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={() => setSourceManual(false)}
                    >
                        {!sourceManual && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                        <span>CLI</span>
                    </button>
                    <button
                        className={cn(
                            "relative inline-flex h-9 items-center justify-center gap-1.5 rounded-none px-4 pb-3 pt-2 text-sm font-medium transition-colors outline-none",
                            sourceManual
                                ? "text-foreground font-semibold"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={() => setSourceManual(true)}
                    >
                        {sourceManual && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                        <span>Manual</span>
                    </button>
                </div>
            </div>

            <div className="mt-6">
                {!sourceManual ? (
                    <CodeBlock code={cli} />
                ) : (
                    <div className="flex flex-col">
                        {manual}
                    </div>
                )}
            </div>
        </div>
    )
}
