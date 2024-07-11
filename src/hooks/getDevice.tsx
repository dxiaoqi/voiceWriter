import { useEffect, useState } from 'react';

// 设备类型枚举
export enum DeviceType {
  Mobile = 'mobile',
  Tablet = 'tablet',
  Desktop = 'desktop'
}

// 根据设备屏幕宽度判断设备类型
const getDeviceType = (width: number): DeviceType => {
  if (width < 768) {
    return DeviceType.Mobile;
  } else if (width < 992) {
    return DeviceType.Tablet;
  } else {
    return DeviceType.Desktop;
  }
}

const useDeviceType = () => {
  // 默认设备类型为桌面
  const [deviceType, setDeviceType] = useState(DeviceType.Desktop);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setDeviceType(getDeviceType(window.innerWidth));
    }

    // 初始设置设备类型
    handleResize();

    // 监听resize事件
    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceType;  // 返回当前设备类型
};

export default useDeviceType;