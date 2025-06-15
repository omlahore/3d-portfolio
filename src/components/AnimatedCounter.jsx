// src/sections/AnimatedCounter.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { counterItems } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
  const counterRef = useRef(null);
  const countersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      countersRef.current.forEach((counter, index) => {
        const numberElement = counter.querySelector(".counter-number");
        const item = counterItems[index];

        // Set initial value to 0
        gsap.set(numberElement, { innerText: "0" });

        // Create the counting animation
        gsap.to(numberElement, {
          innerText: item.value,
          duration: 2.5,
          ease: "power2.out",
          snap: { innerText: 1 }, // Ensures whole numbers
          scrollTrigger: {
            trigger: "#counter",    // animate when the container enters viewport
            start: "top center",
          },
          // Add the suffix after counting is complete
          onComplete: () => {
            numberElement.textContent = `${item.value}${item.suffix}`;
          },
        });
      });
    }, counterRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="counter" ref={counterRef} className="padding-x-lg xl:mt-0 mt-32">
      <div className="mx-auto grid-4-cols">
        {counterItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => el && (countersRef.current[index] = el)}
            className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center"
          >
            <div className="counter-number text-white-50 text-5xl font-bold mb-2">
              0{item.suffix}
            </div>
            <div className="text-white-50 text-lg">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
