'use client';

export default function FloatingPetals() {
    const petals = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${10 + Math.random() * 5}s`,
        size: `${20 + Math.random() * 15}px`,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {petals.map((petal) => (
                <div
                    key={petal.id}
                    className="absolute animate-float-petal"
                    style={{
                        left: petal.left,
                        top: '-50px',
                        animationDelay: petal.delay,
                        animationDuration: petal.duration,
                        fontSize: petal.size,
                        opacity: 0.6,
                    }}
                >
                    🌸
                </div>
            ))}
        </div>
    );
}
