import { TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';

export const AdminAnalytics = () => {
  const analyticsData = [
    { month: 'January', revenue: 'Rs12,500', orders: 145, customers: 245, growth: '+5.2%' },
    { month: 'February', revenue: 'Rs14,300', orders: 167, customers: 287, growth: '+6.8%' },
    { month: 'March', revenue: 'Rs15,800', orders: 189, customers: 312, growth: '+7.4%' },
    { month: 'April', revenue: 'Rs18,200', orders: 203, customers: 345, growth: '+8.1%' },
    { month: 'May', revenue: 'Rs20,500', orders: 228, customers: 378, growth: '+9.3%' },
    { month: 'June', revenue: 'Rs24,567', orders: 267, customers: 412, growth: '+12.5%' },
  ];

  return (
    <div className="animate-fade-in pb-10 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-stone font-semibold mb-1">Insights & Trends</p>
          <h1 className="text-2xl sm:text-3xl font-display text-charcoal tracking-wide">Analytics</h1>
        </div>

        {/* Date Range Picker / Filter indicator */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-ivory/80 backdrop-blur-md rounded-xl border border-border shadow-sm text-xs font-medium text-charcoal">
          <Calendar className="w-4 h-4 text-terracotta" />
          <span>Last 6 Months (Jan - Jun)</span>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-ivory/80 backdrop-blur-md rounded-2xl border border-border shadow-sm p-5 sm:p-6">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-stone mb-2">Total Period Revenue</p>
          <p className="text-2xl sm:text-3xl font-display text-charcoal mb-1">Rs105,867</p>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% vs previous 6 months</span>
          </div>
        </div>

        <div className="bg-ivory/80 backdrop-blur-md rounded-2xl border border-border shadow-sm p-5 sm:p-6">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-stone mb-2">Total Orders Placed</p>
          <p className="text-2xl sm:text-3xl font-display text-charcoal mb-1">1,199</p>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+12.1% growth rate</span>
          </div>
        </div>

        <div className="bg-ivory/80 backdrop-blur-md rounded-2xl border border-border shadow-sm p-5 sm:p-6">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-stone mb-2">Customer Acquisition</p>
          <p className="text-2xl sm:text-3xl font-display text-charcoal mb-1">1,979</p>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+15.7% active accounts</span>
          </div>
        </div>
      </div>

      {/* Analytics Table */}
      <div className="bg-ivory/80 backdrop-blur-md rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-border/60">
          <h2 className="text-lg sm:text-xl font-display text-charcoal">Monthly Performance</h2>
          <p className="text-xs text-stone mt-0.5">Key financial and operational metrics by month</p>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-border/60 bg-sand/30">
                <th className="text-left py-3.5 px-6 text-[10px] uppercase tracking-wider text-stone font-semibold">Month</th>
                <th className="text-left py-3.5 px-6 text-[10px] uppercase tracking-wider text-stone font-semibold">Revenue</th>
                <th className="text-left py-3.5 px-6 text-[10px] uppercase tracking-wider text-stone font-semibold">Orders</th>
                <th className="text-left py-3.5 px-6 text-[10px] uppercase tracking-wider text-stone font-semibold">New Customers</th>
                <th className="text-left py-3.5 px-6 text-[10px] uppercase tracking-wider text-stone font-semibold">Growth Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {analyticsData.map((data, index) => (
                <tr key={index} className="hover:bg-sand/20 transition-colors group">
                  <td className="py-4 px-6 text-charcoal font-medium group-hover:text-terracotta transition-colors">{data.month}</td>
                  <td className="py-4 px-6 text-charcoal font-display text-base font-semibold">{data.revenue}</td>
                  <td className="py-4 px-6 text-charcoal/80 font-medium">{data.orders}</td>
                  <td className="py-4 px-6 text-charcoal/80 font-medium">{data.customers}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <TrendingUp className="w-3 h-3" />
                      {data.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-ivory/80 backdrop-blur-md rounded-2xl border border-border shadow-sm p-6">
          <h2 className="text-lg font-display text-charcoal mb-4">Revenue Trend</h2>
          <div className="h-56 bg-gradient-to-br from-sand/30 to-sand/10 border border-dashed border-border rounded-xl flex items-center justify-center">
            <p className="text-xs uppercase tracking-widest text-stone font-semibold">Revenue chart visualization</p>
          </div>
        </div>
        <div className="bg-ivory/80 backdrop-blur-md rounded-2xl border border-border shadow-sm p-6">
          <h2 className="text-lg font-display text-charcoal mb-4">Order Distribution</h2>
          <div className="h-56 bg-gradient-to-br from-sand/30 to-sand/10 border border-dashed border-border rounded-xl flex items-center justify-center">
            <p className="text-xs uppercase tracking-widest text-stone font-semibold">Distribution chart visualization</p>
          </div>
        </div>
      </div>
    </div>
  );
};
