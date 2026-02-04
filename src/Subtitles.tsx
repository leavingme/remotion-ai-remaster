import { useEffect, useState } from 'react';
import { staticFile } from 'remotion';

interface SubtitleItem {
  id: number;
  startTime: number;
  endTime: number;
  text: string;
  english?: string;
  chinese?: string;
  bilingual?: boolean;
}

interface SubtitleProps {
  subtitleFile: string;
  currentFrame: number;
  fps: number;
  displayMode?: 'english' | 'chinese' | 'bilingual';
  forceSingleLine?: boolean;
}

export const Subtitles: React.FC<SubtitleProps> = ({ subtitleFile, currentFrame, fps, displayMode = 'bilingual', forceSingleLine = true }) => {
  const [subtitles, setSubtitles] = useState<SubtitleItem[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState('');

  // 解析SRT时间格式 (00:00:00,000) 转换为秒
  const parseSRTTime = (timeStr: string): number => {
    const [time, milliseconds] = timeStr.split(',');
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds + parseInt(milliseconds) / 1000;
  };

  // 加载字幕文件
  useEffect(() => {
    const loadSubtitles = async () => {
      try {
        const response = await fetch(staticFile(subtitleFile));
        const text = await response.text();
        const lines = text.trim().split('\n');
        const parsedSubtitles: SubtitleItem[] = [];

        let i = 0;
        while (i < lines.length) {
          if (lines[i].match(/^\d+$/)) {
            const id = parseInt(lines[i]);
            const timeLine = lines[i + 1];
            const textLines: string[] = [];
            const bilingualLines: string[] = [];

            let j = i + 2;
            while (j < lines.length && lines[j].trim() !== '') {
              textLines.push(lines[j]);
              j++;
            }

            // 检查是否有双语字幕（第二行是中文）
            if (textLines.length >= 2) {
              const englishText = textLines[0];
              const chineseText = textLines[1];

              if (timeLine) {
                const [startTime, endTime] = timeLine.split(' --> ');
                parsedSubtitles.push({
                  id,
                  startTime: parseSRTTime(startTime),
                  endTime: parseSRTTime(endTime),
                  text: `${englishText}\n${chineseText}`, // 完整文本用于显示
                  english: englishText,
                  chinese: chineseText,
                  bilingual: true
                });
              }
            } else if (textLines.length === 1) {
              // 只有一行字幕
              if (timeLine) {
                const [startTime, endTime] = timeLine.split(' --> ');
                parsedSubtitles.push({
                  id,
                  startTime: parseSRTTime(startTime),
                  endTime: parseSRTTime(endTime),
                  text: textLines[0]
                });
              }
            }

            i = j + 1;
          } else {
            i++;
          }
        }

        setSubtitles(parsedSubtitles);
      } catch (error) {
        console.error('Failed to load subtitles:', error);
      }
    };

    loadSubtitles();
  }, [subtitleFile]);

  // 根据当前帧找到对应的字幕
  useEffect(() => {
    const currentTime = currentFrame / fps;
    const activeSubtitle = subtitles.find(
      sub => currentTime >= sub.startTime && currentTime <= sub.endTime
    );

    if (activeSubtitle) {
      let displayText = '';

      switch (displayMode) {
        case 'english':
          displayText = activeSubtitle.english || activeSubtitle.text;
          break;
        case 'chinese':
          displayText = activeSubtitle.chinese || activeSubtitle.text;
          break;
        case 'bilingual':
        default:
          // 双语模式：如果有存储的中英文，则组合显示
          if (activeSubtitle.english && activeSubtitle.chinese) {
            displayText = `${activeSubtitle.english}\n${activeSubtitle.chinese}`;
          } else {
            displayText = activeSubtitle.text;
          }
          break;
      }

      setCurrentSubtitle(displayText);
    } else {
      setCurrentSubtitle('');
    }
  }, [currentFrame, fps, subtitles, displayMode]);

  if (!currentSubtitle) return null;

  // 渲染双语字幕，可以添加样式区分中英文
  const renderBilingualSubtitle = (text: string) => {
    if (displayMode === 'bilingual' && text.includes('\n')) {
      const lines = text.split('\n');
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          whiteSpace: 'nowrap'
        }}>
          <div style={{
            fontSize: '24px',
            lineHeight: '1.3',
            textAlign: 'center',
            whiteSpace: 'nowrap'
          }}>{lines[0]}</div>
          <div style={{
            fontSize: '20px',
            opacity: 0.9,
            lineHeight: '1.3',
            textAlign: 'center',
            whiteSpace: 'nowrap'
          }}>{lines[1]}</div>
        </div>
      );
    }
    return <span style={{ whiteSpace: 'nowrap' }}>{text}</span>;
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: '5%',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      color: 'white',
      padding: '16px 24px',
      borderRadius: '16px',
      fontSize: '28px',
      display: 'inline-flex',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      textAlign: 'center',
      width: 'auto',
      maxWidth: '90%',
      minWidth: 'min-content',
      zIndex: 5,
      whiteSpace: 'nowrap',
      wordBreak: 'normal',
      overflowWrap: 'normal',
      lineHeight: '1.6',
      fontWeight: '600',
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
    }}>
      {renderBilingualSubtitle(currentSubtitle)}
    </div>
  );
};