import { use, useEffect, useRef, useState } from "react";
import "../styles/global.css";

enum CarouselState {
    STATIC,
    MOVING
}

const { LOCAL_S3_BUCKET } = import.meta.env;
const URL = `${LOCAL_S3_BUCKET}images/big-beach.jpg`


export default function() {
    let [movingState, setMovingState] = useState(CarouselState.STATIC);

    useEffect(() => {
        const TIME = 2000;
        const timer = setInterval(() => {
            setMovingState(previousState => 
                previousState === CarouselState.STATIC ? CarouselState.MOVING : CarouselState.STATIC
            );
        }, TIME);

        return () => clearInterval(timer);
    }, [])

    return (
        <>
        <p></p>
        <div className="w-full h-full relative">
                <img src={URL} 
                alt="Image"
                className={`relative left-0 z-0 transition-all ease-in-out duration-1000
                ${movingState === CarouselState.MOVING ? "left-100" : "left"}`}
                />

                {/* Bottom description */}
                <div className="absolute bottom-0 inset-x-0 h-16 z-0 bg-blue-950 text-white">
                    <span>This is my text description</span>
                </div>

                {/* Left buttom */}
                <div className="absolute left-0 inset-y-16 w-16 bg-blue-950">

                </div>

                {/* Right buttom */}
                <div className="absolute right-0 inset-y-16 w-16 bg-blue-950">
                </div>
        </div>
        </>
    )
}
