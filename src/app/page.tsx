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
        background: 'linear-gradient(180deg, #87CEEB 0%, #B3E5FC 25%, #E0F7FA 50%, #B9F6CA 75%, #C8E6C9 90%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 天空层 - 渐变效果 */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '60%',
          background: 'linear-gradient(180deg, #87CEEB 0%, #4FC3F7 30%, #81D4FA 60%, #B3E5FC 100%)',
          zIndex: 1,
        }}
      />

      {/* 太阳 */}
      <div
        style={{
          position: 'fixed',
          top: '8%',
          right: '12%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #FFF176 0%, #FFD54F 50%, #FF8A65 100%)',
          boxShadow: '0 0 60px 20px rgba(255, 213, 79, 0.4)',
          zIndex: 2,
        }}
      />

      {/* 云朵装饰 */}
      <div
        style={{
          position: 'fixed',
          top: '15%',
          left: '10%',
          width: '200px',
          height: '60px',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '50%',
          filter: 'blur(8px)',
          zIndex: 3,
          boxShadow: '80px 20px 0 rgba(255, 255, 255, 0.8)',
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: '25%',
          left: '60%',
          width: '250px',
          height: '70px',
          background: 'rgba(255, 255, 255, 0.85)',
          borderRadius: '50%',
          filter: 'blur(6px)',
          zIndex: 3,
          boxShadow: '90px 15px 0 rgba(255, 255, 255, 0.75)',
        }}
      />

      {/* 远山层 */}
      <div
        style={{
          position: 'fixed',
          bottom: '35%',
          left: 0,
          right: 0,
          zIndex: 4,
        }}
      >
        <svg
          width="100%"
          height="300"
          viewBox="0 0 1920 300"
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <path
            d="M0 300 L0 180 Q200 80 400 150 Q600 220 800 120 Q1000 20 1200 140 Q1400 260 1600 100 Q1700 20 1800 80 Q1860 120 1920 100 L1920 300 Z"
            fill="rgba(120, 144, 156, 0.4)"
          />
          <path
            d="M0 300 L0 220 Q150 140 350 190 Q550 240 750 160 Q950 80 1150 170 Q1350 260 1550 130 Q1650 80 1750 120 Q1820 150 1920 130 L1920 300 Z"
            fill="rgba(102, 126, 130, 0.5)"
          />
        </svg>
      </div>

      {/* 中山层 */}
      <div
        style={{
          position: 'fixed',
          bottom: '28%',
          left: 0,
          right: 0,
          zIndex: 5,
        }}
      >
        <svg
          width="100%"
          height="280"
          viewBox="0 0 1920 280"
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <path
            d="M0 280 L0 150 Q300 50 500 120 Q700 190 900 100 Q1100 10 1300 130 Q1500 250 1700 80 Q1800 30 1920 60 L1920 280 Z"
            fill="rgba(84, 110, 122, 0.6)"
          />
          <path
            d="M0 280 L0 200 Q200 120 450 170 Q700 220 950 140 Q1200 60 1450 160 Q1700 260 1850 120 L1920 140 L1920 280 Z"
            fill="rgba(69, 90, 100, 0.7)"
          />
        </svg>
      </div>

      {/* 近山层 */}
      <div
        style={{
          position: 'fixed',
          bottom: '20%',
          left: 0,
          right: 0,
          zIndex: 6,
        }}
      >
        <svg
          width="100%"
          height="250"
          viewBox="0 0 1920 250"
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <path
            d="M0 250 L0 180 Q250 80 500 130 Q750 180 1000 110 Q1250 40 1500 140 Q1700 240 1850 120 L1920 140 L1920 250 Z"
            fill="rgba(56, 74, 84, 0.8)"
          />
          <path
            d="M0 250 L0 210 Q200 150 400 180 Q600 210 800 160 Q1000 110 1200 180 Q1400 250 1650 160 Q1800 100 1920 140 L1920 250 Z"
            fill="rgba(43, 58, 66, 0.9)"
          />
        </svg>
      </div>

      {/* 森林层 */}
      <div
        style={{
          position: 'fixed',
          bottom: '12%',
          left: 0,
          right: 0,
          zIndex: 7,
        }}
      >
        <svg
          width="100%"
          height="150"
          viewBox="0 0 1920 150"
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          {/* 树木 */}
          <defs>
            <linearGradient id="forestGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#66BB6A', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#2E7D32', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          {Array.from({ length: 60 }).map((_, i) => {
            const randomX = seededRandom(i + 1);
            const randomHeight = seededRandom(i + 100);
            const randomWidth = seededRandom(i + 200);

            // 四舍五入到固定小数位，确保服务端和客户端一致
            const x = Number((i * 32 + randomX * 20).toFixed(6));
            const height = Number((80 + randomHeight * 60).toFixed(6));
            const width = Number((20 + randomWidth * 15).toFixed(6));
            const midX = Number((x + width / 2).toFixed(6));
            const topY = Number((150 - height).toFixed(6));

            return (
              <path
                key={i}
                d={`M${x} 150 L${midX} ${topY} L${x + width} 150 Z`}
                fill={i % 2 === 0 ? '#66BB6A' : '#4CAF50'}
                opacity="0.9"
              />
            );
          })}
        </svg>
      </div>

      {/* 海洋层 */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '12%',
          background: 'linear-gradient(180deg, #4FC3F7 0%, #29B6F6 30%, #039BE5 70%, #0277BD 100%)',
          zIndex: 8,
        }}
      >
        {/* 波浪效果 */}
        <svg
          width="100%"
          height="60"
          viewBox="0 0 1920 60"
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgba(255, 255, 255, 0.3)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'rgba(255, 255, 255, 0.1)', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          {Array.from({ length: 3 }).map((_, i) => {
            const offset = i * 20;
            const opacity = 0.5 - i * 0.1;
            return (
              <path
                key={i}
                d={`M0 ${30 + offset} Q120 ${10 + offset} 240 ${30 + offset} Q360 ${50 + offset} 480 ${30 + offset} Q600 ${10 + offset} 720 ${30 + offset} Q840 ${50 + offset} 960 ${30 + offset} Q1080 ${10 + offset} 1200 ${30 + offset} Q1320 ${50 + offset} 1440 ${30 + offset} Q1560 ${10 + offset} 1680 ${30 + offset} Q1800 ${50 + offset} 1920 ${30 + offset} L1920 60 L0 60 Z`}
                fill="url(#waveGradient)"
                style={{ opacity }}
              />
            );
          })}
        </svg>
      </div>

      {/* 顶部操作区 */}
      <header
        className="shadow-lg border-b border-white/20"
        style={{
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
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
            background: 'rgba(255, 255, 255, 0.95)',
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
          background: 'rgba(255, 255, 255, 0.85)',
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
              background: 'rgba(255, 255, 255, 0.98)',
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
              background: 'rgba(255, 255, 255, 0.98)',
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
