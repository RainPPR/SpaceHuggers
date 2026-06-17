# Space Huggers 代码库说明

本文件供 AI 智能体快速了解项目结构，并非人类阅读的文档。

## 快速概要

- **语言**：纯原生 JavaScript（ES6+），无框架、无打包、无依赖
- **渲染**：HTML5 Canvas + 可选 WebGL 加速
- **入口**：`index.html` → `<script>` 按顺序加载所有 JS → `engineInit()` 启动
- **代码架构**：全局脚本模式（所有类和函数都是全局的），引擎与游戏代码分离

## 文件清单

### 入口

- `index.html` - 入口 HTML，定义 canvas 样式，加载所有 JS 文件

### 引擎（engine/）

| 文件                        | 行数 | 职责                                                                                |
| --------------------------- | ---- | ----------------------------------------------------------------------------------- |
| `engine/engineUtil.js`      | ~137 | Vector2/Color/Timer 工具类，数学辅助函数（abs/min/max/lerp/rand 等）                |
| `engine/engine.js`          | ~228 | 核心：engineInit()、主循环、requestAnimationFrame、对象管理、camera                 |
| `engine/engineObject.js`    | ~268 | EngineObject 基类：pos/size/velocity/angle、父子变换、AABB 碰撞、物理响应           |
| `engine/engineDraw.js`      | ~131 | drawTile() 精灵渲染、drawRect/drawLine/drawText 世界空间绘制、screen↔world 坐标转换 |
| `engine/engineWebGL.js`     | ~326 | WebGL 批量渲染：shader 程序、批次缓冲、纹理上传；glEnable=0 时回退 Canvas 2D        |
| `engine/engineInput.js`     | ~152 | 全局键盘/鼠标/Gamepad 输入，keyIsDown/WasPressed/WasReleased，gamepad 死区处理      |
| `engine/engineAudio.js`     | ~273 | ZzFX 音效合成器（参数化波形生成）、ZzFXM 音乐渲染器、音效距离衰减                   |
| `engine/engineTileLayer.js` | ~255 | TileLayer 类（离屏 Canvas 缓存）、碰撞层管理（tileCollision[]）、射线投射           |
| `engine/engineParticle.js`  | ~200 | ParticleEmitter（粒子发射配置）、Particle（生命周期、颜色渐变、拖尾）               |
| `engine/engineDebug.js`     | ~453 | 调试覆盖层（` 键）、物理/粒子可视化、对象信息显示、粒子编辑器、截图                 |

### 游戏逻辑（app\*.js）

| 文件               | 行数 | 职责                                                                                                        |
| ------------------ | ---- | ----------------------------------------------------------------------------------------------------------- |
| `app.js`           | ~224 | 游戏状态、engineInit() 传入的 5 个回调（init/update/updatePost/render/renderPost）、摄像机控制、多人热插拔  |
| `appLevel.js`      | ~532 | 关卡生成：buildTerrain() 地形、buildBase() 基地、generateLevel() 整体流程、nextLevel()、检查点管理          |
| `appCharacters.js` | ~818 | Character 基类（移动/跳跃/翻滚/攀爬/射击）、Enemy AI（5 类型+变种、视野检测、状态机）、Player（输入、控制） |
| `appObjects.js`    | ~580 | GameObject 基类（生命/燃烧/伤害）、Prop（9 种类箱子桶岩石）、Weapon/Bullet/Grenade、Checkpoint              |
| `appEffects.js`    | ~450 | 音效参数定义、粒子工厂（makeBlood/Fire/Debris/Water）、explosion() 爆炸系统、星空/视差层、雨水/雪           |

## 关键架构决策

### 引擎启动方式

```javascript
// 在 app.js 末尾调用，传入 5 个回调
engineInit(
    () => {
        /* appInit - 初始化 */
    },
    () => {
        /* appUpdate - 每帧更新逻辑 */
    },
    () => {
        /* appUpdatePost - appUpdate 之后（摄像机等） */
    },
    () => {
        /* appRender - 主渲染之前（背景等） */
    },
    () => {
        /* appRenderPost - 主渲染之后（HUD 等） */
    },
);
```

### 精灵渲染

- 所有精灵在一张 256x256 的 base64 内嵌 PNG 中（engine.js:184）
- tileIndex = pixelIndex / 16，通过 UV 坐标映射

### 碰撞系统

- **Tile 碰撞**：16x16 网格数组 `tileCollision[]`，用于地面/墙壁检测
- **物体碰撞**：AABB，逐帧检测，支持物体-物体和物体-Tile 的双向碰撞响应

### 可调参数（engine/config）

- `FPS = 60`：固定帧率
- `pixelated = 1`：像素艺术模式（NEAREST 过滤）
- `gravity = -.01`：重力
- `cameraScale`：缩放系数
- `glEnable`：0 时禁用 WebGL 回退到 Canvas 2D

### 调试快捷键（engineDebug.js）

- ` `：调试覆盖层
- `1`：物理调试
- `2`：粒子调试
- `3`：上帝模式
- `5`：截图
