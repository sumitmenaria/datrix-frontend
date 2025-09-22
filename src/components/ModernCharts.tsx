import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Legend
} from "recharts";
import { motion } from "motion/react";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass border-0 rounded-xl p-4 shadow-2xl backdrop-blur-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        {label && <p className="font-semibold text-gray-800 mb-2">{label}</p>}
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full shadow-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium text-gray-700">
              {entry.name}: <span className="font-bold">{entry.value}</span>
            </span>
          </div>
        ))}
      </motion.div>
    );
  }
  return null;
};

// Custom Legend Component
const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry: any, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-white/30"
        >
          <div
            className="w-3 h-3 rounded-full shadow-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm font-medium text-gray-700">{entry.value}</span>
        </motion.div>
      ))}
    </div>
  );
};

// Modern Pie Chart Component
export function ModernPieChart({ 
  data, 
  title, 
  height = 300,
  showLegend = true,
  innerRadius = 0,
  outerRadius = 100
}: {
  data: any[];
  title?: string;
  height?: number;
  showLegend?: boolean;
  innerRadius?: number;
  outerRadius?: number;
}) {
  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <defs>
            {data.map((entry, index) => (
              <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                <stop offset="100%" stopColor={entry.color} stopOpacity={0.7} />
              </linearGradient>
            ))}
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3"/>
            </filter>
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            dataKey="value"
            animationBegin={0}
            animationDuration={1000}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#gradient-${index})`}
                filter="url(#shadow)"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          {showLegend && <Legend content={<CustomLegend />} />}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Modern Donut Chart Component
export function ModernDonutChart({ 
  data, 
  title, 
  centerContent,
  height = 300 
}: {
  data: any[];
  title?: string;
  centerContent?: React.ReactNode;
  height?: number;
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div className="w-full relative">
      {title && <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <defs>
            {data.map((entry, index) => (
              <linearGradient key={index} id={`donut-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                <stop offset="100%" stopColor={entry.color} stopOpacity={0.6} />
              </linearGradient>
            ))}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            animationBegin={0}
            animationDuration={1200}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#donut-gradient-${index})`}
                filter="url(#glow)"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Content */}
      {centerContent && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            {centerContent}
          </div>
        </div>
      )}
    </div>
  );
}

// Modern Bar Chart Component
export function ModernBarChart({ 
  data, 
  dataKey, 
  xAxisKey = "name",
  title,
  height = 300,
  gradient = true
}: {
  data: any[];
  dataKey: string;
  xAxisKey?: string;
  title?: string;
  height?: number;
  gradient?: boolean;
}) {
  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#667eea" stopOpacity={1} />
              <stop offset="100%" stopColor="#764ba2" stopOpacity={0.8} />
            </linearGradient>
            <filter id="barShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.3"/>
            </filter>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(0,0,0,0.1)" 
            vertical={false}
          />
          <XAxis 
            dataKey={xAxisKey} 
            stroke="#666" 
            fontSize={12}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="#666" 
            fontSize={12}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey={dataKey} 
            fill={gradient ? "url(#barGradient)" : "#667eea"}
            radius={[6, 6, 0, 0]}
            filter="url(#barShadow)"
            animationDuration={1000}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Modern Line Chart Component
export function ModernLineChart({ 
  data, 
  dataKey, 
  xAxisKey = "month",
  title,
  height = 300,
  color = "#8b5cf6"
}: {
  data: any[];
  dataKey: string;
  xAxisKey?: string;
  title?: string;
  height?: number;
  color?: string;
}) {
  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
            </linearGradient>
            <filter id="lineShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.4"/>
            </filter>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(0,0,0,0.1)"
            vertical={false}
          />
          <XAxis 
            dataKey={xAxisKey} 
            stroke="#666" 
            fontSize={12}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="#666" 
            fontSize={12}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={4}
            dot={{ 
              fill: color, 
              strokeWidth: 3, 
              r: 6,
              filter: "url(#lineShadow)"
            }}
            activeDot={{ 
              r: 8, 
              stroke: color, 
              strokeWidth: 3,
              filter: "url(#lineShadow)"
            }}
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Animated Counter Component for Donut Center
export function AnimatedCounter({ 
  value, 
  suffix = "%", 
  label = "", 
  size = "large" 
}: {
  value: number;
  suffix?: string;
  label?: string;
  size?: "small" | "medium" | "large";
}) {
  const sizeClasses = {
    small: "text-lg",
    medium: "text-2xl", 
    large: "text-3xl"
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      className="text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={`font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${sizeClasses[size]}`}
      >
        {value}{suffix}
      </motion.div>
      {label && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm text-muted-foreground font-medium"
        >
          {label}
        </motion.div>
      )}
    </motion.div>
  );
}