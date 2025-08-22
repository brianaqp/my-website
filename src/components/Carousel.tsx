import { use, useEffect, useRef, useState } from "react";
import "../styles/global.css";

const { PUBLIC_API } = import.meta.env;

enum Direction { RIGHT, LEFT }

const images = [
    "big-beach.jpg",
    "dog.jpg"
];

const getUrlWithIndex = (index: number) => `${PUBLIC_API}images/${images[index]}`


export default function() {
    let [indexImage, setIndexImage] = useState(0);
    let timerRef = useRef<number | null | NodeJS.Timeout>(null);

    useEffect(() => {
        timerRef.current = setLocalInterval();
 
        // Clean any interval in clean up
        return () => {
            if (timerRef.current != null) {
                clearInterval(timerRef.current)
            }
        }
    }, []);

    const setLocalInterval = () => {
        const TIME = 2000;

        return setInterval(() => {
            moveForward();
        }, TIME);
    }

    const moveForward = () => {
        setIndexImage(prev => (prev + 1 < images.length ? prev + 1 : 0));
    };

    const moveBackward = () => {
        setIndexImage(prev => (prev - 1 >= 0 ? prev - 1 : images.length - 1))
    }

    const move = (direction: Direction) => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = setLocalInterval();
        }
        switch (direction) {
            case Direction.LEFT:
                moveBackward();
                break;
            case Direction.RIGHT:
                moveForward();
                break;
        }
    }


    return (
        <>
        <p></p>
        <div className="w-full h-full relative">
                <img src={getUrlWithIndex(indexImage)} 
                alt="Image"
                className={`relative left-0 z-0 transition-all ease-in-out duration-1000`}
                />

                {/* Bottom description */}
                <div className="absolute bottom-0 inset-x-0 h-16 z-0 bg-blue-950 text-white">
                    <span>This is my text description</span>
                </div>

                {/* Left buttom */}
                <div className="absolute left-0 inset-y-16 w-16 bg-blue-950">
                    <p onClick={() => move(Direction.LEFT)}>click me</p>
                </div>

                {/* Right buttom */}
                <div className="absolute right-0 inset-y-16 w-16 bg-blue-950">
                    <p onClick={() => move(Direction.RIGHT)}>click me</p>
                </div>
        </div>
        </>
    )
}
