import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const WardrobeAnalytics = ({ wardrobeItems, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Mock analytics data
  const categoryData = [
    { name: 'Tops', count: 24, percentage: 35 },
    { name: 'Bottoms', count: 18, percentage: 26 },
    { name: 'Dresses', count: 12, percentage: 18 },
    { name: 'Shoes', count: 8, percentage: 12 },
    { name: 'Accessories', count: 6, percentage: 9 }
  ];

  const wearFrequencyData = [
    { name: 'Jan', wears: 45 },
    { name: 'Feb', wears: 52 },
    { name: 'Mar', wears: 48 },
    { name: 'Apr', wears: 61 },
    { name: 'May', wears: 55 },
    { name: 'Jun', wears: 67 }
  ];

  const colorData = [
    { name: 'Black', value: 28, color: '#000000' },
    { name: 'White', value: 22, color: '#FFFFFF' },
    { name: 'Navy', value: 18, color: '#1e3a8a' },
    { name: 'Gray', value: 15, color: '#6b7280' },
    { name: 'Beige', value: 10, color: '#d2b48c' },
    { name: 'Other', value: 7, color: '#8b5cf6' }
  ];

  const insights = [
    {
      icon: 'TrendingUp',
      title: 'Most Versatile Piece',
      description: 'Black Blazer - worn 23 times this month',
      color: 'text-success'
    },
    {
      icon: 'AlertTriangle',
      title: 'Underutilized Items',
      description: '12 items worn less than 3 times',
      color: 'text-warning'
    },
    {
      icon: 'DollarSign',
      title: 'Best Cost Per Wear',
      description: 'White T-shirt - $2.50 per wear',
      color: 'text-success'
    },
    {
      icon: 'ShoppingBag',
      title: 'Recommended Purchase',
      description: 'Add more colorful accessories',
      color: 'text-brand-gold'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-brand-modal w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-brand-text-primary">
            Wardrobe Analytics
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {insights?.map((insight, index) => (
              <div key={index} className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name={insight?.icon} size={20} className={insight?.color} />
                  <h3 className="font-medium text-brand-text-primary text-sm">
                    {insight?.title}
                  </h3>
                </div>
                <p className="text-xs text-brand-text-secondary">
                  {insight?.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Category Distribution */}
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-medium text-brand-text-primary mb-4">
                Category Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12, fill: '#718096' }}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: '#718096' }}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Bar dataKey="count" fill="#C9A96E" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Color Distribution */}
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-medium text-brand-text-primary mb-4">
                Color Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={colorData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {colorData?.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry?.color}
                          stroke={entry?.color === '#FFFFFF' ? '#e2e8f0' : 'none'}
                          strokeWidth={entry?.color === '#FFFFFF' ? 1 : 0}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {colorData?.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full border"
                      style={{ 
                        backgroundColor: item?.color,
                        borderColor: item?.color === '#FFFFFF' ? '#e2e8f0' : item?.color
                      }}
                    />
                    <span className="text-xs text-brand-text-secondary">
                      {item?.name} ({item?.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Wear Frequency Trend */}
            <div className="bg-muted p-6 rounded-lg lg:col-span-2">
              <h3 className="text-lg font-medium text-brand-text-primary mb-4">
                Monthly Wear Frequency
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={wearFrequencyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12, fill: '#718096' }}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: '#718096' }}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Bar dataKey="wears" fill="#8B5A3C" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-8 bg-brand-cream p-6 rounded-lg">
            <h3 className="text-lg font-medium text-brand-text-primary mb-4 flex items-center gap-2">
              <Icon name="Lightbulb" size={20} className="text-brand-gold" />
              AI Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-brand-text-primary text-sm">
                  Wardrobe Gaps
                </h4>
                <ul className="space-y-2 text-sm text-brand-text-secondary">
                  <li className="flex items-center gap-2">
                    <Icon name="Circle" size={4} />
                    Add colorful statement pieces to break monotony
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Circle" size={4} />
                    Consider more casual weekend options
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Circle" size={4} />
                    Invest in quality basics for better cost-per-wear
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-brand-text-primary text-sm">
                  Optimization Tips
                </h4>
                <ul className="space-y-2 text-sm text-brand-text-secondary">
                  <li className="flex items-center gap-2">
                    <Icon name="Circle" size={4} />
                    Try styling underused items in new ways
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Circle" size={4} />
                    Create capsule collections for different seasons
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Circle" size={4} />
                    Document successful outfits for future reference
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardrobeAnalytics;