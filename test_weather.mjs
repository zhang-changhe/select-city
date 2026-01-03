import { weatherData } from './src/data/weatherData.ts';

const wuxi = weatherData.find(d => d.cityId === 'wx');
const zhumadian = weatherData.find(d => d.cityId === 'zhumadian');

console.log('=== 无锡 (江苏省，临近太湖) ===');
if (wuxi) {
  wuxi.monthlyData.forEach(m => console.log(`${m.month}月: 温度${m.temperature}°C, 湿度${m.humidity}%, 紫外线${m.uv_intensity}, 降雨${m.rainfall}mm`));
  const avgHumidity = (wuxi.monthlyData.reduce((sum, m) => sum + m.humidity, 0) / 12).toFixed(1);
  console.log(`年平均湿度: ${avgHumidity}%`);
}

console.log('\n=== 驻马店 (河南省) ===');
if (zhumadian) {
  zhumadian.monthlyData.forEach(m => console.log(`${m.month}月: 温度${m.temperature}°C, 湿度${m.humidity}%, 紫外线${m.uv_intensity}, 降雨${m.rainfall}mm`));
  const avgHumidity = (zhumadian.monthlyData.reduce((sum, m) => sum + m.humidity, 0) / 12).toFixed(1);
  console.log(`年平均湿度: ${avgHumidity}%`);
}
