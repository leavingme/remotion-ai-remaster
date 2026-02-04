import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

export const PixelPizzaPartyBackground = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  
  // 创建掉落的披萨emoji，数量不要太多（6个）
  // 每个披萨有不同的起始延迟、速度、大小和旋转速度
  const fallingPizzas = [
    { startLeft: '10%', speed: 0.8, size: '50px', rotateSpeed: 2, delay: 0 },
    { startLeft: '25%', speed: 1.2, size: '45px', rotateSpeed: -1.5, delay: fps * 2 },
    { startLeft: '40%', speed: 0.9, size: '55px', rotateSpeed: 2.5, delay: fps * 4 },
    { startLeft: '60%', speed: 1.1, size: '48px', rotateSpeed: -2, delay: fps * 1 },
    { startLeft: '75%', speed: 0.85, size: '52px', rotateSpeed: 1.8, delay: fps * 3 },
    { startLeft: '90%', speed: 1.0, size: '47px', rotateSpeed: -2.2, delay: fps * 5 },
  ];
  
  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg, #87CEEB 0%, #FFB347 50%, #FF6B6B 100%)',
        overflow: 'hidden',
      }}
    >
      {/* 像素风格背景图案 */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px),
            repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px)
          `,
          imageRendering: 'pixelated',
        }}
      />

      {/* 像素风格的 Pizza 切片装饰 */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '80px',
          height: '80px',
          background: `
            radial-gradient(circle at 30% 30%, #FFD700 0%, #FF8C00 50%, #FF6347 100%)
          `,
          clipPath: 'polygon(50% 0%, 100% 25%, 85% 75%, 50% 100%, 15% 75%, 0% 25%)',
          filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.3))',
          imageRendering: 'pixelated',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '60px',
          height: '60px',
          background: `
            radial-gradient(circle at 30% 30%, #FFD700 0%, #FF8C00 50%, #FF6347 100%)
          `,
          clipPath: 'polygon(50% 0%, 100% 25%, 85% 75%, 50% 100%, 15% 75%, 0% 25%)',
          filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.3))',
          imageRendering: 'pixelated',
          transform: 'rotate(45deg)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '15%',
          width: '70px',
          height: '70px',
          background: `
            radial-gradient(circle at 30% 30%, #FFD700 0%, #FF8C00 50%, #FF6347 100%)
          `,
          clipPath: 'polygon(50% 0%, 100% 25%, 85% 75%, 50% 100%, 15% 75%, 0% 25%)',
          filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.3))',
          imageRendering: 'pixelated',
          transform: 'rotate(-30deg)',
        }}
      />

      {/* 像素风格的横幅装饰 */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '400px',
          height: '60px',
          background: 'linear-gradient(90deg, #FF6B6B 0%, #FFD93D 25%, #6BCF7F 50%, #4D96FF 75%, #FF6B6B 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#FFF',
          textShadow: '2px 2px 0px #000',
          imageRendering: 'pixelated',
        }}
      >
        🍕 PIZZA PARTY 🍕
      </div>

      {/* 像素风格的云朵 */}
      {[
        { top: '10%', left: '5%' },
        { top: '25%', left: '25%' },
        { top: '40%', left: '45%' },
        { top: '15%', left: '65%' },
        { top: '30%', left: '85%' },
      ].map((pos, i) => (
        <div
          key={`cloud-${i}`}
          style={{
            position: 'absolute',
            top: pos.top,
            left: pos.left,
            width: '100px',
            height: '50px',
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '50px',
            filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.1))',
            imageRendering: 'pixelated',
            opacity: 0.6,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              left: '20px',
              width: '40px',
              height: '40px',
              background: 'rgba(255,255,255,0.8)',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '-15px',
              right: '20px',
              width: '35px',
              height: '35px',
              background: 'rgba(255,255,255,0.8)',
              borderRadius: '50%',
            }}
          />
        </div>
      ))}

      {/* 掉落的披萨emoji - 彩带效果 */}
      {fallingPizzas.map((pizza, i) => {
        // 考虑延迟，计算实际帧数
        const adjustedFrame = Math.max(0, frame - pizza.delay);
        
        // 计算每个披萨的垂直位置（循环掉落）
        // 掉落时间：从顶部到底部需要约3秒
        const fallDuration = fps * 3;
        const positionInCycle = (adjustedFrame % fallDuration) / fallDuration;
        
        // 垂直位置：从-10%开始，掉落到110%（超出屏幕底部）
        const topPosition = -10 + (positionInCycle * 120 * pizza.speed);
        
        // 旋转角度：持续旋转
        const rotation = (adjustedFrame * pizza.rotateSpeed) % 360;
        
        // 水平摆动：轻微左右摆动，更像彩带
        const horizontalOffset = Math.sin(adjustedFrame / (fps * 2) + i) * 15;
        const leftPosition = parseFloat(pizza.startLeft) + horizontalOffset;
        
        // 如果还在延迟阶段，不显示
        if (frame < pizza.delay) {
          return null;
        }
        
        return (
          <div
            key={`falling-pizza-${i}`}
            style={{
              position: 'absolute',
              top: `${topPosition}%`,
              left: `${leftPosition}%`,
              fontSize: pizza.size,
              transform: `rotate(${rotation}deg)`,
              opacity: 0.8,
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 3,
              transition: 'none',
            }}
          >
            🍕
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
