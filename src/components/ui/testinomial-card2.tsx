"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { FaTwitter } from "react-icons/fa";
import {useTheme} from "next-themes"

interface TestimonialItem {

    /** Title displayed for the card */
    title: string;
    company?: string
    /** Description text for the card */
    description: string;
    /** Image URL/path for the card */
    image: string;
    /** Addidtional content like images or others */
    content?: React.ReactNode | string;
    big?: boolean
}


interface TestimonialsCardProps {
    /** Array of testimonial items to display */
    items: TestimonialItem;
    /** Additional CSS classes for the container */
    className?: string;


}

export function TestimonialsCard2({ items, className }: TestimonialsCardProps) {

    const {theme} = useTheme();
    const [pos , setPos] = useState({x : 0 , y: 0});
    const [hoverEffect , setHoverEffect] = useState(false);
    const color = theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba( 0 , 0 , 0,0.1)" ;

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) =>{
    setHoverEffect(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({x : e.clientX - rect.left, y : e.clientY - rect.top })
        }
    return (
        <div className={cn("flex flex-row gap-1", className)}>
         
                        <Link href='/' >
                            <div className={cn("flex flex-col items-center  md:p-2 w-80 h-36 border border-zinc-200 dark:border-zinc-800 rounded-lg relative overflow-hidden   cursor-pointer " )}
                            onMouseMove={handleMouse}
                            onMouseLeave={() =>setHoverEffect(false)}
                            style={{
                                background: hoverEffect ? `radial-gradient(circle at ${pos.x}px ${pos.y}px, ${color} , transparent 70%)`: "",
                            }}
                            >
                            <div className="pt-2">
                                    <div className="flex gap-2 justify-end">
                                <span className=" border border-zinc-200 dark:border-zinc-800 py-1 px-3 rounded-lg text-[16px] text-foreground/70 hover:text-foreground">{items.title}</span>
                                    <div className="rounded-full relative overflow-hidden size-8 ">
                                    <img
                                        src={items.image}
                                        alt={`image + ${items.title}`}
                                        className="w-full h-full object-cover"
                                        draggable={false}
                                    />
                                    </div>
                                </div>
                                <p className="pt-4 text-balance">{items.description}</p>
                            </div>
                            </div>
                        </Link>
                 
        </div>
        
    )

}

export default TestimonialsCard2;
