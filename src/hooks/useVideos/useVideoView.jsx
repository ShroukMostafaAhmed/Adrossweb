import { useRef } from "react";
import axios from "axios";

export default function useVideoView(videoId) {
  const lastSecondRef = useRef(0);
  const startedRef = useRef(false);

 const send = async (payload) => {
  if (!videoId) return;

  const token = localStorage.getItem("Token"); 

  console.log("Sending video view payload:", payload);

  try {
    const response = await axios.post(
      `https://adros-mrashed.runasp.net/api/Video/${videoId}/view`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          ...(token && {
            Authorization: `Bearer ${token}`
          })
        }
      }
    );

    console.log("Response status:", response.status);
    console.log("Response data:", response.data);
  } catch (err) {
    console.error(
      "Video view tracking error:",
      err?.response?.data || err
    );
  }
};


  return {
    start: async () => {
      if (startedRef.current) return;
      startedRef.current = true;

      await send({
        
        watchedSeconds: 0
      });
    },

    pause: async (second) => {
      lastSecondRef.current = Math.floor(second);

      await send({
       
        watchedSeconds: lastSecondRef.current
      });
    },

    progress: async (second) => {
      const current = Math.floor(second);
      if (current === lastSecondRef.current) return;

      lastSecondRef.current = current;

      await send({
       
        watchedSeconds: current
      });
    },

    complete: async () => {
      await send({
        
        watchedSeconds: lastSecondRef.current
      });
    }
  };
}
