'use client'
import TestimonialsCard2 from "@/components/ui/testinomial-card2";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { useEffect, useRef } from "react";


const demoItems = [
    {
        title: "Satish S.",
        company: 'solUI',
        description: "Beautiful mountain scenery with snow-capped peaks.",
        image: "/Avatar11.jpg",
    },
    {

        title: "Ashutosh ",
        description: "A stunning piece of modern abstract artwork.",
        image: "/Avatar6.jpg",
        big: true
    },
    // {

    //     title: "Nature Photography",
    //     description: "Capturing the essence of natural beauty.",
    //     image: "/186330c41b3d12d96bdaa03e0c0db30d.jpg",
    // },
    // {

    //     title: "Digital Creation",
    //     description: "Innovative digital art and design concepts.",
    //     image: "/f318d62afa39731a0a371388d400a773.jpg",
    // },
];

export const TestimonialSection = () => {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    const base_speed = 40;
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    })

    const direction = useTransform(smoothVelocity, v => {
        if (v > 0) return -1;
        if (v < 0) return 1
        return -1
    })


    const lastY = useRef(0)
    useEffect(() => {
        return scrollY.on('change', (y) => {
            const diff = y - lastY.current

            if (diff > 0) direction.set(-1)
            else if (diff < 0) direction.set(1)
            lastY.current = y

        })
    }, [scrollY, direction])

    const x1 = useMotionValue(0);
    const x2 = useMotionValue(0)
    const x3 = useMotionValue(0)

    useAnimationFrame((t, delta) => {
        const autoMove = direction.get() * base_speed * (delta / 1000)
        const movedBy = direction.get() * (delta / 30)

        x1.set(x1.get() + movedBy + autoMove)
        x2.set(x2.get() - movedBy - autoMove)
        x3.set(x3.get() + movedBy * 0.7 + autoMove)
    })

    return (
        <div className=" max-h-screen  mb-10 md:mb-30 md:gap-8 overflow-hidden touch-pan-y w-full">

           

            <motion.div
                // style={{ x: x2 }}

                className="flex gap-1  md:overflow-hidden justify-center">
                {
                    demoItems.length > 0 && demoItems.map((el, id) => {
                        return (

                            <TestimonialsCard2 items={el} key={id} />
                        )
                    })
                }
            </motion.div>

        </div>
    )
}