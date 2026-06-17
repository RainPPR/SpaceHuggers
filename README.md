# Space Huggers

## 本游戏仅供学习研究，禁止重新分发

如何游玩：

- WASD 或方向键 - 移动、跳跃、攀爬
- Z 或鼠标左键 - 射击 - 大多数东西会坏，有些会燃烧
- X 或鼠标中键 - 翻滚 - 短暂无敌，造成伤害，获得加速，熄灭火焰
- C 或鼠标右键 - 手雷 - 每次生命 3 颗，谨慎使用
- 支持 Xbox 或 SNES 风格手柄，最多 4 人合作！
- 消灭所有敌人完成关卡
- 底部雷达显示附近敌人
- 初始 10 条命，每完成一关获得 3 条额外生命
- 最佳体验请使用 Chrome 全屏模式
- 游戏无尽头，挑战一下前 5 关！

游戏技巧：

- 翻滚可以灭火！
- 翻滚还能对敌人造成近战伤害
- 与专家（白色）保持距离，他们经常翻滚和跳跃！
- 按住跳跃可以攀爬墙壁
- 跳跃后立即翻滚可以获得更高垂直高度
- 要到达很高的地方可以尝试手雷跳！
- 按 R 重新开始游戏

游戏特性：

- 跑枪 + Roguelike 混合玩法
- 2-4 人本地合作模式
- 高度多样性和复杂性的程序化关卡生成
- 完全可破坏且有持久性的关卡
- 火焰蔓延和爆炸系统
- 5 种敌人类型 + 更大体型的变种
- 7 种不同的箱子/桶/岩石类型
- 17 个精灵纹理，使用 12 色 palette
- 可占领检查点作为玩家复活点
- 多层视差背景的程序化生成
- 星空模拟，星星、行星和太阳移动
- 粒子系统：雨、雪、血液、爆炸、武器、水等
- 原生分辨率渲染，最高 1920x1200
- 11 种音效，使用 [ZzFX](https://github.com/KilledByAPixel/ZzFX)
- 最多 4 人合作，支持 4 个手柄！

引擎特性（LittleJS）：

- 引擎和调试系统与游戏代码分离
- 面向对象的引擎对象基类
- 引擎处理核心更新循环
- 对象基类处理更新、物理、碰撞、渲染
- 工具类：Vector2、Color、Timer
- 超快 TileSheet 渲染系统
- 使用 zzfx 和 zzfxm 的音效和音乐
- 键盘、鼠标、手柄、触摸屏输入处理系统
- Tile 层渲染和碰撞系统
- 粒子效果系统
- 自动调用 appInit()、appUpdate()、appUpdatePost()、appRender()、appRenderPost()
- 调试工具和调试渲染系统（JS13K 构建中不包含）
- 调用 engineInit() 启动！

敌人类型：

- 新兵（绿色）- 稍矮，更犹豫，只需 1 击
- 士兵（蓝色）- 平均身高和能力，需要 2 击
- 队长（红色）- 可以攀爬墙壁，跳得更频繁，需要 3 击
- 专家（白色）- 经常跳跃和翻滚，他们是忍者，需要 4 击
- 爆破专家（紫色）- 投掷手雷且不会着火，需要 5 击
- 有小概率出现重型武器变种，生命值翻倍且自动射击

物体类型：

- 塑料箱（棕色）- 容易燃烧，完全烧毁后会破碎
- 金属箱和桶（灰色）- 难以破坏，不会燃烧
- 水桶（蓝色）- 灭火并将物体推开
- 爆炸箱和桶（绿色）- 几秒后燃烧并爆炸
- 高爆桶（红色）- 爆炸迅速，比普通爆炸物大得多
- 岩石（颜色各异）- 沉重且非常难破坏，不会燃烧，可以压碎敌人
- 岩浆岩（发光的红橙色）- 接触它的任何东西都会点燃

---

## 项目技术文档

Space Huggers 是一款使用纯原生 JavaScript 和 HTML5 Canvas/WebGL 构建的 2D 平台射击游戏。游戏代码分为两部分：**引擎（engine/）** 和 **游戏逻辑（app*.js）**，均直接通过 `<script>` 标签加载，无打包工具，无构建依赖。

## 文件结构

```t
SpaceHuggers/
├── index.html              # 入口 HTML，通过 <script> 加载所有 JS
├── app.js                  # 游戏主循环回调、摄像机、游戏状态
├── appLevel.js             # 关卡生成、地形、出生点、存档点
├── appCharacters.js        # 玩家、敌人、AI 行为
├── appObjects.js           # 物体：箱子、桶、岩石、手雷、子弹、武器
├── appEffects.js           # 粒子特效、爆炸、火焰、血液、音效定义
├── engine/
│   ├── engine.js           # 核心引擎：主循环、对象管理、camera、初始化
│   ├── engineUtil.js       # 工具类：Vector2、Color、Timer、数学辅助函数
│   ├── engineObject.js     # 基类 EngineObject：物理、碰撞、渲染
│   ├── engineDraw.js       # Tile 渲染、Canvas 2D 绘制、文字
│   ├── engineWebGL.js      # WebGL 批量渲染（可回退到 Canvas 2D）
│   ├── engineInput.js      # 键盘、鼠标、Gamepad、触摸输入
│   ├── engineAudio.js      # ZzFX 音效和 zzfxm 音乐
│   ├── engineTileLayer.js  # Tile 图层渲染 + 碰撞数据缓存
│   ├── engineParticle.js   # 粒子发射器和粒子对象
│   └── engineDebug.js      # 调试覆盖层、对象信息、截图
├── engine/build/          # JS13k 构建工具链（已删除）
└── screenshot.png
```

## 代码组织方式

**全局脚本模式**（无模块系统，无打包）：

1. `index.html` 按固定顺序 `<script src=...>` 加载所有 JS 文件
2. 引擎代码通过全局 `const` 和 `class` 定义所有内容到 `window`
3. 游戏代码通过 `engineInit()` 传入 5 个回调函数启动：

```javascript
engineInit(
    () => {}, // appInit      - 初始化时调用一次
    () => {}, // appUpdate    - 每帧更新前调用
    () => {}, // appUpdatePost - appUpdate 之后，用于摄像机跟随等
    () => {}, // appRender    - 渲染前调用
    () => {}, // appRenderPost - 渲染后调用，用于 HUD
);
```

1. 所有引擎常量、类、函数都是全局的，游戏代码直接引用

## 引擎架构（LittleJS v0.74）

### 核心循环（engine.js）

- 基于 `requestAnimationFrame` 的固定时间步长（60 FPS）
- `engineUpdateObjects()` 递归更新所有活跃对象
- 对象按 `renderOrder` 排序后渲染
- 支持帧率平滑和时间缓冲

### 对象系统（engineObject.js）

- `EngineObject` 是所有游戏对象的基类
- 每个对象有：`pos`、`size`、`velocity`、`angle`、`mass`、`color`、`tileIndex`
- 支持父子层级变换
- 内置 AABB 碰撞检测和物理响应
- 碰撞分两种：**Tile 碰撞**（基于网格）和**物体碰撞**（基于 AABB）

### 渲染系统

- **WebGL 批量渲染**（engineWebGL.js）：所有 sprite 合并为批次一次性绘制，性能极高
- **Canvas 2D 回退**（glEnable=0 时）：逐个 drawImage，较慢但兼容性更好
- TileSheet 方式：所有精灵放在一张 PNG 上，通过 UV 坐标索引
- 像素艺术优先：`image-rendering: pixelated` + `gl_NEAREST` 过滤

### 数学库（engineUtil.js）

- `Vector2`：二维向量，含长度、距离、点乘、叉乘、旋转、插值
- `Color`：RGBA 颜色，支持 lerp、mutate、HSLA
- `Timer`：自动随游戏时间流逝的计时器

### 输入系统（engineInput.js）

- 键盘：全局 `onkeydown`/`onkeyup`，支持 WASD 重映射到方向键
- 鼠标：左/中/右键，屏幕坐标和世界坐标转换
- Gamepad：最多 4 个手柄，模拟摇杆和死区处理
- 每个输入状态追踪 `d`（down）、`p`（pressed）、`r`（released）

### 音频系统（engineAudio.js）

- 内置 **ZzFX**：极小体积的 JavaScript 音效合成器
- **ZzFXM**：基于 ZzFX 的音乐渲染器
- 音效可随距离衰减和裁剪
- 语音合成（`speechSynthesis`）用于特殊效果

### 粒子系统（engineParticle.js）

- `ParticleEmitter`：粒子发射器，可配置发射频率、锥角、颜色、大小等
- `Particle`：继承自 `EngineObject`，自动管理生命周期
- 支持加法混合（additive blend）、拖尾粒子、碰撞物理

### Tile 层系统（engineTileLayer.js）

- `TileLayer` 继承自 `EngineObject`，离屏 Canvas 缓存整个关卡
- 支持多层：前景层、背景层、视差层
- 碰撞层独立于可见层
- 修改 tile 后增量重绘

### 调试系统（engineDebug.js）

- 按 ` 键切换调试覆盖层
- 1/2 键：物理/粒子调试可视化
- 3 键：上帝模式
- 5 键：截图
- 鼠标悬停显示对象信息
- 粒子编辑器（内置 UI）

## 游戏逻辑

### 状态管理（app.js）

- 游戏状态：`players[]`、`playerLives`、`level`、`gameTimer`
- 摄像机：默认跟随玩家 1，多人时取平均值，支持窗口边界钳制
- 支持 1-4 人合作，按键/手柄热插拔

### 关卡生成（appLevel.js）

- 程序化地形：带坡度、峡谷的随机高度图
- 程序化基地：多楼层建筑，含楼梯、窗户、玻璃墙
- 敌人数量随关卡增长（15 + level * 30）
- 检查点自动放置，玩家死亡后在最后检查点复活
- 关卡预热（warmup）：运行若干帧确保物理状态稳定

### AI 行为（appCharacters.js）

- **Enemy 类**：5 种类型 + 大型变种，视野检测（45 度斜率检查 + 射线投射），警戒范围
- 状态机：正常巡逻 → 发现玩家 → 战斗 → 追逐
- 特殊行为：队长可攀墙、专家翻滚多、爆破兵扔手雷

### 物体交互（appObjects.js）

- **Prop**：9 种类（箱子、桶、岩石、岩浆岩），各自可燃性、生命值、爆炸属性
- **Weapon**：自动武器，跟随父对象，射速、后坐力、扩散、弹壳粒子
- **Bullet**：碰撞后销毁，可破坏 tile
- **Grenade**：延迟爆炸，发出蜂鸣声，.alertEnemies() 通知附近敌人

### 特效（appEffects.js）

- `explosion()`：圆形区域破坏 tile、伤害/点燃物体、生成烟雾/火焰粒子
- `makeBlood()`、`makeFire()`、`makeDebris()`、`makeWater()`
- 雨水/雪：`ParticleEmitter` + 天空音效
- 粒子持久化：死亡时将形状绘制到 TileLayer Canvas 上

## 技术亮点

1. **零依赖**：没有任何 npm 包，纯原生 JS + HTML + CSS
2. **零构建**：直接用浏览器打开 index.html 即可运行
3. **WebGL 批量渲染**：数万个对象 60 FPS
4. **程序化生成**：关卡、地形、基地布局全部程序生成，每次不同
5. **完整的物理系统**：重力、碰撞、摩擦、弹性、旋转阻尼
6. **ZzFX 音效**：所有音效在运行时合成，无音频文件
7. **TileSheet 渲染**：17 个精灵在一张 base64 内嵌 PNG 上

## 如何运行

直接用浏览器打开 `index.html` 即可。不需要任何服务器、构建工具或依赖安装。
