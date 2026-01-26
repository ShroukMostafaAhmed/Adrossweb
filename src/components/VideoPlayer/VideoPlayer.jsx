import React, { useMemo, useRef, useEffect } from "react";
import Player from "@vimeo/player";
import useVideoView from "../../hooks/useVideos/useVideoView";

/* ================= Helpers ================= */

const VIMEO_ID = /^\d+$/;
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

function extractVideoInfo(url) {
  if (!url) return { type: "unknown", embedUrl: null };

  if (url.includes("youtube") || url.includes("youtu.be")) {
    const id =
      url.match(/v=([^&]+)/)?.[1] ||
      url.match(/youtu\.be\/([^?]+)/)?.[1];

    if (id && YOUTUBE_ID.test(id)) {
      return {
        type: "youtube",
        embedUrl: `https://www.youtube.com/embed/${id}`
      };
    }
  }

  if (url.includes("vimeo")) {
    const id = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1];

    if (id && VIMEO_ID.test(id)) {
      return {
        type: "vimeo",
        embedUrl: `https://player.vimeo.com/video/${id}`
      };
    }
  }

  return { type: "file", embedUrl: url };
}

/* ================= Component ================= */

export default function VideoPlayer({ videoUrl, videoId, title }) {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const progressRef = useRef(null);

  const isPlayingRef = useRef(false);
  const seekedRef = useRef(false);

  const tracker = useVideoView(videoId);

  const videoInfo = useMemo(
    () => extractVideoInfo(videoUrl),
    [videoUrl]
  );

  /* ========== INIT VIMEO ========== */

  const initVimeo = async () => {
    if (!iframeRef.current || playerRef.current) return;

    const player = new Player(iframeRef.current);
    await player.ready();

    playerRef.current = player;

    player.on("play", () => {
      isPlayingRef.current = true;
      tracker.start();

      progressRef.current = setInterval(async () => {
        const seconds = await player.getCurrentTime();
        tracker.progress(seconds);
      }, 10000);
    });

    player.on("seeked", () => {
      seekedRef.current = true;
      setTimeout(() => (seekedRef.current = false), 500);
    });

    player.on("pause", (d) => {
      if (!isPlayingRef.current || seekedRef.current) return;

      clearInterval(progressRef.current);
      tracker.pause(d.seconds);
    });

    player.on("ended", () => {
      isPlayingRef.current = false;
      clearInterval(progressRef.current);
      tracker.complete();
    });
  };

  useEffect(() => {
    return () => {
      clearInterval(progressRef.current);
      playerRef.current?.destroy();
    };
  }, []);

  /* ================= Render ================= */

  if (videoInfo.type === "youtube") {
    return (
      <iframe
        className="w-full aspect-video rounded-xl"
        src={videoInfo.embedUrl}
        title={title}
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    );
  }

  if (videoInfo.type === "vimeo") {
    return (
      <iframe
        ref={iframeRef}
        className="w-full aspect-video rounded-xl"
        src={videoInfo.embedUrl}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        onLoad={initVimeo}
      />
    );
  }

  return (
    <video
      className="w-full aspect-video rounded-xl"
      src={videoInfo.embedUrl}
      controls
      onPlay={() => tracker.start()}
      onPause={(e) =>
        tracker.pause(e.currentTarget.currentTime)
      }
      onEnded={() => tracker.complete()}
    />
  );
}
