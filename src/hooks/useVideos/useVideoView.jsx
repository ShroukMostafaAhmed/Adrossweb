import { useRef } from "react";
import axios from "axios";

export default function useVideoView(videoId) {
  const lastSecondRef = useRef(0);
  const startedRef = useRef(false);
  const completedRef = useRef(false);

  const send = async (payload) => {
    if (!videoId) return;

    const token = localStorage.getItem("Token");

    try {
      const response = await axios.post(
        `https://adros-mrashed.runasp.net/api/Video/${videoId}/view`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
          }
        }
      );

      console.log("Video tracking sent:", payload, response.data);
    } catch (err) {
      console.error("Video tracking error:", err?.response?.data || err);
    }
  };

  return {
    // start بس للـ internal tracking، مش هتبعت للباك
    start: () => {
      if (startedRef.current) return;
      startedRef.current = true;
      lastSecondRef.current = 0;
    },

    // pause: ابعت آخر ثانية للباك
    pause: async (second) => {
      lastSecondRef.current = Math.floor(second);
      await send({ watchedSeconds: lastSecondRef.current });
    },

    // progress: internal tracking فقط، مش تبعت حاجة
    progress: (second) => {
      lastSecondRef.current = Math.floor(second);
    },

    // complete: ابعت آخر ثانية للباك مرة واحدة فقط
    complete: async () => {
      if (completedRef.current) return;
      completedRef.current = true;

      await send({ watchedSeconds: lastSecondRef.current });
    }
  };
}
