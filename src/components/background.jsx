import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const Background = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Parallax effect based on mouse position
  const parallaxLayers = [
    { depth: 5, scale: 1.1, blur: 0 },
    { depth: 10, scale: 1.2, blur: 1 },
    { depth: 15, scale: 1.3, blur: 2 },
  ];

  // Nebula clouds with dynamic gradients
  const nebulaClouds = [
    {
      width: 600,
      height: 600,
      x: "10%",
      y: "20%",
      colors: ["rgba(100, 50, 255, 0.2)", "rgba(200, 50, 150, 0.15)", "transparent"],
      duration: 25,
    },
    {
      width: 800,
      height: 800,
      x: "70%",
      y: "60%",
      colors: ["rgba(0, 150, 255, 0.15)", "rgba(0, 200, 200, 0.1)", "transparent"],
      duration: 30,
    },
    {
      width: 500,
      height: 500,
      x: "40%",
      y: "70%",
      colors: ["rgba(255, 100, 50, 0.1)", "rgba(255, 150, 0, 0.1)", "transparent"],
      duration: 20,
    },
  ];

  // Shooting stars
  const shootingStars = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 40,
    angle: Math.random() * 90 - 45,
    duration: 1 + Math.random() * 2,
    delay: Math.random() * 15,
    size: Math.random() * 3 + 1,
  }));

  // Floating asteroids
  const asteroids = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 20 + 10,
    rotate: Math.random() * 360,
    duration: 20 + Math.random() * 30,
    delay: Math.random() * 5,
  }));

  // Pulsing stars in the background
  const stars = Array.from({ length: 150 }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 3 + 1}px`,
    delay: Math.random() * 5,
    opacity: 0.3 + Math.random() * 0.7,
    duration: 3 + Math.random() * 4,
  }));

  // Space particles that respond to mouse
  const spaceParticles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 10 + Math.random() * 20,
  }));

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-900"
    >
      {/* Parallax layers for depth effect */}
      {parallaxLayers.map((layer, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            x: mousePosition.x * layer.depth,
            y: mousePosition.y * layer.depth,
            scale: layer.scale,
            filter: `blur(${layer.blur}px)`,
          }}
        />
      ))}

      {/* Nebula clouds */}
      {nebulaClouds.map((cloud, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-50 blur-3xl"
          style={{
            width: cloud.width,
            height: cloud.height,
            left: cloud.x,
            top: cloud.y,
            background: `radial-gradient(circle, ${cloud.colors.join(", ")})`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Stars twinkling */}
      {stars.map((star, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute bg-white rounded-full"
          style={{
            width: star.size,
            height: star.size,
            left: star.left,
            top: star.top,
            opacity: star.opacity,
          }}
          animate={{ opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={`shooting-${star.id}`}
          className="absolute bg-white"
          style={{
            width: 40,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            rotate: star.angle,
            opacity: 0,
            transformOrigin: "left center",
            boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.7)",
          }}
          animate={{
            opacity: [0, 1, 0],
            x: [0, 500],
            y: [0, 500],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatDelay: star.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Floating asteroids */}
      {asteroids.map((asteroid) => (
        <motion.div
          key={`asteroid-${asteroid.id}`}
          className="absolute rounded-full bg-gray-700 opacity-30"
          style={{
            width: asteroid.size,
            height: asteroid.size,
            left: `${asteroid.x}%`,
            top: `${asteroid.y}%`,
            rotate: asteroid.rotate,
            boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)",
          }}
          animate={{
            x: [0, dimensions.width * 0.1, 0],
            y: [0, dimensions.height * 0.1, 0],
            rotate: [asteroid.rotate, asteroid.rotate + 360],
          }}
          transition={{
            duration: asteroid.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: asteroid.delay,
          }}
        />
      ))}

      {/* Mouse-reactive particles */}
      {spaceParticles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute bg-white rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: 0.6,
          }}
          animate={{
            x: [
              0,
              mousePosition.x * 20,
              mousePosition.x * 10,
              0
            ],
            y: [
              0,
              mousePosition.y * 20,
              mousePosition.y * 10,
              0
            ],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-l from-purple-900/5 to-blue-900/5" />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 30%, black 90%)" />
    </div>
  );
};

export default Background;