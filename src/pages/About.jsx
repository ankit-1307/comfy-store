const About = () => {
    return (
        <>
            <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
                <h1 className="text-4xl font-bold leading-none tracking-tight">
                    {" "}
                    We love
                </h1>
                <div className="bg-primary stats shadow">
                    <div className="stat">
                        <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
                            comfy
                        </div>
                    </div>
                </div>
            </div>
            <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
                At Comfy, you'll find our range of well-designed, affordable
                home furnishing solutions – all waiting to be tried out. This
                way, you can plop down on the sofas, open up the wardrobes and
                feel the rugs to decide what you like best while you’re in the
                store!
            </p>
        </>
    );
};

export default About;
