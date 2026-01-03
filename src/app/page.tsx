'use client';

import { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { cities } from '@/data/cities';
import { chinaCities, getAllCities, getCitiesByProvince } from '@/data/chinaCities';
import { weatherData } from '@/data/weatherData';
import { indicators, getIndicatorByType } from '@/data/indicators';
import { City, WeatherIndexType } from '@/types';

export default function Home() {
  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const [currentIndicator, setCurrentIndicator] = useState<WeatherIndexType>('temperature');

  const [searchTerm, setSearchTerm] = useState('');
  const [showCitySelector, setShowCitySelector] = useState(false);
  const [showIndicatorInfo, setShowIndicatorInfo] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  // 确定性随机数生成器，避免 hydration 错误（使用整数运算）
  const seededRandom = (seed: number) => {
    const x = (seed * 9301 + 49297) % 233280;
    return x / 233280;
  };

  // 颜色配置
  const colors = ['#5470c6', '#91cc75', '#fac858'];

  // 添加城市
  const addCity = (city: City) => {
    if (selectedCities.length < 3 && !selectedCities.find(c => c.id === city.id)) {
      setSelectedCities([...selectedCities, city]);
    }
  };

  // 移除城市
  const removeCity = (cityId: string) => {
    setSelectedCities(selectedCities.filter(c => c.id !== cityId));
  };

  // 清除省份选择
  const clearProvince = () => {
    setSelectedProvince(null);
    setSearchTerm('');
  };

  // 获取图表配置
  const getChartOption = () => {
    const indicator = getIndicatorByType(currentIndicator);

    const series = selectedCities.map((city, index) => {
      // 默认使用2024年数据
      const cityData = weatherData.find(d => d.cityId === city.id && d.year === 2024);
      const data = cityData ? cityData.monthlyData.map(m => m[currentIndicator]) : [];

      console.log(`城市: ${city.name}, ID: ${city.id}, 有数据: ${!!cityData}, 数据长度: ${data.length}`);

      return {
        name: city.name,
        type: 'line',
        smooth: true,
        data: data,
        itemStyle: {
          color: colors[index % colors.length],
        },
      };
    });

    return {
      title: {
        text: `${indicator.name}对比图`,
        left: 'center',
        textStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          let result = `${params[0].axisValue}月<br/>`;
          params.forEach((param: any) => {
            result += `${param.marker} ${param.seriesName}: ${param.value} ${indicator.unit}<br/>`;
          });
          return result;
        },
      },
      legend: {
        data: selectedCities.map(c => c.name),
        top: 40,
        left: 'center',
      },
      grid: {
        left: '10%',
        right: '5%',
        bottom: '10%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        name: '月份',
        nameLocation: 'end',
        nameTextStyle: {
          padding: [0, 0, 0, 10],
        },
      },
      yAxis: {
        type: 'value',
        name: indicator.unit,
        nameLocation: 'end',
        nameTextStyle: {
          padding: [0, 10, 0, 0],
        },
      },
      series: series,
    };
  };

  // 过滤城市列表（根据搜索词和选中省份）
  const filteredProvinces = chinaCities.filter(province => {
    if (!searchTerm) return true;

    const provinceName = province.province.toLowerCase();
    const searchLower = searchTerm.toLowerCase();

    // 支持灵活搜索：
    // 1. 完全匹配
    // 2. 部分匹配
    // 3. 支持省、自治区、特别行政区等后缀的简化搜索
    // 例如：搜索"广西"可以匹配"广西壮族自治区"
    let simpleProvinceName = provinceName
      .replace('壮族自治区', '')
      .replace('回族自治区', '')
      .replace('维吾尔自治区', '')
      .replace('自治区', '')
      .replace('特别行政区', '')
      .replace('省', '')
      .replace('市', '');

    // 添加"省"后缀的匹配（用户可能搜索"广西省"）
    const withProvinceSuffix = simpleProvinceName + '省';

    return provinceName.includes(searchLower) ||
           simpleProvinceName.includes(searchLower) ||
           withProvinceSuffix.includes(searchLower) ||
           searchLower.includes(simpleProvinceName);
  });

  const filteredCities = (() => {
    const searchLower = searchTerm.toLowerCase();

    if (selectedProvince) {
      const cities = getCitiesByProvince(selectedProvince);
      return cities.filter(city => {
        // 城市名称匹配
        if (city.name.toLowerCase().includes(searchLower)) return true;
        return false;
      });
    } else {
      return getAllCities().filter(city => {
        // 城市名称匹配
        if (city.name.toLowerCase().includes(searchLower)) return true;

        // 省份名称匹配（同样支持简化搜索）
        const provinceName = city.province.toLowerCase();
        const simpleProvinceName = provinceName
          .replace('壮族自治区', '')
          .replace('回族自治区', '')
          .replace('维吾尔自治区', '')
          .replace('自治区', '')
          .replace('特别行政区', '')
          .replace('省', '')
          .replace('市', '');
        const withProvinceSuffix = simpleProvinceName + '省';

        return provinceName.includes(searchLower) ||
               simpleProvinceName.includes(searchLower) ||
               withProvinceSuffix.includes(searchLower) ||
               searchLower.includes(simpleProvinceName);
      });
    }
  })();

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #4FC3F7 0%, #29B6F6 30%, #0288D1 60%, #0277BD 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 天空层 - 蓝天白云 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '65%',
          background: 'linear-gradient(180deg, #64B5F6 0%, #42A5F5 40%, #2196F3 70%, #1976D2 100%)',
          zIndex: 1,
        }}
      />

      {/* 太阳 */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #FFF59D 0%, #FFEE58 30%, #FFC107 70%, #FF9800 100%)',
          boxShadow: '0 0 80px 30px rgba(255, 235, 59, 0.3)',
          zIndex: 2,
        }}
      />

      {/* 云朵装饰 */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          left: '8%',
          zIndex: 3,
        }}
      >
        <svg width="200" height="80" viewBox="0 0 200 80">
          <ellipse cx="60" cy="50" rx="50" ry="25" fill="rgba(255, 255, 255, 0.95)" />
          <ellipse cx="90" cy="40" rx="40" ry="30" fill="rgba(255, 255, 255, 0.9)" />
          <ellipse cx="130" cy="45" rx="45" ry="28" fill="rgba(255, 255, 255, 0.95)" />
        </svg>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '55%',
          zIndex: 3,
        }}
      >
        <svg width="180" height="70" viewBox="0 0 180 70">
          <ellipse cx="50" cy="45" rx="40" ry="22" fill="rgba(255, 255, 255, 0.9)" />
          <ellipse cx="80" cy="35" rx="35" ry="28" fill="rgba(255, 255, 255, 0.85)" />
          <ellipse cx="115" cy="40" rx="40" ry="25" fill="rgba(255, 255, 255, 0.9)" />
        </svg>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '8%',
          left: '30%',
          zIndex: 3,
          opacity: 0.8,
        }}
      >
        <svg width="150" height="60" viewBox="0 0 150 60">
          <ellipse cx="40" cy="40" rx="35" ry="20" fill="rgba(255, 255, 255, 0.85)" />
          <ellipse cx="65" cy="30" rx="30" ry="25" fill="rgba(255, 255, 255, 0.8)" />
          <ellipse cx="95" cy="35" rx="35" ry="22" fill="rgba(255, 255, 255, 0.85)" />
        </svg>
      </div>

      {/* 山林层 - 与大海自然衔接 */}
      <div
        style={{
          position: 'absolute',
          bottom: '25%',
          left: 0,
          right: 0,
          zIndex: 4,
        }}
      >
        <svg
          width="100%"
          height="400"
          viewBox="0 0 1920 400"
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <defs>
            <linearGradient id="mountainGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#5D4037', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#4E342E', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#3E2723', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="mountainGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#795548', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#6D4C41', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#5D4037', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="treeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#388E3C', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#2E7D32', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          {/* 远山 */}
          <path
            d="M0 400 L0 200 Q200 100 400 180 Q600 260 800 160 Q1000 60 1200 150 Q1400 240 1600 100 Q1700 40 1800 90 Q1860 120 1920 100 L1920 400 Z"
            fill="url(#mountainGradient1)"
            opacity="0.4"
          />

          {/* 中山 */}
          <path
            d="M0 400 L0 250 Q150 160 380 200 Q610 240 840 170 Q1070 100 1300 160 Q1530 220 1700 130 Q1800 80 1920 120 L1920 400 Z"
            fill="url(#mountainGradient2)"
            opacity="0.6"
          />

          {/* 近山带树木 */}
          <path
            d="M0 400 L0 280 Q200 200 400 240 Q600 280 800 220 Q1000 160 1200 200 Q1400 240 1600 180 Q1750 140 1920 170 L1920 400 Z"
            fill="url(#mountainGradient1)"
            opacity="0.8"
          />

          {/* 树木点缀 */}
          {Array.from({ length: 40 }).map((_, i) => {
            const randomX = seededRandom(i + 300);
            const randomHeight = seededRandom(i + 400);
            const randomWidth = seededRandom(i + 500);

            const x = Number((i * 48 + randomX * 30).toFixed(6));
            const height = Number((40 + randomHeight * 50).toFixed(6));
            const width = Number((15 + randomWidth * 20).toFixed(6));
            const midX = Number((x + width / 2).toFixed(6));
            const topY = Number((280 - height).toFixed(6));

            return (
              <path
                key={i}
                d={`M${x} 280 L${midX} ${topY} L${x + width} 280 Z`}
                fill="url(#treeGradient)"
                opacity="0.7"
              />
            );
          })}
        </svg>
      </div>

      {/* 海洋层 - 渐变过渡 */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '25%',
          background: 'linear-gradient(180deg, rgba(13, 71, 161, 0.6) 0%, #1565C0 20%, #1976D2 40%, #1E88E5 60%, #42A5F5 80%, #64B5F6 100%)',
          zIndex: 5,
        }}
      >
        {/* 波浪效果 - 与山林自然衔接 */}
        <svg
          width="100%"
          height="80"
          viewBox="0 0 1920 80"
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="waveGradientNew" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgba(255, 255, 255, 0.25)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'rgba(255, 255, 255, 0.05)', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          {Array.from({ length: 4 }).map((_, i) => {
            const offset = i * 18;
            const opacity = 0.6 - i * 0.12;
            return (
              <path
                key={i}
                d={`M0 ${25 + offset} Q100 ${5 + offset} 200 ${25 + offset} Q300 ${45 + offset} 400 ${25 + offset} Q500 ${5 + offset} 600 ${25 + offset} Q700 ${45 + offset} 800 ${25 + offset} Q900 ${5 + offset} 1000 ${25 + offset} Q1100 ${45 + offset} 1200 ${25 + offset} Q1300 ${5 + offset} 1400 ${25 + offset} Q1500 ${45 + offset} 1600 ${25 + offset} Q1700 ${5 + offset} 1800 ${25 + offset} Q1860 ${45 + offset} 1920 ${25 + offset} L1920 80 L0 80 Z`}
                fill="url(#waveGradientNew)"
                style={{ opacity }}
              />
            );
          })}
        </svg>
      </div>

      {/* 海鸥 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          zIndex: 6,
          pointerEvents: 'none',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1920 500"
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          {/* 海鸥1 */}
          <g style={{ transform: 'translate(150px, 80px) scale(0.6)' }}>
            <path
              d="M0 20 Q20 5 40 20 Q60 5 80 20 Q40 30 0 20"
              fill="none"
              stroke="#455A64"
              strokeWidth="2"
              opacity="0.7"
            />
          </g>

          {/* 海鸥2 */}
          <g style={{ transform: 'translate(350px, 120px) scale(0.8)' }}>
            <path
              d="M0 20 Q20 5 40 20 Q60 5 80 20 Q40 30 0 20"
              fill="none"
              stroke="#455A64"
              strokeWidth="2"
              opacity="0.8"
            />
          </g>

          {/* 海鸥3 */}
          <g style={{ transform: 'translate(550px, 60px) scale(0.5)' }}>
            <path
              d="M0 20 Q15 10 30 20 Q45 10 60 20 Q30 28 0 20"
              fill="none"
              stroke="#455A64"
              strokeWidth="2.5"
              opacity="0.6"
            />
          </g>

          {/* 海鸥4 */}
          <g style={{ transform: 'translate(1100px, 100px) scale(0.7)' }}>
            <path
              d="M0 20 Q20 5 40 20 Q60 5 80 20 Q40 30 0 20"
              fill="none"
              stroke="#455A64"
              strokeWidth="2"
              opacity="0.75"
            />
          </g>

          {/* 海鸥5 */}
          <g style={{ transform: 'translate(1400px, 70px) scale(0.55)' }}>
            <path
              d="M0 20 Q20 5 40 20 Q60 5 80 20 Q40 30 0 20"
              fill="none"
              stroke="#455A64"
              strokeWidth="2"
              opacity="0.65"
            />
          </g>

          {/* 海鸥6 */}
          <g style={{ transform: 'translate(1650px, 130px) scale(0.9)' }}>
            <path
              d="M0 20 Q20 5 40 20 Q60 5 80 20 Q40 30 0 20"
              fill="none"
              stroke="#455A64"
              strokeWidth="2"
              opacity="0.8"
            />
          </g>

          {/* 海鸥7 */}
          <g style={{ transform: 'translate(800px, 40px) scale(0.45)' }}>
            <path
              d="M0 20 Q15 10 30 20 Q45 10 60 20 Q30 28 0 20"
              fill="none"
              stroke="#455A64"
              strokeWidth="2.5"
              opacity="0.55"
            />
          </g>

          {/* 海鸥8 */}
          <g style={{ transform: 'translate(1250px, 160px) scale(0.65)' }}>
            <path
              d="M0 20 Q20 5 40 20 Q60 5 80 20 Q40 30 0 20"
              fill="none"
              stroke="#455A64"
              strokeWidth="2"
              opacity="0.7"
            />
          </g>
        </svg>
      </div>

      {/* 泡沫装饰 */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: 0,
          right: 0,
          height: '5%',
          zIndex: 6,
          pointerEvents: 'none',
        }}
      >
        <svg
          width="100%"
          height="40"
          viewBox="0 0 1920 40"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 25 }).map((_, i) => {
            const randomX = seededRandom(i + 600);
            const randomY = seededRandom(i + 700);
            const randomSize = seededRandom(i + 800);

            const x = Number((i * 77 + randomX * 35).toFixed(6));
            const y = Number((10 + randomY * 25).toFixed(6));
            const size = Number((1.5 + randomSize * 4).toFixed(6));

            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={size}
                fill="rgba(255, 255, 255, 0.5)"
                opacity={0.3 + randomSize * 0.3}
              />
            );
          })}
        </svg>
      </div>
      {/* 顶部操作区 */}
      <header
        className="shadow-lg border-b border-white/20"
        style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1
            style={{
              fontSize: '3rem',
              fontWeight: '900',
              textAlign: 'center',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #1E88E5 0%, #43A047 50%, #F57C00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.2)',
              letterSpacing: '0.1em',
              filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.15))',
            }}
          >
            养老选城指南
          </h1>

          {/* 城市选择区域 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              选择城市（最多3个）
            </label>
            <div className="flex flex-wrap gap-2 items-center">
              {selectedCities.map((city) => (
                <div
                  key={city.id}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: colors[selectedCities.indexOf(city) % colors.length],
                    color: 'white',
                  }}
                >
                  {city.name}
                  <button
                    onClick={() => removeCity(city.id)}
                    className="ml-1 hover:opacity-80"
                  >
                    ×
                  </button>
                </div>
              ))}
              {selectedCities.length < 3 && (
                <button
                  onClick={() => setShowCitySelector(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  + 添加城市
                </button>
              )}
            </div>
          </div>

          {/* 指标选择区域 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              选择对比指标
            </label>
            <div className="flex gap-3">
              {indicators.map((indicator) => (
                <button
                  key={indicator.key}
                  onClick={() => setCurrentIndicator(indicator.key as WeatherIndexType)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentIndicator === indicator.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {indicator.name}
                </button>
              ))}
              <button
                onClick={() => setShowIndicatorInfo(true)}
                className="px-3 py-2 text-gray-500 hover:text-gray-700"
                title="指标说明"
              >
                ⓘ
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 中间图表展示区 */}
      <main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <div
          className="rounded-lg shadow-xl p-6 min-h-[500px]"
          style={{
            background: selectedCities.length > 0
              ? 'rgba(255, 255, 255, 0.2)'
              : 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          {selectedCities.length > 0 ? (
            <>
              <div className="mb-4 p-3 bg-gray-50 rounded text-sm">
                <p><strong>当前选择：</strong>{selectedCities.map(c => `${c.name}(${c.id})`).join(', ')}</p>
                <p><strong>当前指标：</strong>{currentIndicator}</p>
              </div>
              <ReactECharts
                key={`${selectedCities.map(c => c.id).join('-')}-${currentIndicator}`}
                option={getChartOption()}
                style={{ height: '500px' }}
                opts={{ renderer: 'canvas' }}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-[500px] text-gray-400">
              <div className="text-center">
                <p className="text-xl mb-2">请先选择要对比的城市</p>
                <p className="text-sm">点击上方"添加城市"按钮开始</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 底部说明区 */}
      <footer
        className="border-t border-white/20 mt-8"
        style={{
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">数据来源：国家气象数据中心（模拟数据）</p>
            <p>数据更新时间：2024年</p>
          </div>
        </div>
      </footer>

      {/* 城市选择弹窗 */}
      {showCitySelector && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowCitySelector(false)}
        >
          <div
            className="rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(20px)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">选择城市</h2>
                {selectedProvince && (
                  <button
                    onClick={clearProvince}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                  >
                    ← 返回省份列表
                  </button>
                )}
              </div>
              <input
                type="text"
                placeholder={selectedProvince ? "搜索城市名称" : "搜索省份或城市"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              {!selectedProvince ? (
                // 省份列表
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {filteredProvinces.map((province) => {
                    const provinceCities = province.cities;
                    const hasSelectedCities = selectedCities.some(c =>
                      provinceCities.some(pc => pc.id === c.id)
                    );

                    return (
                      <button
                        key={province.provinceCode}
                        onClick={() => {
                          setSelectedProvince(province.province);
                          setSearchTerm('');
                        }}
                        className={`px-3 py-3 rounded-lg text-sm transition-colors ${
                          hasSelectedCities
                            ? 'bg-blue-100 border-2 border-blue-400'
                            : 'bg-blue-50 hover:bg-blue-100'
                        }`}
                      >
                        <div className="font-semibold">{province.province}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {province.cities.length} 个城市
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                // 城市列表
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((city) => {
                      const isSelected = !!selectedCities.find(c => c.id === city.id);
                      return (
                        <button
                          key={city.id}
                          onClick={() => {
                            addCity(city);
                            setShowCitySelector(false);
                            setSelectedProvince(null);
                            setSearchTerm('');
                          }}
                          disabled={isSelected || selectedCities.length >= 3}
                          className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                            isSelected
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : selectedCities.length >= 3
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                          }`}
                        >
                          {city.name}
                        </button>
                      );
                    })
                  ) : (
                    <div className="col-span-3 text-center text-gray-500 py-8">
                      未找到匹配的城市
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => {
                  setShowCitySelector(false);
                  setSelectedProvince(null);
                  setSearchTerm('');
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 指标说明弹窗 */}
      {showIndicatorInfo && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowIndicatorInfo(false)}
        >
          <div
            className="rounded-lg shadow-2xl max-w-md w-full"
            style={{
              background: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(20px)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold">指标说明</h2>
              <button
                onClick={() => setShowIndicatorInfo(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              {indicators.map((indicator) => (
                <div key={indicator.key} className="mb-6 last:mb-0">
                  <h3 className="font-semibold text-lg mb-2">
                    {indicator.name}（{indicator.unit}）
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{indicator.description}</p>
                  <p className="text-gray-700 text-sm bg-blue-50 p-3 rounded-lg">
                    <strong>对老年人的影响：</strong>{indicator.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
