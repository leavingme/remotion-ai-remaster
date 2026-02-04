import { AbsoluteFill, Audio, staticFile, Video, useCurrentFrame, useVideoConfig } from 'remotion';
import { Subtitles } from './Subtitles';
import { PixelPizzaPartyBackground } from './PixelPizzaPartyBackground';

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const { fps, width: canvasWidth, height: canvasHeight } = useVideoConfig();

  // Logic from ProcessedVideo to get dimensions
  const videoAspectRatio = 4 / 3;
  const containerHeightPercent = 55;
  const containerHeight = (canvasHeight * containerHeightPercent) / 100;
  const containerWidth = containerHeight * videoAspectRatio;

  // Calculate width in percentage relative to canvas for responsive sizing if needed,
  // but using pixel values for flex layout is easier here.

  const labelStyle: React.CSSProperties = {
    position: 'absolute',
    top: 10,
    left: 10,
    // transform: 'translateX(-50%)', // Removed centering transform
    zIndex: 1,
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 32,
    fontWeight: 'bold',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
  };

  return (
    <AbsoluteFill>
      {/* Global Background */}
      <PixelPizzaPartyBackground />

      {/* Audio (Shared) */}
      <Audio
        src={staticFile('Pizza Party A Command Line Program for Ordering Pizza.mp4')}
        startFrom={0}
      />

      {/* Side-by-Side Container */}
      <AbsoluteFill style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px' // Add some space between videos
      }}>

        {/* Before Video Section */}
        <div style={{
          position: 'relative',
          width: containerWidth,
          height: containerHeight,
        }}>
          <div style={labelStyle}>
            Before
          </div>
          <Video
            src={staticFile('Pizza Party A Command Line Program for Ordering Pizza.mp4')}
            startFrom={0}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '12px',
              imageRendering: 'pixelated',
              boxShadow: '0 5px 15px rgba(0,0,0,0.7)',
            }}
          />
        </div>

        {/* After Video Section */}
        <div style={{
          position: 'relative',
          width: containerWidth,
          height: containerHeight,
        }}>
          <div style={labelStyle}>
            After
          </div>

          {/* Processed Video with Effects */}
          <Video
            src={staticFile('Pizza Party A Command Line Program for Ordering Pizza.processed.mp4')}
            startFrom={0}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '12px',
              imageRendering: 'pixelated',
              boxShadow: '0 5px 15px rgba(0,0,0,0.7)',
              zIndex: 11
            }}
          />



          <div style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            zIndex: 12,
            color: 'white',
            fontFamily: 'sans-serif',
            fontSize: 16,
            fontWeight: 'normal',
            opacity: 0.8,
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
          }}>
            used video2x
          </div>
        </div>

      </AbsoluteFill>

      {/* Subtitles (Global) */}
      <Subtitles
        subtitleFile="audio_bilingual.srt"
        currentFrame={frame}
        fps={fps}
        displayMode="bilingual"
      />
    </AbsoluteFill>
  );
};
