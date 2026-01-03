import { IndicatorInfo, WeatherIndexType } from '@/types';

// 气象指标说明
export const indicators: IndicatorInfo[] = [
  {
    key: 'temperature',
    name: '温度',
    unit: '℃',
    description: '温度是衡量空气冷热程度的物理量，直接影响人体的舒适度和健康。',
    impact: '对老年人来说，适宜的居住温度范围为18-25℃。过冷会增加心血管负担，过热容易导致中暑和脱水。',
  },
  {
    key: 'humidity',
    name: '湿度',
    unit: '%',
    description: '湿度表示空气中水蒸气的含量，是衡量空气潮湿程度的指标。',
    impact: '相对湿度在40%-60%最为适宜。过高湿度会加重关节炎，过低湿度则容易引起呼吸道不适和皮肤干燥。',
  },
  {
    key: 'uv_intensity',
    name: '紫外线强度',
    unit: '指数',
    description: '紫外线强度是衡量太阳紫外线辐射强弱的指数，一般分为0-11+个等级。',
    impact: '老年人皮肤较薄，对紫外线更敏感。UV指数超过6时应避免长时间户外活动，做好防晒措施。',
  },
  {
    key: 'rainfall',
    name: '降雨量',
    unit: 'mm',
    description: '降雨量是单位时间内降水量的大小，反映一个地区的干湿程度。',
    impact: '适度的降雨有利于保持空气湿润，但连续降雨可能导致湿度过高，加重风湿等老年疾病症状。',
  },
];

// 根据key获取指标信息
export const getIndicatorByType = (type: WeatherIndexType): IndicatorInfo => {
  return indicators.find(ind => ind.key === type) || indicators[0];
};

export default indicators;
