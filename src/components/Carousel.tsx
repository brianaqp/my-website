import { useEffect, useState } from "react";
import "../styles/global.css";
// import "./general.css";

enum Moving {
    STATIC,
    MOVING
}

export default function() {
    const [image, setImageUrl] = useState("null");
    const [monvingState, setMovingState] = useState(Moving.STATIC);

    const { LOCAL_S3_BUCKET } = import.meta.env;

    const URL = `${LOCAL_S3_BUCKET}images/big-beach.jpg`

    useEffect(() => {

    }, [monvingState])

    // Trigger interval
    useEffect(() => {
        const TIME: Readonly<Number> = 500;
        const timer = setInterval(() => {
            
        }, 500);

        // Return clean up function
        return () => clearInterval(timer);
    }, []) // Run once

    return (
        <>
        <div className="w-full h-full relative">
                <img src={URL} alt="Image" className="relative left-0 z-0 transition-all ease-in-out duration-1000"/>


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
