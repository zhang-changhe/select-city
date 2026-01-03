import { weatherData } from './src/data/weatherData.js';

// 找到无锡和驻马店的数据
const wuxi = weatherData.find(d => d.cityId === 'wx');
const zhumadian = weatherData.find(d => d.cityId === 'zhumadian');

console.log('=== 无锡 (江苏省) ===');
if (wuxi) {
  wuxi.monthlyData.forEach((m, i) => {
    console.log(`${i + 1}月: 温度 ${m.temperature}°C, 湿度 ${m.humidity}%, 紫外线 ${m.uv_intensity}, 降雨量 ${m.rainfall}mm`);
  });
}

console.log('\n=== 驻马店 (河南省) ===');
if (zhumadian) {
  zhumadian.monthlyData.forEach((m, i) => {
    console.log(`${i + 1}月: 温度 ${m.temperature}°C, 湿度 ${m.humidity}%, 紫外线 ${m.uv_intensity}, 降雨量 ${m.rainfall}mm`);
  });
}

console.log('\n=== 湿度对比 ===');
if (wuxi && zhumadian) {
  const wuxiAvgHumidity = Math.round(wuxi.monthlyData.reduce((sum, m) => sum + m.humidity, 0) / 12);
  const zhumadianAvgHumidity = Math.round(zhumadian.monthlyData.reduce((sum, m) => sum + m.humidity, 0) / 12);
  console.log(`无锡年平均湿度: ${wuxiAvgHumidity}%`);
  console.log(`驻马店年平均湿度: ${zhumadianAvgHumidity}%`);
}
