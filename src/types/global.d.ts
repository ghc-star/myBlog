// global.d.ts 定义全局类型声明，例如图片模块、环境变量和全局变量类型。
interface Window {
  particlesJS: {
    load: (id: string, path: string, callback?: () => void) => void;
  };
}

declare module "particles.js";
