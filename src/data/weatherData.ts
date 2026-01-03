import { CityWeatherData } from '@/types';

// 省份气候特征定义
interface ClimateFeature {
  baseTemp: number[]; // 12个月的基准温度
  humidityBase: number; // 基准湿度（年平均）
  rainfallPattern: number[]; // 降雨量模式（相对于年降雨量的比例）
  uvBase: number[]; // 紫外线基数
}

// 各省份的气候特征（基于真实气象数据）
const provinceClimate: Record<string, ClimateFeature> = {
  // 直辖市
  '北京市': { baseTemp: [-4, -1, 6, 14, 20, 24, 27, 26, 21, 14, 5, -2], humidityBase: 50, rainfallPattern: [0.02, 0.03, 0.06, 0.12, 0.21, 0.45, 1.05, 0.93, 0.30, 0.12, 0.05, 0.02], uvBase: [2, 3, 5, 7, 8, 9, 8, 7, 6, 5, 3, 2] },
  '天津市': { baseTemp: [-3, 0, 7, 15, 21, 25, 27, 26, 21, 14, 5, -1], humidityBase: 52, rainfallPattern: [0.02, 0.03, 0.06, 0.12, 0.21, 0.45, 1.05, 0.93, 0.30, 0.12, 0.05, 0.02], uvBase: [2, 3, 5, 7, 8, 9, 8, 7, 6, 5, 3, 2] },
  '上海市': { baseTemp: [4, 6, 10, 15, 20, 24, 29, 28, 25, 19, 13, 7], humidityBase: 72, rainfallPattern: [0.12, 0.14, 0.21, 0.18, 0.23, 0.40, 0.33, 0.31, 0.29, 0.13, 0.11, 0.09], uvBase: [3, 4, 5, 6, 7, 8, 9, 7, 6, 5, 4, 3] },
  '重庆市': { baseTemp: [8, 10, 14, 19, 23, 26, 28, 28, 24, 19, 14, 10], humidityBase: 78, rainfallPattern: [0.04, 0.05, 0.09, 0.17, 0.29, 0.55, 0.86, 0.79, 0.45, 0.15, 0.07, 0.04], uvBase: [2, 2, 3, 4, 5, 5, 6, 5, 4, 3, 2, 2] },

  // 华北地区
  '河北省': { baseTemp: [-3, 0, 7, 15, 20, 24, 26, 25, 20, 13, 5, -2], humidityBase: 50, rainfallPattern: [0.02, 0.03, 0.06, 0.12, 0.21, 0.45, 1.05, 0.93, 0.30, 0.12, 0.05, 0.02], uvBase: [2, 3, 5, 7, 8, 9, 8, 7, 6, 5, 3, 2] },
  '山西省': { baseTemp: [-6, -2, 5, 13, 19, 23, 25, 23, 17, 11, 2, -4], humidityBase: 48, rainfallPattern: [0.02, 0.03, 0.07, 0.12, 0.20, 0.42, 0.98, 0.87, 0.28, 0.11, 0.04, 0.02], uvBase: [2, 3, 5, 7, 8, 9, 8, 7, 6, 5, 3, 2] },
  '内蒙古自治区': { baseTemp: [-13, -8, 1, 9, 16, 21, 23, 21, 15, 7, -3, -11], humidityBase: 45, rainfallPattern: [0.02, 0.02, 0.04, 0.09, 0.17, 0.37, 0.86, 0.77, 0.25, 0.09, 0.03, 0.02], uvBase: [2, 3, 5, 7, 9, 10, 9, 8, 6, 5, 3, 2] },

  // 东北地区
  '辽宁省': { baseTemp: [-8, -5, 2, 10, 16, 21, 24, 23, 17, 10, 1, -5], humidityBase: 55, rainfallPattern: [0.02, 0.02, 0.04, 0.09, 0.17, 0.38, 0.88, 0.78, 0.25, 0.10, 0.03, 0.02], uvBase: [2, 3, 5, 6, 7, 8, 8, 7, 6, 5, 3, 2] },
  '吉林省': { baseTemp: [-15, -11, -3, 6, 13, 18, 22, 20, 14, 6, -4, -12], humidityBase: 58, rainfallPattern: [0.02, 0.02, 0.04, 0.09, 0.17, 0.37, 0.86, 0.77, 0.25, 0.09, 0.03, 0.02], uvBase: [2, 3, 5, 6, 7, 8, 8, 7, 6, 4, 3, 2] },
  '黑龙江省': { baseTemp: [-19, -15, -5, 5, 13, 18, 21, 19, 12, 4, -7, -16], humidityBase: 62, rainfallPattern: [0.02, 0.02, 0.04, 0.09, 0.17, 0.37, 0.86, 0.77, 0.25, 0.09, 0.03, 0.02], uvBase: [2, 2, 4, 5, 6, 7, 7, 6, 5, 4, 2, 2] },

  // 华东地区
  '江苏省': { baseTemp: [2, 4, 9, 15, 20, 24, 28, 27, 22, 16, 9, 3], humidityBase: 70, rainfallPattern: [0.10, 0.12, 0.18, 0.15, 0.20, 0.35, 0.29, 0.27, 0.24, 0.11, 0.09, 0.07], uvBase: [3, 4, 5, 6, 7, 8, 9, 7, 6, 5, 4, 3] },
  '浙江省': { baseTemp: [5, 6, 10, 16, 21, 24, 28, 28, 24, 19, 13, 7], humidityBase: 72, rainfallPattern: [0.11, 0.13, 0.20, 0.17, 0.22, 0.38, 0.31, 0.29, 0.27, 0.12, 0.10, 0.08], uvBase: [3, 4, 5, 6, 7, 8, 9, 7, 6, 5, 4, 3] },
  '安徽省': { baseTemp: [2, 4, 9, 15, 20, 24, 27, 27, 22, 17, 10, 4], humidityBase: 68, rainfallPattern: [0.10, 0.12, 0.18, 0.16, 0.21, 0.37, 0.30, 0.28, 0.25, 0.11, 0.09, 0.07], uvBase: [3, 4, 5, 6, 7, 8, 8, 7, 6, 5, 4, 3] },
  '福建省': { baseTemp: [11, 12, 15, 19, 23, 26, 28, 28, 26, 22, 17, 13], humidityBase: 76, rainfallPattern: [0.08, 0.16, 0.21, 0.28, 0.39, 0.46, 0.32, 0.39, 0.25, 0.09, 0.07, 0.06], uvBase: [4, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4] },
  '江西省': { baseTemp: [6, 8, 12, 18, 23, 26, 29, 29, 25, 20, 14, 8], humidityBase: 74, rainfallPattern: [0.12, 0.18, 0.27, 0.33, 0.42, 0.50, 0.35, 0.43, 0.27, 0.10, 0.08, 0.07], uvBase: [3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 4, 3] },
  '山东省': { baseTemp: [-1, 1, 7, 14, 19, 24, 27, 26, 21, 15, 7, 1], humidityBase: 55, rainfallPattern: [0.03, 0.04, 0.07, 0.13, 0.22, 0.46, 1.06, 0.94, 0.31, 0.12, 0.05, 0.03], uvBase: [2, 3, 5, 6, 7, 8, 8, 7, 6, 5, 3, 2] },

  // 华中地区
  '河南省': { baseTemp: [0, 3, 9, 16, 21, 26, 28, 27, 22, 16, 8, 2], humidityBase: 62, rainfallPattern: [0.04, 0.05, 0.09, 0.17, 0.29, 0.55, 0.86, 0.79, 0.45, 0.15, 0.07, 0.04], uvBase: [3, 4, 5, 7, 8, 9, 8, 7, 6, 5, 4, 3] },
  '湖北省': { baseTemp: [4, 6, 11, 17, 22, 26, 29, 29, 24, 18, 11, 5], humidityBase: 72, rainfallPattern: [0.08, 0.11, 0.17, 0.21, 0.30, 0.51, 0.43, 0.40, 0.26, 0.10, 0.08, 0.06], uvBase: [3, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3] },
  '湖南省': { baseTemp: [5, 7, 11, 17, 22, 26, 29, 28, 24, 19, 13, 7], humidityBase: 75, rainfallPattern: [0.11, 0.14, 0.22, 0.27, 0.38, 0.52, 0.36, 0.44, 0.24, 0.09, 0.07, 0.06], uvBase: [2, 3, 4, 5, 6, 7, 8, 7, 6, 4, 3, 2] },

  // 华南地区
  '广东省': { baseTemp: [14, 15, 18, 22, 26, 28, 29, 29, 27, 24, 19, 15], humidityBase: 76, rainfallPattern: [0.08, 0.12, 0.16, 0.31, 0.51, 0.50, 0.41, 0.43, 0.32, 0.13, 0.08, 0.06], uvBase: [4, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4] },
  '广西壮族自治区': { baseTemp: [12, 13, 17, 22, 26, 28, 29, 29, 27, 23, 18, 14], humidityBase: 76, rainfallPattern: [0.08, 0.12, 0.16, 0.31, 0.51, 0.50, 0.41, 0.43, 0.32, 0.13, 0.08, 0.06], uvBase: [4, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4] },
  '海南省': { baseTemp: [18, 19, 22, 26, 29, 30, 30, 29, 28, 26, 23, 19], humidityBase: 82, rainfallPattern: [0.04, 0.08, 0.12, 0.18, 0.35, 0.44, 0.39, 0.53, 0.53, 0.32, 0.14, 0.08], uvBase: [7, 8, 9, 10, 11, 10, 9, 9, 8, 8, 7, 7] },

  // 西南地区
  '四川省': { baseTemp: [6, 8, 12, 17, 21, 24, 26, 26, 22, 17, 12, 7], humidityBase: 78, rainfallPattern: [0.04, 0.05, 0.09, 0.17, 0.29, 0.55, 0.86, 0.79, 0.45, 0.15, 0.07, 0.04], uvBase: [2, 3, 4, 5, 6, 6, 6, 5, 4, 4, 3, 2] },
  '贵州省': { baseTemp: [5, 7, 11, 16, 20, 23, 25, 24, 21, 16, 11, 6], humidityBase: 76, rainfallPattern: [0.04, 0.05, 0.09, 0.17, 0.29, 0.55, 0.86, 0.79, 0.45, 0.15, 0.07, 0.04], uvBase: [3, 3, 4, 5, 6, 6, 6, 5, 4, 4, 3, 3] },
  '云南省': { baseTemp: [9, 11, 14, 17, 19, 21, 21, 21, 19, 17, 13, 10], humidityBase: 62, rainfallPattern: [0.06, 0.08, 0.10, 0.10, 0.32, 0.73, 0.81, 0.77, 0.48, 0.30, 0.18, 0.06], uvBase: [6, 7, 8, 9, 10, 9, 7, 7, 7, 7, 6, 6] },
  '西藏自治区': { baseTemp: [0, 2, 5, 8, 12, 15, 16, 15, 13, 9, 4, 1], humidityBase: 35, rainfallPattern: [0.01, 0.02, 0.04, 0.06, 0.16, 0.51, 0.91, 0.82, 0.42, 0.08, 0.01, 0.01], uvBase: [6, 7, 9, 11, 12, 11, 10, 10, 10, 9, 7, 6] },

  // 西北地区
  '陕西省': { baseTemp: [0, 3, 9, 15, 20, 25, 27, 25, 20, 14, 6, 1], humidityBase: 58, rainfallPattern: [0.03, 0.05, 0.10, 0.18, 0.31, 0.59, 0.92, 0.83, 0.47, 0.16, 0.06, 0.03], uvBase: [3, 4, 6, 8, 9, 10, 9, 8, 7, 5, 4, 3] },
  '甘肃省': { baseTemp: [-6, -2, 4, 11, 16, 20, 22, 21, 16, 9, 1, -5], humidityBase: 48, rainfallPattern: [0.02, 0.03, 0.07, 0.12, 0.20, 0.42, 0.98, 0.87, 0.28, 0.11, 0.04, 0.02], uvBase: [3, 4, 6, 8, 9, 10, 9, 8, 7, 5, 4, 3] },
  '青海省': { baseTemp: [-8, -5, 0, 6, 11, 14, 16, 15, 10, 4, -3, -7], humidityBase: 45, rainfallPattern: [0.02, 0.03, 0.07, 0.12, 0.20, 0.42, 0.98, 0.87, 0.28, 0.11, 0.04, 0.02], uvBase: [4, 5, 7, 9, 10, 10, 9, 8, 7, 6, 4, 4] },
  '宁夏回族自治区': { baseTemp: [-7, -3, 3, 10, 16, 20, 22, 21, 15, 9, 1, -5], humidityBase: 46, rainfallPattern: [0.02, 0.03, 0.07, 0.12, 0.20, 0.42, 0.98, 0.87, 0.28, 0.11, 0.04, 0.02], uvBase: [3, 4, 6, 8, 9, 10, 9, 8, 7, 5, 4, 3] },
  '新疆维吾尔自治区': { baseTemp: [-12, -8, 2, 12, 19, 23, 25, 23, 17, 9, -1, -9], humidityBase: 42, rainfallPattern: [0.02, 0.03, 0.07, 0.12, 0.20, 0.42, 0.98, 0.87, 0.28, 0.11, 0.04, 0.02], uvBase: [2, 4, 6, 9, 10, 11, 10, 9, 7, 5, 3, 2] },

  // 台湾、香港、澳门
  '台湾省': { baseTemp: [16, 17, 19, 23, 26, 28, 29, 29, 28, 25, 21, 17], humidityBase: 76, rainfallPattern: [0.08, 0.12, 0.16, 0.25, 0.38, 0.44, 0.35, 0.47, 0.38, 0.16, 0.08, 0.07], uvBase: [4, 5, 6, 7, 8, 9, 9, 8, 8, 6, 5, 4] },
  '香港特别行政区': { baseTemp: [15, 16, 18, 22, 26, 28, 29, 29, 28, 25, 21, 17], humidityBase: 78, rainfallPattern: [0.07, 0.11, 0.15, 0.28, 0.39, 0.48, 0.40, 0.48, 0.36, 0.15, 0.07, 0.06], uvBase: [4, 5, 6, 7, 8, 9, 9, 8, 8, 6, 5, 4] },
  '澳门特别行政区': { baseTemp: [15, 16, 18, 22, 26, 28, 29, 29, 28, 25, 21, 17], humidityBase: 78, rainfallPattern: [0.07, 0.11, 0.15, 0.28, 0.39, 0.48, 0.40, 0.48, 0.36, 0.15, 0.07, 0.06], uvBase: [4, 5, 6, 7, 8, 9, 9, 8, 8, 6, 5, 4] },
};

// 根据省份和年份生成城市气象数据
function generateCityWeather(cityId: string, province: string, year: number, cityIndex: number = 0): CityWeatherData {
  const climate = provinceClimate[province];
  if (!climate) {
    return generateCityWeather(cityId, '北京市', year, cityIndex);
  }

  // 年份偏差因子（模拟气候变化，近10年略有波动）
  const yearFactor = (year - 2015) * 0.05; // 每年0.05度的趋势
  const randomFactor = (Math.sin(year * cityIndex) * 0.3); // 年份相关的随机波动

  // 同一省份内城市湿度略有差异（±2%）
  const humidityVariation = (cityIndex % 3 - 1) * 2;

  const monthlyData = climate.baseTemp.map((temp, month) => {
    // 根据季节调整湿度（夏季高、冬季低）
    const seasonFactor = month >= 4 && month <= 8 ? 1 : month >= 0 && month <= 2 ? 0.9 : 0.95;

    // 温度：基准值 + 城市偏差 + 年份趋势 + 季节性随机
    const temperature = Math.round((temp + (cityIndex % 5 - 2) * 0.3 + yearFactor + randomFactor + Math.random() * 0.5) * 10) / 10;

    // 湿度：基准值 + 季节因子 + 城市偏差 + 年份随机
    const humidity = Math.min(95, Math.max(20, Math.round(climate.humidityBase * seasonFactor + humidityVariation + Math.random() * 3 - (year - 2019) * 0.2)));

    // 紫外线：基准值 + 小幅随机
    const uv_intensity = Math.max(1, Math.min(12, Math.round(climate.uvBase[month] + Math.random() * 2)));

    // 降雨量：基准模式 * 年份因子 + 随机
    const rainfall = Math.round(climate.rainfallPattern[month] * 200 * (1 + (cityIndex % 3 - 1) * 0.1) * (1 + Math.random() * 0.1) * (1 + (year - 2019) * 0.02));

    return {
      month: month + 1,
      temperature,
      humidity,
      uv_intensity,
      rainfall,
    };
  });

  return {
    cityId,
    year,
    monthlyData,
  };
}

// 导入城市列表
import { chinaCities } from '@/data/chinaCities';

// 生成所有城市的气象数据（2015-2024）
export const weatherData: CityWeatherData[] = chinaCities.flatMap((provinceData) => {
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

  return provinceData.cities.flatMap((city, cityIndex) => {
    // 为每个城市生成10年的数据
    return years.map(year =>
      generateCityWeather(city.id, provinceData.province, year, cityIndex)
    );
  });
});

export default weatherData;
