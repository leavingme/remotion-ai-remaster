# 视频画质优化与重制演示 (Video Remaster & Upscaling Demo)

本项目展示了如何结合现代 AI 工具与 [Remotion](https://www.remotion.dev/) 编程化视频技术，对早期低画质视频进行全流程的修复与重制。

这是一个展示代码驱动视频制作（Programmatic Video Creation）能力的完整案例。

## 项目展示


[
https://github.com/leavingme/remotion-ai-remaster/raw/main/public/demo-preview.mp4](https://github.com/leavingme/remotion-ai-remaster/blob/main/public/demo-preview.mp4)


项目通过左右分屏的方式，直观呈现了重制前后的效果差异：
- **左侧 (Before)**：原始的低分辨率素材。
- **右侧 (After)**：经过 video2x 修复、并融合了新版背景与动画的重制版本。

## 核心工作流与技术栈

本项目整合了多种技术手段来优化素材并增强视觉表现：

1.  **AI 字幕生成 (Whisper)**
    - 使用 **OpenAI Whisper** 模型对原始视频的 MPEG 音频进行识别。
    - 自动生成高精度的双语字幕，提升早期视频的可访问性。

2.  **AI 视频超分 (Video2x)**
    - 针对早期模糊不清的视频素材，利用 **video2x** 技术进行 AI 超分辨率放大。
    - 显著提升了画质清晰度，同时保留了像素艺术的风格特征。

3.  **Remotion 视频重构**
    - **布局重设计**：使用 React 组件重新设计了视频布局，实现了 Before/After 的直观对比。
    - **动态视觉增强**：
        - 添加了动态背景（Pizza Party Theme）。
        - 实现了程序化的掉落动画（Falling Pizza Animation）。
        - 重新渲染了清晰的字幕层。

## 快速开始

> **⚠️ 重要提示**：本项目使用 **Git LFS** 管理大文件（processed.mp4）。
> 
> 如果 clone 后发现视频文件异常小或无法播放，请先安装 Git LFS：
> ```bash
> # macOS
> brew install git-lfs
> 
> # 或从官网下载：https://git-lfs.github.com/
> 
> # 初始化并拉取 LFS 文件
> git lfs install
> git lfs pull
> ```

### 安装依赖

```bash
npm install
```

### 预览视频

启动 Remotion Studio 进行实时预览：

```bash
npm run dev
```

### 导出视频

```bash
npm run build
```

## 资源说明

- `public/`：包含原始视频、处理后的高清视频以及生成的字幕文件。
  - `Pizza Party...mp4`：原始视频（10MB）
  - `Pizza Party...processed.mp4`：video2x 处理后的高清版本（58MB，通过 Git LFS 管理）
  - `demo-preview.mp4`：渲染后的对比演示视频（3.9MB）

## 许可证

本项目使用 Remotion 构建。使用许可请参考 [Remotion License](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md)。
