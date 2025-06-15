// src/sections/TechStack.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";
import { techStackIcons } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  // we'll scope all GSAP animations to this container
  const skillsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tech-card",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
          stagger: 0.2,
          scrollTrigger: {
            trigger: "#skills",
            start: "top center",
          },
        }
      );
    }, skillsRef);

    return () => ctx.revert(); // cleanup on unmount
  }, []);

  return (
    <div id="skills" ref={skillsRef} className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="🤝 What I Bring to the Table"
        />
        <div className="tech-grid">
          {techStackIcons.map((tech) => (
            <div
              key={tech.name}
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
            >
              <div className="tech-card-animated-bg" />
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <TechIconCardExperience model={tech} />
                </div>
                <div className="padding-x w-full">
                  <p>{tech.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
