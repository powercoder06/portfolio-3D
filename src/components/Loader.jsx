import { Html, useProgress } from "@react-three/drei";
import { useState, useEffect } from "react";

const CanvasLoader = () => {
  const { progress } = useProgress();
  const [dots, setDots] = useState("");

  // Random enhancement: animated ellipsis and dynamic color shift
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Change color smoothly based on progress
  const hue = Math.round((progress / 100) * 360);
  const dynamicColor = `hsl(${hue}, 80%, 60%)`;

  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backdropFilter: "blur(4px)",      
        backgroundColor: "rgba(0,0,0,0.4)",
        padding: 20,
        borderRadius: 12,
      }}
    >
      <div
        className="canvas-loader"
        style={{
          border: `4px solid ${dynamicColor}`,
          borderTop: `4px solid transparent`,          
          borderRadius: "50%",
          width: 50,
          height: 50,
          animation: "spin 1s linear infinite",
        }}
      />
      <p
        style={{
          fontSize: 14,
          color: dynamicColor,
          fontWeight: 800,
          marginTop: 16,
        }}
      >
        {progress.toFixed(2)}%{dots}
      </p>

      <style>
        {`@keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Html>
  );
};

export default CanvasLoader;
