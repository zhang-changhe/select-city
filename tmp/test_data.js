import { weatherData } from './src/data/weatherData.ts';

console.log('开始检查数据...');
console.log('总数据量:', weatherData.length);

const wuxi = weatherData.find(d => d.cityId === 'wx');
const zhumadian = weatherData.find(d => d.cityId === 'zhumadian');

console.log('\n无锡数据:', wuxi ? '存在' : '不存在');
console.log('驻马店数据:', zhumadian ? '存在' : '不存在');

if (wuxi) {
  console.log('\n无锡湿度数据:');
  wuxi.monthlyData.forEach(m => console.log(`${m.month}月: ${m.humidity}%`));
}

if (zhumadian) {
  console.log('\n驻马店湿度数据:');
  zhumadian.monthlyData.forEach(m => console.log(`${m.month}月: ${m.humidity}%`));
}
