import speech_recognition as sr
from pydub import AudioSegment
import os

# 转换音频格式（如果需要）
audio_file = "public/audio.wav"

# 创建识别器
r = sr.Recognizer()

# 加载音频文件
with sr.AudioFile(audio_file) as source:
    # 由于音频较长，我们分段处理
    audio_length = source.DURATION
    print(f"Audio length: {audio_length} seconds")

    # 分段转录（每30秒一段）
    segment_length = 30  # 秒
    subtitles = []

    for i in range(0, int(audio_length), segment_length):
        start_time = i
        end_time = min(i + segment_length, audio_length)

        # 调整音频片段
        with sr.AudioFile(audio_file) as source:
            audio = r.record(source, offset=start_time, duration=segment_length)

        try:
            # 使用Google语音识别API
            text = r.recognize_google(audio, language='en-US')
            if text:
                subtitles.append({
                    'start': start_time,
                    'end': end_time,
                    'text': text
                })
                print(f"Segment {start_time}-{end_time}s: {text}")
        except sr.UnknownValueError:
            print(f"Segment {start_time}-{end_time}s: Could not understand audio")
        except sr.RequestError as e:
            print(f"Segment {start_time}-{end_time}s: Error: {e}")

# 生成SRT格式的字幕
srt_content = ""
for i, sub in enumerate(subtitles, 1):
    srt_content += f"{i}\n"

    # 转换时间格式
    start_time = sub['start']
    end_time = sub['end']

    start_hms = f"{int(start_time//3600):02d}:{int((start_time%3600)//60):02d}:{int(start_time%60):02d},000"
    end_hms = f"{int(end_time//3600):02d}:{int((end_time%3600)//60):02d}:{int(end_time%60):02d},000"

    srt_content += f"{start_hms} --> {end_hms}\n"
    srt_content += f"{sub['text']}\n\n"

# 保存字幕文件
with open("public/subtitles_auto.srt", "w", encoding="utf-8") as f:
    f.write(srt_content)

print("\nTranscription completed! Subtitles saved to public/subtitles_auto.srt")