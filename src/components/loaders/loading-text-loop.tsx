import { TextEffect } from "@/core/text-effect";
import { useEffect, useState } from "react";

const LoadingTextLoop = () => {
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoopKey((prevKey) => prevKey + 1); // Update key to trigger re-render
    }, 3000); // Adjust the interval as needed (in milliseconds)

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="flex h-screen w-full text-lg lg:text-4xl justify-center items-center font-medium">
      <TextEffect key={loopKey} per="char" preset="scale">
        Loading current user's credentials...
      </TextEffect>
    </div>
  );
};

export default LoadingTextLoop;
