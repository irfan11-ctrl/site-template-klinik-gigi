export const LANDING_PAGE_PRESET = {
    isPremium: true,
    meta: {
        title: "Aether Engine",
        description: "The next generation of high-performance digital architectures.",
        theme: {
            mode: "dark",
            primary: "#6366f1"
        }
    },
    content: [
        {
            id: "hero",
            type: "hero",
            animation: "fade-up",
            styles: {
                padding: 220
            },
            data: {
                headline: "Design Without Boundaries.",
                subheadline: "WebBuilder v4.0 delivers pixel-perfect, high-performance architectures with an integrated Express.js backend. Experience true creative freedom.",
                ctaText: "Start Deployment",
                ctaLink: "#features",
                imageUrl: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=2664&auto=format&fit=crop"
            }
        },
        {
            id: "features",
            type: "features",
            animation: "fade-up",
            styles: {
                backgroundColor: "#020617",
                padding: 120
            },
            data: {
                title: "Engineering Excellence",
                items: [
                    { title: "Full-Stack Ops", desc: "Automated Express.js and Node logic generation.", icon: "server" },
                    { title: "Elite Motion", desc: "GSAP-powered cinematic interactions out of the box.", icon: "wind" },
                    { title: "0ms Latency", desc: "Ultra-fast vanilla output optimized for Core Web Vitals.", icon: "zap" }
                ]
            }
        }
    ]
};
