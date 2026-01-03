// 城市信息
export interface City {
  id: string;
  name: string;
  province: string;
}

// 气象指标类型
export type WeatherIndexType = 'temperature' | 'humidity' | 'uv_intensity' | 'rainfall';

// 每月气象数据
export interface MonthlyWeather {
  month: number;
  temperature: number;      // 温度（摄氏度）
  humidity: number;         // 湿度（百分比）
  uv_intensity: number;     // 紫外线强度（量化值）
  rainfall: number;         // 降雨量（毫米）
}

// 城市年度气象数据
export interface CityWeatherData {
  cityId: string;
  year: number;
  monthlyData: MonthlyWeather[];
}

// 指标信息
export interface IndicatorInfo {
  key: WeatherIndexType;
  name: string;
  unit: string;
  description: string;
  impact: string;
}
