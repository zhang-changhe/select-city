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
    <div className="min-h-screen bg-gray-50">
      {/* 顶部操作区 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 min-h-[500px]">
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
      <footer className="bg-white border-t border-gray-200 mt-8">
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
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setShowCitySelector(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
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
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setShowIndicatorInfo(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-md w-full"
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
