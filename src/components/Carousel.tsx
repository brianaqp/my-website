import { use, useEffect, useRef, useState } from "react";
import "../styles/global.css";

const { PUBLIC_API } = import.meta.env;

enum AnimationState { IDLE, MOVING }
enum Direction { LEFT, RIGHT }

const images = [
    "big-beach.jpg",
    "dog.jpg"
];

const getUrlWithIndex = (index: number) => `${PUBLIC_API}images/${images[index]}`


export default function() {
    let [imageIndex, setImageIndex] = useState(0);
    let [animationState, setAnimationState] = useState(AnimationState.IDLE);

    let timerRef = useRef<number | null | NodeJS.Timeout>(null);

    useEffect(() => {
        timerRef.current = setLocalInterval();
 
        // Clean any interval/timer in clean up
        return () => {
            if (timerRef.current != null) {
                clearInterval(timerRef.current);
            }
        }
    }, []);

    const setLocalInterval = () => {
        const TIME = 2000;

        return setInterval(() => {
            move(Direction.RIGHT);
        }, TIME);
    }

    const moveForward = () => {
        setImageIndex(prev => (prev + 1 < images.length ? prev + 1 : 0));
    };

    const moveBackward = () => {
        setImageIndex(prev => (prev - 1 >= 0 ? prev - 1 : images.length - 1))
    }

    const move = (direction: Direction) => {
        setAnimationState(AnimationState.MOVING);

        setTimeout(() => {
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
            default:
                break;
        }

        setAnimationState(AnimationState.IDLE)

        }, 1000);
    }


    return (
        <>
        <p></p>
        <div className="w-full h-full relative">
                <img src={getUrlWithIndex(imageIndex)} 
                alt="Image"
                className={`relative z-0 left-0 transition-all ease-in-out duration-1000 object-contain
                    ${ animationState === AnimationState.MOVING ? "left-100" : "" }
                    `}
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
