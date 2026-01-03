import { City } from '@/types';

// 全国主要城市列表
export const cities: City[] = [
  // 华北地区
  { id: 'bj', name: '北京', province: '北京市' },
  { id: 'tj', name: '天津', province: '天津市' },
  { id: 'sjz', name: '石家庄', province: '河北省' },
  { id: 'ty', name: '太原', province: '山西省' },
  { id: 'hhht', name: '呼和浩特', province: '内蒙古自治区' },

  // 华东地区
  { id: 'sh', name: '上海', province: '上海市' },
  { id: 'nj', name: '南京', province: '江苏省' },
  { id: 'hz', name: '杭州', province: '浙江省' },
  { id: 'hf', name: '合肥', province: '安徽省' },
  { id: 'fz', name: '福州', province: '福建省' },
  { id: 'xm', name: '厦门', province: '福建省' },
  { id: 'jn', name: '济南', province: '山东省' },
  { id: 'qd', name: '青岛', province: '山东省' },

  // 华南地区
  { id: 'gz', name: '广州', province: '广东省' },
  { id: 'sz', name: '深圳', province: '广东省' },
  { id: 'zh', name: '珠海', province: '广东省' },
  { id: 'nn', name: '南宁', province: '广西壮族自治区' },
  { id: 'hk', name: '海口', province: '海南省' },
  { id: 'sy', name: '三亚', province: '海南省' },

  // 华中地区
  { id: 'zz', name: '郑州', province: '河南省' },
  { id: 'wh', name: '武汉', province: '湖北省' },
  { id: 'cs', name: '长沙', province: '湖南省' },

  // 西南地区
  { id: 'cd', name: '成都', province: '四川省' },
  { id: 'cq', name: '重庆', province: '重庆市' },
  { id: 'gy', name: '贵阳', province: '贵州省' },
  { id: 'km', name: '昆明', province: '云南省' },

  // 西北地区
  { id: 'xa', name: '西安', province: '陕西省' },
  { id: 'lz', name: '兰州', province: '甘肃省' },
  { id: 'xnc', name: '西宁', province: '青海省' },
  { id: 'yl', name: '银川', province: '宁夏回族自治区' },
  { id: 'wlmq', name: '乌鲁木齐', province: '新疆维吾尔自治区' },

  // 东北地区
  { id: 'shenyang', name: '沈阳', province: '辽宁省' },
  { id: 'dl', name: '大连', province: '辽宁省' },
  { id: 'cc', name: '长春', province: '吉林省' },
  { id: 'heb', name: '哈尔滨', province: '黑龙江省' },

  // 其他重要城市
  { id: 'suzhou', name: '苏州', province: '江苏省' },
  { id: 'nb', name: '宁波', province: '浙江省' },
  { id: 'wx', name: '无锡', province: '江苏省' },
  { id: 'cz', name: '常州', province: '江苏省' },
  { id: 'nt', name: '南通', province: '江苏省' },
  { id: 'dz', name: '东莞', province: '广东省' },
  { id: 'fs', name: '佛山', province: '广东省' },
  { id: 'zs', name: '中山', province: '广东省' },
];

export default cities;
