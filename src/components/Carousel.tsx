import { use, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide";
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
        timerRef.current = createLocalInterval();
 
        // Clean any interval/timer in clean up
        return () => {
            if (timerRef.current != null) {
                clearInterval(timerRef.current);
            }
        }
    }, []);

    const createLocalInterval = () => {
        const TIME = 2000;
        return setInterval(() => {
            move(Direction.RIGHT);
        }, TIME);
    }

    // Movement classes
    const setNextImage = () => {
        setImageIndex(prev => (prev + 1 < images.length ? prev + 1 : 0));
    };

    const setPreviousImage = () => {
        setImageIndex(prev => (prev - 1 >= 0 ? prev - 1 : images.length - 1))
    }

    // 1. Omit if animation
    // 2. Set the movement
    // 3. Clear the interval
    // 4. Timeout -> Change the image
    const move = (direction: Direction) => {
        if (animationState === AnimationState.MOVING) 
            return;

        setAnimationState(AnimationState.MOVING);
        
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        
        setTimeout(() => {
            switch (direction) {
                case Direction.LEFT:
                    setPreviousImage();
                    break;
                case Direction.RIGHT:
                    setNextImage();
                    break;
                default:
                    break;
            }

            setAnimationState(AnimationState.IDLE);
            
            timerRef.current = createLocalInterval();
        }, 1000);
    }



    return (
        <>
        <p></p>
        <div className="w-full h-full relative overflow-hidden">
            <img src={getUrlWithIndex(imageIndex)} 
            alt="Image"
            key={imageIndex}
            className={`relative z-0 left-0 transition-all ease-in-out duration-1000 object-contain
                ${ animationState === AnimationState.MOVING ? "opacity-0" : "opacity-100" }
                `}
            />
            {/* Bottom description */}
            <div className="absolute bottom-0 inset-x-0 h-16 z-0 bg-blue-950 text-white">
                <p>Cool text here</p>
            </div>

            {/* Left buttom */}
            <div className="absolute left-0 inset-y-16 w-16 bg-blue-950">
                <p onClick={() => move(Direction.LEFT)}></p>
            </div>

            {/* Right buttom */}
            <div className="absolute right-0 inset-y-16 w-16 bg-blue-950">
                <p onClick={() => move(Direction.RIGHT)}>click me</p>
            </div>
        </div>
        </>
    )
}
