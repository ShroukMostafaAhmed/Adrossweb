import React, { useMemo, useRef, useState, useEffect } from "react";

const unescapeAll = (s = "") =>
  String(s)
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\\u0026/g, "&")     
    .replace(/\\\//g, "/")        
    .replace(/\\/g, "")          
    .replace(/\s+/g, " ")        
    .trim();

const extractFromTags = (s = "") => {
  const iframe = s.match(/<iframe[^>]*\s+src=["']([^"']+)["']/i);
  if (iframe?.[1]) return iframe[1];
  
  const anchor = s.match(/<a[^>]*\s+href=["']([^"']+)["']/i);
  if (anchor?.[1]) return anchor[1];
  
  const video = s.match(/<video[^>]*\s+src=["']([^"']+)["']/i);
  if (video?.[1]) return video[1];
  
  return s;
};

function extractUrlFromAnything(input) {
  console.log('🔍 VideoPlayer - Processing input:', {
    value: input,
    type: typeof input,
    isArray: Array.isArray(input)
  });
  
  if (!input) return "";
  
  if (typeof input === "string") {
    const cleaned = extractFromTags(unescapeAll(input)).trim();
    console.log('📝 String processed to:', cleaned);
    return cleaned;
  }

  if (typeof input === "object" && input !== null) {
    if (Array.isArray(input)) {
      for (const item of input) {
        const result = extractUrlFromAnything(item);
        if (result) return result;
      }
      return "";
    }
    
    const urlKeys = [
      "url", "src", "href", "link",
      "video", "videoURL", "videoUrl", "video_url", "videoLink",
      "youtubeUrl", "youtube_url", "youtubeLink", "youtube_link",
      "vimeoUrl", "vimeo_url", "vimeoLink", "vimeo_link",
      "embedUrl", "embed_url", "embedLink", "embed_link",
      "watchUrl", "watch_url", "streamUrl", "stream_url",
      "ytUrl", "yt_url", "media", "mediaUrl", "media_url", 
      "source", "sourceUrl"
    ];
    
    for (const key of urlKeys) {
      if (input.hasOwnProperty(key) && input[key]) {
        console.log(`🔑 Found URL in key "${key}":`, input[key]);
        return extractUrlFromAnything(input[key]);
      }
    }
    
    for (const [key, value] of Object.entries(input)) {
      if (typeof value === "object" && value !== null) {
        const nested = extractUrlFromAnything(value);
        if (nested && nested.includes('http')) {
          console.log(`🪆 Found nested URL in "${key}":`, nested);
          return nested;
        }
      }
    }
    
    try {
      const json = JSON.stringify(input);
      const urlPattern = /https?:\\?\/\\?\/[^"\\\s,}]+/gi;
      const matches = json.match(urlPattern);
      
      if (matches && matches.length > 0) {
        const url = unescapeAll(matches[0]);
        console.log('🔍 Found URL in JSON string:', url);
        return url;
      }
    } catch (error) {
      console.warn('❌ JSON processing failed:', error);
    }
  }
  
  const fallback = String(input);
  console.log('🔄 Fallback to string:', fallback.slice(0, 100));
  return fallback;
}

const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;
const VIMEO_ID_PATTERN = /^\d+$/;

function extractVideoInfo(input) {
  const rawUrl = extractUrlFromAnything(input);
  const cleanUrl = unescapeAll(rawUrl).trim();
  
  console.log('🎬 Video processing:', { rawUrl, cleanUrl });
  
  if (!cleanUrl) return { type: 'unknown', embedUrl: null };

  // Try to parse as YouTube
  const youtubeEmbed = toYoutubeEmbed(cleanUrl);
  if (youtubeEmbed) {
    return { type: 'youtube', embedUrl: youtubeEmbed };
  }

  // Try to parse as Vimeo
  const vimeoEmbed = toVimeoEmbed(cleanUrl);
  if (vimeoEmbed) {
    return { type: 'vimeo', embedUrl: vimeoEmbed };
  }

  console.log('❌ Not a recognized YouTube or Vimeo URL');
  return { type: 'unknown', embedUrl: null };
}

function toYoutubeEmbed(cleanUrl) {
  if (!cleanUrl) return null;

  if (YOUTUBE_ID_PATTERN.test(cleanUrl)) {
    console.log('✅ Direct YouTube ID detected:', cleanUrl);
    return `https://www.youtube.com/embed/${cleanUrl}?rel=0&modestbranding=1&iv_load_policy=3&autoplay=0`;
  }

  try {
    const url = new URL(cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`);
    const hostname = url.hostname.replace(/^www\./, "").toLowerCase();
    const pathSegments = url.pathname.split("/").filter(Boolean);
    
    console.log('🔗 YouTube URL parsed:', { hostname, pathSegments, searchParams: url.searchParams.toString() });

    if (hostname.includes('youtube.com') || hostname === 'm.youtube.com') {
      const videoId = url.searchParams.get("v");
      if (videoId && YOUTUBE_ID_PATTERN.test(videoId)) {
        console.log('✅ YouTube watch URL - ID:', videoId);
        return buildYouTubeEmbed(videoId, url);
      }
      
      const pathPatterns = ['embed', 'shorts', 'live', 'v', 'watch'];
      for (const segment of pathSegments) {
        if (YOUTUBE_ID_PATTERN.test(segment)) {
          console.log('✅ YouTube path URL - ID:', segment);
          return buildYouTubeEmbed(segment, url);
        }
      }
    }

    if (hostname === 'youtu.be' && pathSegments[0] && YOUTUBE_ID_PATTERN.test(pathSegments[0])) {
      console.log('✅ youtu.be short URL - ID:', pathSegments[0]);
      return buildYouTubeEmbed(pathSegments[0], url);
    }

    if (hostname.includes('youtube-nocookie.com')) {
      for (const segment of pathSegments) {
        if (YOUTUBE_ID_PATTERN.test(segment)) {
          console.log('✅ YouTube nocookie URL - ID:', segment);
          return buildYouTubeEmbed(segment, url);
        }
      }
    }

  } catch (urlError) {
    console.warn('⚠️ YouTube URL parsing failed:', urlError.message);
  }

  const idMatch = cleanUrl.match(/([A-Za-z0-9_-]{11})(?![A-Za-z0-9_-])/);
  if (idMatch && idMatch[1]) {
    console.log('🔍 Extracted potential YouTube ID:', idMatch[1]);
    return `https://www.youtube.com/embed/${idMatch[1]}?rel=0&modestbranding=1&iv_load_policy=3&autoplay=0`;
  }

  return null;
}

function toVimeoEmbed(cleanUrl) {
  if (!cleanUrl) return null;

  try {
    const url = new URL(cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`);
    const hostname = url.hostname.replace(/^www\./, "").toLowerCase();
    const pathSegments = url.pathname.split("/").filter(Boolean);
    
    console.log('🔗 Vimeo URL parsed:', { hostname, pathSegments });

    // Check for vimeo.com URLs
    if (hostname === 'vimeo.com' || hostname === 'player.vimeo.com') {
      let videoId = null;
      
      // Different Vimeo URL patterns:
      // 1. https://vimeo.com/1157170696
      // 2. https://vimeo.com/1157170696?share=copy&fl=sv&fe=ci
      // 3. https://player.vimeo.com/video/1157170696
      // 4. https://vimeo.com/showcase/... (not a direct video)
      
      if (hostname === 'player.vimeo.com' && pathSegments[0] === 'video') {
        videoId = pathSegments[1];
      } else if (hostname === 'vimeo.com') {
        videoId = pathSegments[0];
      }
      
      // Validate video ID (Vimeo IDs are numeric)
      if (videoId && VIMEO_ID_PATTERN.test(videoId)) {
        console.log('✅ Vimeo URL detected - ID:', videoId);
        
        // Build Vimeo embed URL with parameters
        const params = new URLSearchParams({
          autoplay: "0",
          title: "0",
          byline: "0",
          portrait: "0",
          badge: "0",
          autopause: "0"
        });
        
        // Check for timestamp parameter (Vimeo uses #t=)
        const hashMatch = cleanUrl.match(/#t=(\d+s?)/);
        if (hashMatch) {
          params.set("autoplay", "1");
        }
        
        return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
      }
    }

    // Check for vimeo.com in any subdomain
    if (hostname.includes('vimeo.com')) {
      const idMatch = cleanUrl.match(/vimeo\.com\/(\d+)/);
      if (idMatch && idMatch[1]) {
        console.log('🔍 Extracted Vimeo ID from pattern:', idMatch[1]);
        return `https://player.vimeo.com/video/${idMatch[1]}?autoplay=0&title=0&byline=0&portrait=0`;
      }
    }

  } catch (urlError) {
    console.warn('⚠️ Vimeo URL parsing failed:', urlError.message);
  }

  // Try to extract numeric ID from any string
  const idMatch = cleanUrl.match(/(\d{8,})/);
  if (idMatch && idMatch[1]) {
    console.log('🔍 Extracted potential Vimeo ID:', idMatch[1]);
    return `https://player.vimeo.com/video/${idMatch[1]}?autoplay=0&title=0&byline=0&portrait=0`;
  }

  return null;
}

function buildYouTubeEmbed(videoId, originalUrl = null) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    iv_load_policy: "3",
    autoplay: "0",
    controls: "1"
  });
  
  if (originalUrl) {
    const timestamp = originalUrl.searchParams.get("t") || 
                     originalUrl.searchParams.get("start") ||
                     originalUrl.searchParams.get("time");
    if (timestamp) {
      const cleanTime = timestamp.toString().replace(/s$/i, "");
      if (/^\d+$/.test(cleanTime)) {
        params.set("start", cleanTime);
      }
    }
  }
  
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export default function VideoPlayer({ 
  videoUrl, 
  title = "Skill Video", 
  autoplay = false,
  showDebug = false 
}) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  const cleanedUrl = useMemo(() => {
    const result = extractUrlFromAnything(videoUrl);
    console.log('🎯 Final cleaned URL:', result);
    return result;
  }, [videoUrl]);

  const videoInfo = useMemo(() => {
    const result = extractVideoInfo(cleanedUrl);
    console.log('📺 Video info result:', result);
    return result;
  }, [cleanedUrl]);

  useEffect(() => {
    setIsLoading(true);
    setError("");
  }, [cleanedUrl, videoInfo]);

  // Handle YouTube
  if (videoInfo.type === 'youtube') {
    return (
      <div className="relative w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg">
        {showDebug && (
          <div className="absolute top-0 left-0 z-20 text-[10px] bg-red-600 text-white px-2 py-1 rounded-br">
            Mode: YouTube | {cleanedUrl.slice(0, 50)}...
          </div>
        )}
        
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
              <p>جاري تحميل فيديو YouTube...</p>
            </div>
          </div>
        )}
        
        <div className="relative w-full bg-black" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={videoInfo.embedUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => {
              console.log('✅ YouTube iframe loaded');
              setIsLoading(false);
            }}
            onError={(e) => {
              console.error('❌ YouTube iframe error:', e);
              setError("فشل في تحميل فيديو YouTube");
              setIsLoading(false);
            }}
          />
        </div>
      </div>
    );
  }

  // Handle Vimeo
  if (videoInfo.type === 'vimeo') {
    return (
      <div className="relative w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg">
        {showDebug && (
          <div className="absolute top-0 left-0 z-20 text-[10px] bg-blue-600 text-white px-2 py-1 rounded-br">
            Mode: Vimeo | {cleanedUrl.slice(0, 50)}...
          </div>
        )}
        
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
              <p>جاري تحميل فيديو Vimeo...</p>
            </div>
          </div>
        )}
        
        <div className="relative w-full bg-black" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={videoInfo.embedUrl}
            title={title}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            onLoad={() => {
              console.log('✅ Vimeo iframe loaded');
              setIsLoading(false);
            }}
            onError={(e) => {
              console.error('❌ Vimeo iframe error:', e);
              setError("فشل في تحميل فيديو Vimeo");
              setIsLoading(false);
            }}
          />
        </div>
      </div>
    );
  }

  // Handle regular video files
  const videoSrc = cleanedUrl || "https://www.w3schools.com/html/mov_bbb.mp4";
  
  return (
    <div className="relative w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg">
      {showDebug && (
        <div className="absolute top-0 left-0 z-20 text-[10px] bg-green-600 text-white px-2 py-1 rounded-br">
          Mode: Video File | {cleanedUrl ? cleanedUrl.slice(0, 40) : 'fallback'}...
          {error && ` | Error: ${error}`}
        </div>
      )}
      
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p>جاري تحميل الفيديو...</p>
          </div>
        </div>
      )}
      
      <div className="relative w-full bg-black" style={{ paddingTop: "56.25%" }}>
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full"
          src={videoSrc}
          title={title}
          controls
          playsInline
          preload="metadata"
          autoPlay={autoplay}
          onLoadStart={() => {
            console.log('🎬 Video loading started');
            setIsLoading(true);
          }}
          onLoadedData={() => {
            console.log('✅ Video loaded successfully');
            setIsLoading(false);
            setError("");
          }}
          onError={(e) => {
            const errorCode = e.currentTarget?.error?.code;
            const errorMessage = e.currentTarget?.error?.message || 'Unknown error';
            console.error('❌ Video error:', { errorCode, errorMessage });
            setError(`خطأ في تحميل الفيديو: ${errorCode || 'UNKNOWN'}`);
            setIsLoading(false);
          }}
          onCanPlay={() => {
            console.log('🎯 Video can start playing');
            setIsLoading(false);
          }}
        />
      </div>
      
      {error && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center">
          <div className="text-white text-center p-4">
            <p className="text-red-400 mb-2">⚠️ {error}</p>
            <p className="text-sm text-gray-300">تأكد من صحة رابط الفيديو</p>
          </div>
        </div>
      )}
    </div>
  );
}