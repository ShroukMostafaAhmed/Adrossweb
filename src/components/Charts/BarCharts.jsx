import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const BarCharts = ({ data = [] }) => {
  if (!data || data.length === 0)
    return <p className="text-center text-gray-500 mt-6">لا توجد بيانات لعرضها</p>;

  // دالة لتحويل الوقت من HH:MM:SS إلى دقائق (للرسم البياني فقط)
  const timeToMinutes = (timeStr) => {
    if (!timeStr || timeStr === "00:00:00") return 0;
    const parts = timeStr.split(':');
    const hours = parseInt(parts[0]) || 0;
    const minutes = parseInt(parts[1]) || 0;
    const seconds = parseInt(parts[2]) || 0;
    return hours * 60 + minutes + (seconds / 60);
  };

  // دالة لتنسيق الوقت للعرض (كما هو من API)
  const formatTimeDisplay = (timeStr) => {
    if (!timeStr || timeStr === "00:00:00") return "00:00:00";
    return timeStr;
  };

  // تحضير البيانات للرسم البياني
  const chartData = data.map(item => ({
    day: item.day,
    originalTime: item.value || "00:00:00",
    valueInMinutes: timeToMinutes(item.value),
  }));

  // التولتيب المخصص
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">اليوم: {label}</p>
          <p className="text-blue-600">
            الزمن: {payload[0]?.payload?.originalTime || "00:00:00"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-6xl mt-10 p-6 rounded-xl">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          barGap={6}
          margin={{ top: 50, right: 30, left: 30, bottom: 10 }}
        >
          <XAxis
            dataKey="day"
            tick={{ fill: '#94A3B8', fontSize: 16, fontWeight: '600' }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'transparent' }}
            offset={10}
          />

          <Bar
            dataKey="valueInMinutes"
            radius={[10, 10, 0, 0]}
            barSize={50}
            label={{
              position: 'top',
              fill: '#1D4ED8',
              fontSize: 14,
              fontWeight: '600',
              formatter: (value) => {
                const item = chartData.find(d => d.valueInMinutes === value);
                return item ? item.originalTime : "00:00:00";
              }
            }}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.day === 'الأربعاء' ? '#FF6B6B' : '#1E78EB'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarCharts;