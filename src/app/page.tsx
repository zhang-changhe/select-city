'use client';

import { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { cities } from '@/data/cities';
import { weatherData } from '@/data/weatherData';
import { indicators, getIndicatorByType } from '@/data/indicators';
import { City, WeatherIndexType } from '@/types';

export default function Home() {
  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const [currentIndicator, setCurrentIndicator] = useState<WeatherIndexType>('temperature');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCitySelector, setShowCitySelector] = useState(false);
  const [showIndicatorInfo, setShowIndicatorInfo] = useState(false);

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

  // 获取图表配置
  const getChartOption = () => {
    const indicator = getIndicatorByType(currentIndicator);

    const series = selectedCities.map((city, index) => {
      const cityData = weatherData.find(d => d.cityId === city.id);
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

  // 过滤城市列表
  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.province.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <h2 className="text-xl font-bold mb-4">选择城市</h2>
              <input
                type="text"
                placeholder="搜索城市名称或省份"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {filteredCities.map((city) => {
                  const isSelected = !!selectedCities.find(c => c.id === city.id);
                  return (
                    <button
                      key={city.id}
                      onClick={() => {
                        addCity(city);
                        setShowCitySelector(false);
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
                      <span className="block text-xs text-gray-500">
                        {city.province}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => {
                  setShowCitySelector(false);
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
