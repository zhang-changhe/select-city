import { CityWeatherData } from '@/types';

// 城市气象数据（基于真实气候特征的模拟数据）
export const weatherData: CityWeatherData[] = [
  // 北京 - 温带季风气候
  {
    cityId: 'bj',
    year: 2024,
    monthlyData: [
      { month: 1, temperature: -4, humidity: 44, uv_intensity: 2, rainfall: 3 },
      { month: 2, temperature: -1, humidity: 44, uv_intensity: 3, rainfall: 5 },
      { month: 3, temperature: 6, humidity: 46, uv_intensity: 5, rainfall: 10 },
      { month: 4, temperature: 14, humidity: 48, uv_intensity: 7, rainfall: 20 },
      { month: 5, temperature: 20, humidity: 53, uv_intensity: 8, rainfall: 35 },
      { month: 6, temperature: 24, humidity: 62, uv_intensity: 9, rainfall: 75 },
      { month: 7, temperature: 27, humidity: 75, uv_intensity: 8, rainfall: 175 },
      { month: 8, temperature: 26, humidity: 76, uv_intensity: 7, rainfall: 155 },
      { month: 9, temperature: 21, humidity: 67, uv_intensity: 6, rainfall: 50 },
      { month: 10, temperature: 14, humidity: 60, uv_intensity: 5, rainfall: 20 },
      { month: 11, temperature: 5, humidity: 53, uv_intensity: 3, rainfall: 8 },
      { month: 12, temperature: -2, humidity: 47, uv_intensity: 2, rainfall: 3 },
    ],
  },

  // 上海 - 亚热带季风气候
  {
    cityId: 'sh',
    year: 2024,
    monthlyData: [
      { month: 1, temperature: 4, humidity: 74, uv_intensity: 3, rainfall: 55 },
      { month: 2, temperature: 6, humidity: 73, uv_intensity: 4, rainfall: 65 },
      { month: 3, temperature: 10, humidity: 72, uv_intensity: 5, rainfall: 95 },
      { month: 4, temperature: 15, humidity: 70, uv_intensity: 6, rainfall: 80 },
      { month: 5, temperature: 20, humidity: 74, uv_intensity: 7, rainfall: 105 },
      { month: 6, temperature: 24, humidity: 82, uv_intensity: 8, rainfall: 180 },
      { month: 7, temperature: 29, humidity: 83, uv_intensity: 9, rainfall: 150 },
      { month: 8, temperature: 28, humidity: 84, uv_intensity: 7, rainfall: 140 },
      { month: 9, temperature: 25, humidity: 79, uv_intensity: 6, rainfall: 130 },
      { month: 10, temperature: 19, humidity: 75, uv_intensity: 5, rainfall: 60 },
      { month: 11, temperature: 13, humidity: 73, uv_intensity: 4, rainfall: 50 },
      { month: 12, temperature: 7, humidity: 73, uv_intensity: 3, rainfall: 40 },
    ],
  },

  // 广州 - 亚热带季风气候
  {
    cityId: 'gz',
    year: 2024,
    monthlyData: [
      { month: 1, temperature: 14, humidity: 70, uv_intensity: 4, rainfall: 45 },
      { month: 2, temperature: 15, humidity: 77, uv_intensity: 4, rainfall: 70 },
      { month: 3, temperature: 18, humidity: 82, uv_intensity: 5, rainfall: 90 },
      { month: 4, temperature: 22, humidity: 83, uv_intensity: 6, rainfall: 175 },
      { month: 5, temperature: 26, humidity: 83, uv_intensity: 7, rainfall: 290 },
      { month: 6, temperature: 28, humidity: 85, uv_intensity: 8, rainfall: 280 },
      { month: 7, temperature: 29, humidity: 83, uv_intensity: 9, rainfall: 230 },
      { month: 8, temperature: 29, humidity: 84, uv_intensity: 8, rainfall: 240 },
      { month: 9, temperature: 27, humidity: 80, uv_intensity: 7, rainfall: 180 },
      { month: 10, temperature: 24, humidity: 74, uv_intensity: 6, rainfall: 70 },
      { month: 11, temperature: 19, humidity: 71, uv_intensity: 5, rainfall: 45 },
      { month: 12, temperature: 15, humidity: 67, uv_intensity: 4, rainfall: 35 },
    ],
  },

  // 三亚 - 热带季风气候
  {
    cityId: 'sy',
    year: 2024,
    monthlyData: [
      { month: 1, temperature: 21, humidity: 74, uv_intensity: 8, rainfall: 8 },
      { month: 2, temperature: 22, humidity: 78, uv_intensity: 9, rainfall: 15 },
      { month: 3, temperature: 24, humidity: 80, uv_intensity: 10, rainfall: 30 },
      { month: 4, temperature: 26, humidity: 81, uv_intensity: 11, rainfall: 45 },
      { month: 5, temperature: 28, humidity: 82, uv_intensity: 12, rainfall: 130 },
      { month: 6, temperature: 28, humidity: 84, uv_intensity: 11, rainfall: 220 },
      { month: 7, temperature: 28, humidity: 83, uv_intensity: 10, rainfall: 180 },
      { month: 8, temperature: 28, humidity: 84, uv_intensity: 10, rainfall: 230 },
      { month: 9, temperature: 27, humidity: 84, uv_intensity: 9, rainfall: 280 },
      { month: 10, temperature: 26, humidity: 82, uv_intensity: 9, rainfall: 190 },
      { month: 11, temperature: 24, humidity: 79, uv_intensity: 8, rainfall: 60 },
      { month: 12, temperature: 22, humidity: 75, uv_intensity: 8, rainfall: 15 },
    ],
  },

  // 成都 - 亚热带湿润气候
  {
    cityId: 'cd',
    year: 2024,
    monthlyData: [
      { month: 1, temperature: 6, humidity: 80, uv_intensity: 2, rainfall: 10 },
      { month: 2, temperature: 8, humidity: 77, uv_intensity: 3, rainfall: 15 },
      { month: 3, temperature: 12, humidity: 73, uv_intensity: 4, rainfall: 25 },
      { month: 4, temperature: 17, humidity: 73, uv_intensity: 5, rainfall: 50 },
      { month: 5, temperature: 21, humidity: 73, uv_intensity: 6, rainfall: 85 },
      { month: 6, temperature: 24, humidity: 80, uv_intensity: 6, rainfall: 160 },
      { month: 7, temperature: 26, humidity: 84, uv_intensity: 6, rainfall: 250 },
      { month: 8, temperature: 26, humidity: 84, uv_intensity: 5, rainfall: 230 },
      { month: 9, temperature: 22, humidity: 84, uv_intensity: 4, rainfall: 130 },
      { month: 10, temperature: 17, humidity: 84, uv_intensity: 4, rainfall: 45 },
      { month: 11, temperature: 12, humidity: 80, uv_intensity: 3, rainfall: 20 },
      { month: 12, temperature: 7, humidity: 80, uv_intensity: 2, rainfall: 8 },
    ],
  },

  // 昆明 - 亚热带高原季风气候
  {
    cityId: 'km',
    year: 2024,
    monthlyData: [
      { month: 1, temperature: 9, humidity: 70, uv_intensity: 6, rainfall: 15 },
      { month: 2, temperature: 11, humidity: 60, uv_intensity: 7, rainfall: 20 },
      { month: 3, temperature: 14, humidity: 55, uv_intensity: 8, rainfall: 25 },
      { month: 4, temperature: 17, humidity: 52, uv_intensity: 9, rainfall: 25 },
      { month: 5, temperature: 19, humidity: 60, uv_intensity: 10, rainfall: 80 },
      { month: 6, temperature: 21, humidity: 75, uv_intensity: 9, rainfall: 180 },
      { month: 7, temperature: 21, humidity: 80, uv_intensity: 7, rainfall: 200 },
      { month: 8, temperature: 21, humidity: 79, uv_intensity: 7, rainfall: 190 },
      { month: 9, temperature: 19, humidity: 78, uv_intensity: 7, rainfall: 120 },
      { month: 10, temperature: 17, humidity: 75, uv_intensity: 7, rainfall: 75 },
      { month: 11, temperature: 13, humidity: 72, uv_intensity: 6, rainfall: 45 },
      { month: 12, temperature: 10, humidity: 70, uv_intensity: 6, rainfall: 15 },
    ],
  },

  // 厦门 - 亚热带海洋性季风气候
  {
    cityId: 'xm',
    year: 2024,
    monthlyData: [
      { month: 1, temperature: 13, humidity: 72, uv_intensity: 4, rainfall: 35 },
      { month: 2, temperature: 13, humidity: 73, uv_intensity: 4, rainfall: 70 },
      { month: 3, temperature: 15, humidity: 75, uv_intensity: 5, rainfall: 90 },
      { month: 4, temperature: 19, humidity: 77, uv_intensity: 6, rainfall: 120 },
      { month: 5, temperature: 23, humidity: 78, uv_intensity: 7, rainfall: 170 },
      { month: 6, temperature: 26, humidity: 83, uv_intensity: 8, rainfall: 200 },
      { month: 7, temperature: 28, humidity: 81, uv_intensity: 9, rainfall: 140 },
      { month: 8, temperature: 28, humidity: 82, uv_intensity: 8, rainfall: 170 },
      { month: 9, temperature: 27, humidity: 79, uv_intensity: 7, rainfall: 110 },
      { month: 10, temperature: 24, humidity: 72, uv_intensity: 6, rainfall: 50 },
      { month: 11, temperature: 20, humidity: 68, uv_intensity: 5, rainfall: 40 },
      { month: 12, temperature: 16, humidity: 69, uv_intensity: 4, rainfall: 35 },
    ],
  },

  // 青岛 - 温带季风气候（海洋性）
  {
    cityId: 'qd',
    year: 2024,
    monthlyData: [
      { month: 1, temperature: -1, humidity: 60, uv_intensity: 3, rainfall: 10 },
      { month: 2, temperature: 1, humidity: 59, uv_intensity: 4, rainfall: 12 },
      { month: 3, temperature: 6, humidity: 62, uv_intensity: 5, rainfall: 20 },
      { month: 4, temperature: 12, humidity: 64, uv_intensity: 6, rainfall: 30 },
      { month: 5, temperature: 18, humidity: 68, uv_intensity: 7, rainfall: 50 },
      { month: 6, temperature: 22, humidity: 78, uv_intensity: 8, rainfall: 80 },
      { month: 7, temperature: 26, humidity: 85, uv_intensity: 8, rainfall: 140 },
      { month: 8, temperature: 26, humidity: 83, uv_intensity: 7, rainfall: 130 },
      { month: 9, temperature: 22, humidity: 73, uv_intensity: 6, rainfall: 70 },
      { month: 10, temperature: 16, humidity: 65, uv_intensity: 5, rainfall: 40 },
      { month: 11, temperature: 9, humidity: 62, uv_intensity: 4, rainfall: 25 },
      { month: 12, temperature: 2, humidity: 60, uv_intensity: 3, rainfall: 12 },
    ],
  },

  // 大连 - 温带季风气候（海洋性）
  {
    cityId: 'dl',
    year: 2024,
    monthlyData: [
      { month: 1, temperature: -4, humidity: 58, uv_intensity: 3, rainfall: 8 },
      { month: 2, temperature: -2, humidity: 56, uv_intensity: 3, rainfall: 6 },
      { month: 3, temperature: 3, humidity: 55, uv_intensity: 4, rainfall: 15 },
      { month: 4, temperature: 10, humidity: 55, uv_intensity: 5, rainfall: 25 },
      { month: 5, temperature: 16, humidity: 60, uv_intensity: 6, rainfall: 45 },
      { month: 6, temperature: 21, humidity: 70, uv_intensity: 7, rainfall: 75 },
      { month: 7, temperature: 24, humidity: 80, uv_intensity: 8, rainfall: 150 },
      { month: 8, temperature: 24, humidity: 78, uv_intensity: 7, rainfall: 140 },
      { month: 9, temperature: 20, humidity: 68, uv_intensity: 6, rainfall: 70 },
      { month: 10, temperature: 13, humidity: 61, uv_intensity: 5, rainfall: 35 },
      { month: 11, temperature: 5, humidity: 58, uv_intensity: 4, rainfall: 20 },
      { month: 12, temperature: -2, humidity: 57, uv_intensity: 3, rainfall: 10 },
    ],
  },

  // 杭州 - 亚热带季风气候
  {
    cityId: 'hz',
    year: 2024,
    monthlyData: [
      { month: 1, temperature: 4, humidity: 75, uv_intensity: 3, rainfall: 60 },
      { month: 2, temperature: 6, humidity: 76, uv_intensity: 4, rainfall: 70 },
      { month: 3, temperature: 10, humidity: 78, uv_intensity: 5, rainfall: 110 },
      { month: 4, temperature: 16, humidity: 75, uv_intensity: 6, rainfall: 100 },
      { month: 5, temperature: 21, humidity: 77, uv_intensity: 7, rainfall: 130 },
      { month: 6, temperature: 25, humidity: 82, uv_intensity: 8, rainfall: 200 },
      { month: 7, temperature: 29, humidity: 82, uv_intensity: 9, rainfall: 180 },
      { month: 8, temperature: 29, humidity: 83, uv_intensity: 7, rainfall: 160 },
      { month: 9, temperature: 25, humidity: 81, uv_intensity: 6, rainfall: 130 },
      { month: 10, temperature: 19, humidity: 79, uv_intensity: 5, rainfall: 70 },
      { month: 11, temperature: 13, humidity: 75, uv_intensity: 4, rainfall: 55 },
      { month: 12, temperature: 7, humidity: 74, uv_intensity: 3, rainfall: 45 },
    ],
  },
];

export default weatherData;
