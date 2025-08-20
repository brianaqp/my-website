import { useState } from "react";
import "../styles/global.css";

export default function() {
    const [image, setImageUrl] = useState("null");
    const { LOCAL_S3_BUCKET } = import.meta.env;

    const URL = `${LOCAL_S3_BUCKET}images/big-beach.jpg`

    return (
        <>
        <div className="w-full h-full relative">
            <div id="image-container">
                <img src={URL} alt="Image" />
            </div>
            {/* Stick with the nearest father */}
            {/* First the background */}
            <div className="absolute inset-0 bg-transparent hover:bg-gray-100 hover:opacity-10 z-100" />

            {/* Bottom description */}
            <div className="absolute bottom-0 inset-x-0 h-16 z-0 bg-blue-950 text-white">
                <span>This is my text description</span>
            </div>
        </div>
        </>
    )
}