'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card from "@/components/home/Card";
import ContactMe from "@/components/home/ContactMe";
import Hello from "@/components/home/Hello";
import Role from "@/components/home/Role";
import CustomizeCircular from "./CustomizeCircular";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  useEffect(() => {
    // Create master timeline for HomePage
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.homepage-container',
        start: 'top 90%',
        end: 'bottom 10%',
        toggleActions: 'play none none reverse',
        scrub: false,
      }
    });

    // Animate top row elements (Card and Role)
    masterTimeline
      .fromTo('.card-container', 
        { opacity: 0, x: -80, rotationY: -15 }, 
        { opacity: 1, x: 0, rotationY: 0, duration: 1, ease: 'power2.out' }
      )
      .fromTo('.role-container', 
        { opacity: 0, x: 80, scale: 0.8 }, 
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'back.out(1.7)' }, 
        '-=0.7'
      )
      // Animate bottom row elements (Hello and ContactMe)
      .fromTo('.hello-container', 
        { opacity: 0, y: 60, rotationX: 15 }, 
        { opacity: 1, y: 0, rotationX: 0, duration: 0.8, ease: 'power2.out' }, 
        '-=0.5'
      )
      .fromTo('.contact-container', 
        { opacity: 0, y: 60, rotationX: 15 }, 
        { opacity: 1, y: 0, rotationX: 0, duration: 0.8, ease: 'power2.out' }, 
        '-=0.6'
      );

    // Additional subtle animation for the entire container
    gsap.fromTo('.homepage-container', 
      { opacity: 0 }, 
      { 
        opacity: 1, 
        duration: 0.5,
        scrollTrigger: {
          trigger: '.homepage-container',
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="homepage-container w-full px-2 sm:px-4 my-10 md:my-20">
      {/* About Section (Card and Role) */}
      <div className="z-10 flex flex-col lg:flex-row gap-0 md:gap-10 items-stretch lg:items-end justify-center scale-90 lg:scale-70 mx-5 lg:mx-50">
        <div className="card-container flex items-end justify-center lg:justify-end w-auto">
          <Card />
        </div>
        <div className="role-container flex flex-grow items-end justify-center md:justify-start md:w-auto">
          <Role />
        </div>
      </div>
      
      {/* Contact Section (Hello and ContactMe) */}
      <div className="flex flex-col md:flex-row justify-between my-5 mx-5 xs:my-5 md:my-10 lg:mx-40 z-10 items-center md:items-center gap-4 md:gap-0">
        <div className="hello-container">
          <Hello />
        </div>
        <div className="contact-container">
          <ContactMe />
        </div>
      </div>
    </div>
  );
}