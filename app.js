/**
 * Nexus Sales Analytics Dashboard
 * Pure Vanilla JavaScript with WebStorage (localStorage) Persistence
 */

(function () {
  'use strict';

  // --- Constants & Storage Key ---
  const STORAGE_KEY = 'nexus_sales_analytics_dataset_v1';

  // Seed Data: 36 diverse transactions
  const INITIAL_TRANSACTIONS = [
    { id: 'ORD-9101', date: '2026-11-01', customer: 'Acme Enterprise', product: 'Cloud Infrastructure Pro', category: 'Cloud Services', region: 'North America', channel: 'Direct Sales', amount: 14800, cost: 4200, status: 'Completed' },
    { id: 'ORD-9102', date: '2026-11-01', customer: 'BioTech Solutions', product: 'Enterprise Security Suite', category: 'Software', region: 'Europe', channel: 'Direct Sales', amount: 8900, cost: 1800, status: 'Completed' },
    { id: 'ORD-9103', date: '2026-10-31', customer: 'Nordic Retail Group', product: 'AI Predictive Engine', category: 'Software', region: 'Europe', channel: 'Channel Partner', amount: 12400, cost: 3100, status: 'Completed' },
    { id: 'ORD-9104', date: '2026-10-31', customer: 'Horizon Logistics', product: 'Dedicated Rack Hardware', category: 'Hardware', region: 'North America', channel: 'Direct Sales', amount: 18200, cost: 9500, status: 'Completed' },
    { id: 'ORD-9105', date: '2026-10-30', customer: 'Apex Health Systems', product: 'Annual Support SLA', category: 'Support', region: 'North America', channel: 'Referral', amount: 6200, cost: 1200, status: 'Completed' },
    { id: 'ORD-9106', date: '2026-10-30', customer: 'Tokyo FinTech Labs', product: 'Cloud Infrastructure Pro', category: 'Cloud Services', region: 'Asia Pacific', channel: 'Online / Self-Serve', amount: 15600, cost: 4400, status: 'Completed' },
    { id: 'ORD-9107', date: '2026-10-29', customer: 'Starlight Media', product: 'Strategy Consulting', category: 'Consulting', region: 'North America', channel: 'Direct Sales', amount: 9500, cost: 2800, status: 'Processing' },
    { id: 'ORD-9108', date: '2026-10-29', customer: 'Sydney Solar Co', product: 'Enterprise Security Suite', category: 'Software', region: 'Asia Pacific', channel: 'Channel Partner', amount: 7800, cost: 1600, status: 'Completed' },
    { id: 'ORD-9109', date: '2026-10-28', customer: 'Atlas Global Logistics', product: 'Edge Router Matrix', category: 'Hardware', region: 'Europe', channel: 'Direct Sales', amount: 11200, cost: 5800, status: 'Completed' },
    { id: 'ORD-9110', date: '2026-10-28', customer: 'Sao Paulo Fintech', product: 'Cloud Infrastructure Pro', category: 'Cloud Services', region: 'Latin America', channel: 'Online / Self-Serve', amount: 13500, cost: 3900, status: 'Completed' },
    { id: 'ORD-9111', date: '2026-10-27', customer: 'Dubai Smart City', product: 'AI Predictive Engine', category: 'Software', region: 'Middle East', channel: 'Direct Sales', amount: 22000, cost: 5200, status: 'Completed' },
    { id: 'ORD-9112', date: '2026-10-26', customer: 'Bavaria Motor Works', product: 'Migration Consulting', category: 'Consulting', region: 'Europe', channel: 'Direct Sales', amount: 14000, cost: 3800, status: 'Completed' },
    { id: 'ORD-9113', date: '2026-10-25', customer: 'Pacific Energy', product: 'Dedicated Rack Hardware', category: 'Hardware', region: 'Asia Pacific', channel: 'Channel Partner', amount: 16800, cost: 8900, status: 'Refunded' },
    { id: 'ORD-9114', date: '2026-10-24', customer: 'Quantum Dynamics', product: 'Cloud Infrastructure Pro', category: 'Cloud Services', region: 'North America', channel: 'Online / Self-Serve', amount: 17200, cost: 4800, status: 'Completed' },
    { id: 'ORD-9115', date: '2026-10-22', customer: 'Lyon Robotics', product: 'Enterprise Security Suite', category: 'Software', region: 'Europe', channel: 'Referral', amount: 8400, cost: 1750, status: 'Completed' },
    { id: 'ORD-9116', date: '2026-10-20', customer: 'Seoul Telecom', product: 'Edge Router Matrix', category: 'Hardware', region: 'Asia Pacific', channel: 'Direct Sales', amount: 19500, cost: 9800, status: 'Completed' },
    { id: 'ORD-9117', date: '2026-10-18', customer: 'Ontario Power Co', product: 'Annual Support SLA', category: 'Support', region: 'North America', channel: 'Direct Sales', amount: 7200, cost: 1400, status: 'Completed' },
    { id: 'ORD-9118', date: '2026-10-15', customer: 'Madrid Retailers', product: 'AI Predictive Engine', category: 'Software', region: 'Europe', channel: 'Online / Self-Serve', amount: 11500, cost: 2800, status: 'Processing' },
    { id: 'ORD-9119', date: '2026-10-12', customer: 'Santiago AgroTech', product: 'Cloud Infrastructure Pro', category: 'Cloud Services', region: 'Latin America', channel: 'Channel Partner', amount: 10400, cost: 3100, status: 'Completed' },
    { id: 'ORD-9120', date: '2026-10-08', customer: 'Gulf Investment Corp', product: 'Strategy Consulting', category: 'Consulting', region: 'Middle East', channel: 'Direct Sales', amount: 18500, cost: 4600, status: 'Completed' },
    { id: 'ORD-9121', date: '2026-10-05', customer: 'Seattle BioLabs', product: 'Cloud Infrastructure Pro', category: 'Cloud Services', region: 'North America', channel: 'Direct Sales', amount: 16200, cost: 4300, status: 'Completed' },
    { id: 'ORD-9122', date: '2026-09-28', customer: 'Zurich Financials', product: 'Enterprise Security Suite', category: 'Software', region: 'Europe', channel: 'Direct Sales', amount: 9800, cost: 2000, status: 'Completed' },
    { id: 'ORD-9123', date: '2026-09-22', customer: 'Singapore Logistics', product: 'Edge Router Matrix', category: 'Hardware', region: 'Asia Pacific', channel: 'Online / Self-Serve', amount: 13900, cost: 7100, status: 'Completed' },
    { id: 'ORD-9124', date: '2026-09-15', customer: 'Copenhagen Wind', product: 'AI Predictive Engine', category: 'Software', region: 'Europe', channel: 'Channel Partner', amount: 12800, cost: 3000, status: 'Completed' },
    { id: 'ORD-9125', date: '2026-09-10', customer: 'Austin Semiconductors', product: 'Dedicated Rack Hardware', category: 'Hardware', region: 'North America', channel: 'Direct Sales', amount: 24500, cost: 12800, status: 'Completed' },
    { id: 'ORD-9126', date: '2026-08-25', customer: 'Milan Fashion Hub', product: 'Cloud Infrastructure Pro', category: 'Cloud Services', region: 'Europe', channel: 'Online / Self-Serve', amount: 11800, cost: 3200, status: 'Completed' },
    { id: 'ORD-9127', date: '2026-08-18', customer: 'Rio Renewables', product: 'Annual Support SLA', category: 'Support', region: 'Latin America', channel: 'Referral', amount: 5900, cost: 1100, status: 'Completed' },
    { id: 'ORD-9128', date: '2026-08-11', customer: 'Melbourne University', product: 'AI Predictive Engine', category: 'Software', region: 'Asia Pacific', channel: 'Direct Sales', amount: 13200, cost: 3100, status: 'Completed' },
    { id: 'ORD-9129', date: '2026-07-29', customer: 'Abu Dhabi Airports', product: 'Enterprise Security Suite', category: 'Software', region: 'Middle East', channel: 'Direct Sales', amount: 21000, cost: 4900, status: 'Completed' },
    { id: 'ORD-9130', date: '2026-07-15', customer: 'Denver Health Network', product: 'Cloud Infrastructure Pro', category: 'Cloud Services', region: 'North America', channel: 'Channel Partner', amount: 15400, cost: 4100, status: 'Completed' },
    { id: 'ORD-9131', date: '2026-06-30', customer: 'London Capital Group', product: 'Strategy Consulting', category: 'Consulting', region: 'Europe', channel: 'Direct Sales', amount: 16500, cost: 3900, status: 'Completed' },
    { id: 'ORD-9132', date: '2026-06-18', customer: 'Stockholm Gaming Studio', product: 'Dedicated Rack Hardware', category: 'Hardware', region: 'Europe', channel: 'Online / Self-Serve', amount: 14200, cost: 7400, status: 'Refunded' },
    { id: 'ORD-9133', date: '2026-05-24', customer: 'Kyoto Robotics Corp', product: 'AI Predictive Engine', category: 'Software', region: 'Asia Pacific', channel: 'Direct Sales', amount: 17800, cost: 4200, status: 'Completed' },
    { id: 'ORD-9134', date: '2026-04-12', customer: 'Buenos Aires Logistics', product: 'Edge Router Matrix', category: 'Hardware', region: 'Latin America', channel: 'Channel Partner', amount: 12900, cost: 6500, status: 'Completed' },
    { id: 'ORD-9135', date: '2026-03-19', customer: 'Tel Aviv Cyber Lab', product: 'Enterprise Security Suite', category: 'Software', region: 'Middle East', channel: 'Online / Self-Serve', amount: 11400, cost: 2400, status: 'Completed' },
    { id: 'ORD-9136', date: '2026-02-04', customer: 'Chicago Trading Floor', product: 'Dedicated Rack Hardware', category: 'Hardware', region: 'North America', channel: 'Direct Sales', amount: 28600, cost: 14500, status: 'Completed' }
  ];

  // Category Color Palette
  const CATEGORY_COLORS = {
    'Software': '#3b82f6',       // Blue
    'Cloud Services': '#10b981', // Emerald green
    'Hardware': '#f59e0b',       // Amber
    'Consulting': '#8b5cf6',     // Purple
    'Support': '#ec4899'         // Pink
  };

  // State
  let transactions = [];
  let currentPeriod = '7'; // '7', '30', 'year', 'all'
  let searchQuery = '';
  let statusFilter = 'all';
  let categoryFilter = 'all';
  let currentPage = 1;
  const pageSize = 7;
  let sortColumn = 'date';
  let sortDirection = 'desc';

  // DOM Elements
  const kpiRevenueEl = document.getElementById('kpiRevenue');
  const revenueTrendEl = document.getElementById('revenueTrend');
  const kpiProfitEl = document.getElementById('kpiProfit');
  const profitMarginBadgeEl = document.getElementById('profitMarginBadge');
  const kpiCostComparisonEl = document.getElementById('kpiCostComparison');
  const kpiOrdersEl = document.getElementById('kpiOrders');
  const completedRateEl = document.getElementById('completedRate');
  const kpiRefundsCountEl = document.getElementById('kpiRefundsCount');
  const kpiAovEl = document.getElementById('kpiAov');
  const topRegionLabelEl = document.getElementById('topRegionLabel');

  const trendCanvas = document.getElementById('trendChart');
  const categoryCanvas = document.getElementById('categoryChart');
  const regionCanvas = document.getElementById('regionChart');
  const chartTooltip = document.getElementById('chartTooltip');

  const categoryLegendEl = document.getElementById('categoryLegend');
  const channelDistributionEl = document.getElementById('channelDistribution');
  const topProductsListEl = document.getElementById('topProductsList');

  const tableBodyEl = document.getElementById('transactionsTableBody');
  const tableInfoEl = document.getElementById('tableInfo');
  const paginationControlsEl = document.getElementById('paginationControls');

  const searchInputEl = document.getElementById('searchInput');
  const statusFilterEl = document.getElementById('statusFilter');
  const categoryFilterEl = document.getElementById('categoryFilter');
  const timeBtns = document.querySelectorAll('.time-btn');

  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const transactionModal = document.getElementById('transactionModal');
  const newTransactionForm = document.getElementById('newTransactionForm');
  const formDateInput = document.getElementById('formDate');

  const exportCsvBtn = document.getElementById('exportCsvBtn');
  const resetDataBtn = document.getElementById('resetDataBtn');
  const toastContainer = document.getElementById('toastContainer');

  // --- WebStorage Persistence ---
  function loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        transactions = JSON.parse(stored);
      } else {
        transactions = [...INITIAL_TRANSACTIONS];
        saveData();
      }
    } catch (e) {
      console.error('Storage access failed, using memory state', e);
      transactions = [...INITIAL_TRANSACTIONS];
    }
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }

  // --- Formatting Utilities ---
  function formatCurrency(num) {
    return '$' + Number(num || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function formatShortCurrency(num) {
    if (num >= 1000000) {
      return '$' + (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return '$' + (num / 1000).toFixed(1) + 'k';
    }
    return '$' + Math.round(num);
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[parseInt(parts[1], 10) - 1]} ${parseInt(parts[2], 10)}, ${parts[0]}`;
    }
    return dateStr;
  }

  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 320);
    }, 2800);
  }

  // --- Date Range Filter Helper ---
  function getFilteredByPeriod(dataList, period) {
    if (period === 'all') return dataList;

    // Use latest transaction date as anchor for relative ranges
    const anchorDate = new Date('2026-11-01T23:59:59');

    return dataList.filter(item => {
      const itemDate = new Date(item.date + 'T00:00:00');
      if (isNaN(itemDate.getTime())) return false;

      if (period === '7') {
        const diffDays = (anchorDate - itemDate) / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays <= 7;
      }
      if (period === '30') {
        const diffDays = (anchorDate - itemDate) / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays <= 30;
      }
      if (period === 'year') {
        return itemDate.getFullYear() === anchorDate.getFullYear();
      }
      return true;
    });
  }

  // --- Core Calculation Pipeline ---
  function getDashboardData() {
    // 1. Period filtering
    const periodFiltered = getFilteredByPeriod(transactions, currentPeriod);

    // 2. Table-specific filtering (search, status, category)
    const tableFiltered = periodFiltered.filter(item => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        item.id.toLowerCase().includes(q) ||
        item.customer.toLowerCase().includes(q) ||
        item.product.toLowerCase().includes(q);

      const matchStatus = (statusFilter === 'all') || (item.status === statusFilter);
      const matchCategory = (categoryFilter === 'all') || (item.category === categoryFilter);

      return matchSearch && matchStatus && matchCategory;
    });

    // Sort table rows
    tableFiltered.sort((a, b) => {
      let valA = a[sortColumn];
      let valB = b[sortColumn];

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return {
      periodFiltered,
      tableFiltered
    };
  }

  // --- Render KPI Cards ---
  function renderKPIs(dataset) {
    const validSales = dataset.filter(d => d.status !== 'Refunded');
    const refunds = dataset.filter(d => d.status === 'Refunded');
    const completed = dataset.filter(d => d.status === 'Completed');

    const totalRevenue = validSales.reduce((acc, curr) => acc + curr.amount, 0);
    const totalCost = validSales.reduce((acc, curr) => acc + (curr.cost || (curr.amount * 0.3)), 0);
    const grossProfit = totalRevenue - totalCost;
    const profitMargin = totalRevenue > 0 ? ((grossProfit / totalRevenue) * 100).toFixed(1) : '0.0';

    const orderCount = dataset.length;
    const aov = validSales.length > 0 ? totalRevenue / validSales.length : 0;
    const completionRate = orderCount > 0 ? ((completed.length / orderCount) * 100).toFixed(0) : '0';

    // Regional breakdown for top region
    const regionTotals = {};
    validSales.forEach(s => {
      regionTotals[s.region] = (regionTotals[s.region] || 0) + s.amount;
    });
    let topRegion = 'N/A';
    let maxRegionSales = 0;
    for (const [region, sum] of Object.entries(regionTotals)) {
      if (sum > maxRegionSales) {
        maxRegionSales = sum;
        topRegion = region;
      }
    }

    kpiRevenueEl.textContent = formatCurrency(totalRevenue);
    kpiProfitEl.textContent = formatCurrency(grossProfit);
    profitMarginBadgeEl.textContent = `Margin: ${profitMargin}%`;
    kpiCostComparisonEl.textContent = `Est. Cost: ${formatCurrency(totalCost)}`;

    kpiOrdersEl.textContent = orderCount.toLocaleString();
    completedRateEl.textContent = `${completionRate}% Completed`;
    kpiRefundsCountEl.textContent = `${refunds.length} Refunded`;

    kpiAovEl.textContent = formatCurrency(aov);
    topRegionLabelEl.textContent = `Top: ${topRegion}`;
  }

  // --- Canvas Setup Helper (DPI Aware) ---
  function setupHiDPICanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { ctx, width: rect.width, height: rect.height };
  }

  // Store interactive chart points for tooltip hover
  let trendDataPoints = [];

  // --- Render Trend Chart (Area / Smooth Curves) ---
  function renderTrendChart(dataset) {
    const { ctx, width, height } = setupHiDPICanvas(trendCanvas);
    ctx.clearRect(0, 0, width, height);

    if (dataset.length === 0) {
      ctx.fillStyle = '#64748b';
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No sales records in selected time period', width / 2, height / 2);
      trendDataPoints = [];
      return;
    }

    // Group revenue and profit by date
    const dailyMap = {};
    dataset.forEach(item => {
      if (item.status === 'Refunded') return;
      if (!dailyMap[item.date]) {
        dailyMap[item.date] = { revenue: 0, profit: 0, count: 0 };
      }
      const cost = item.cost || (item.amount * 0.3);
      dailyMap[item.date].revenue += item.amount;
      dailyMap[item.date].profit += (item.amount - cost);
      dailyMap[item.date].count += 1;
    });

    const sortedDates = Object.keys(dailyMap).sort();

    // If only 1 date, pad for aesthetic line display
    let chartEntries = sortedDates.map(date => ({
      date,
      revenue: dailyMap[date].revenue,
      profit: dailyMap[date].profit,
      count: dailyMap[date].count
    }));

    if (chartEntries.length === 1) {
      chartEntries = [
        { date: 'Start', revenue: chartEntries[0].revenue * 0.8, profit: chartEntries[0].profit * 0.8, count: 0 },
        chartEntries[0]
      ];
    }

    const padding = { top: 20, right: 30, bottom: 35, left: 60 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const maxVal = Math.max(...chartEntries.map(e => e.revenue), 1000) * 1.15;

    // Draw horizontal grid lines & Y labels
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#64748b';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';

    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (chartH / gridLines) * i;
      const val = maxVal - (maxVal / gridLines) * i;

      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      ctx.fillText(formatShortCurrency(val), padding.left - 10, y + 4);
    }

    // Calculate Coordinates
    trendDataPoints = chartEntries.map((entry, index) => {
      const x = padding.left + (chartW / (chartEntries.length - 1)) * index;
      const yRev = padding.top + chartH - (entry.revenue / maxVal) * chartH;
      const yProf = padding.top + chartH - (entry.profit / maxVal) * chartH;
      return {
        ...entry,
        x,
        yRev,
        yProf
      };
    });

    // 1. Draw Revenue Gradient Fill Area
    const revGradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    revGradient.addColorStop(0, 'rgba(59, 130, 246, 0.35)');
    revGradient.addColorStop(1, 'rgba(59, 130, 246, 0.01)');

    ctx.beginPath();
    ctx.moveTo(trendDataPoints[0].x, height - padding.bottom);
    trendDataPoints.forEach(pt => ctx.lineTo(pt.x, pt.yRev));
    ctx.lineTo(trendDataPoints[trendDataPoints.length - 1].x, height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = revGradient;
    ctx.fill();

    // 2. Draw Revenue Line
    ctx.beginPath();
    ctx.moveTo(trendDataPoints[0].x, trendDataPoints[0].yRev);
    trendDataPoints.forEach(pt => ctx.lineTo(pt.x, pt.yRev));
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // 3. Draw Profit Line
    ctx.beginPath();
    ctx.moveTo(trendDataPoints[0].x, trendDataPoints[0].yProf);
    trendDataPoints.forEach(pt => ctx.lineTo(pt.x, pt.yProf));
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash

    // 4. Draw Points & X-Axis Date Labels
    ctx.textAlign = 'center';
    ctx.fillStyle = '#94a3b8';

    const step = Math.ceil(trendDataPoints.length / 6);
    trendDataPoints.forEach((pt, idx) => {
      // Draw Dot
      ctx.beginPath();
      ctx.arc(pt.x, pt.yRev, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#3b82f6';
      ctx.stroke();

      // Show X Labels at selected intervals
      if (idx % step === 0 || idx === trendDataPoints.length - 1) {
        const shortDate = pt.date.length > 5 ? pt.date.substring(5) : pt.date;
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(shortDate, pt.x, height - 12);
      }
    });
  }

  // --- Interactive Hover for Trend Chart ---
  trendCanvas.addEventListener('mousemove', function (e) {
    if (!trendDataPoints || trendDataPoints.length === 0) return;

    const rect = trendCanvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    // Find nearest point
    let nearest = null;
    let minDistance = Infinity;

    trendDataPoints.forEach(pt => {
      const dist = Math.abs(pt.x - mouseX);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = pt;
      }
    });

    if (nearest && minDistance < 50) {
      chartTooltip.style.opacity = '1';
      chartTooltip.style.left = `${nearest.x}px`;
      chartTooltip.style.top = `${nearest.yRev - 55}px`;
      chartTooltip.innerHTML = `
        <div style="font-weight: 700; color: #ffffff; margin-bottom: 2px;">${formatDate(nearest.date)}</div>
        <div style="color: #38bdf8;">Revenue: ${formatCurrency(nearest.revenue)}</div>
        <div style="color: #10b981;">Profit: ${formatCurrency(nearest.profit)}</div>
      `;
    } else {
      chartTooltip.style.opacity = '0';
    }
  });

  trendCanvas.addEventListener('mouseleave', function () {
    chartTooltip.style.opacity = '0';
  });

  // --- Render Category Donut Chart ---
  function renderCategoryChart(dataset) {
    const { ctx, width, height } = setupHiDPICanvas(categoryCanvas);
    ctx.clearRect(0, 0, width, height);

    const validData = dataset.filter(d => d.status !== 'Refunded');
    const categoryTotals = {};
    let totalRevenue = 0;

    validData.forEach(d => {
      categoryTotals[d.category] = (categoryTotals[d.category] || 0) + d.amount;
      totalRevenue += d.amount;
    });

    const categories = Object.keys(categoryTotals);
    if (categories.length === 0 || totalRevenue === 0) {
      ctx.fillStyle = '#64748b';
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No category sales', width / 2, height / 2);
      categoryLegendEl.innerHTML = '';
      return;
    }

    const centerX = width / 2;
    const centerY = height / 2;
    const outerRadius = Math.min(centerX, centerY) - 15;
    const innerRadius = outerRadius * 0.62;

    let startAngle = -Math.PI / 2;

    categories.forEach(cat => {
      const sliceAngle = (categoryTotals[cat] / totalRevenue) * (Math.PI * 2);
      const endAngle = startAngle + sliceAngle;
      const color = CATEGORY_COLORS[cat] || '#64748b';

      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Border between slices
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      startAngle = endAngle;
    });

    // Center text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.fillText('TOTAL SALES', centerX, centerY - 10);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(formatShortCurrency(totalRevenue), centerX, centerY + 10);

    // Build Category Legends in HTML
    categoryLegendEl.innerHTML = categories.map(cat => {
      const amount = categoryTotals[cat];
      const pct = ((amount / totalRevenue) * 100).toFixed(0);
      const color = CATEGORY_COLORS[cat] || '#64748b';
      return `
        <div class="legend-item">
          <div class="legend-info">
            <span class="legend-color-box" style="background-color: ${color};"></span>
            <span>${cat}</span>
          </div>
          <span class="legend-val">${pct}%</span>
        </div>
      `;
    }).join('');
  }

  // --- Render Territory Regional Bar Chart ---
  function renderRegionChart(dataset) {
    const { ctx, width, height } = setupHiDPICanvas(regionCanvas);
    ctx.clearRect(0, 0, width, height);

    const validData = dataset.filter(d => d.status !== 'Refunded');
    const regionSums = {};
    validData.forEach(d => {
      regionSums[d.region] = (regionSums[d.region] || 0) + d.amount;
    });

    const regions = Object.keys(regionSums);
    if (regions.length === 0) {
      ctx.fillStyle = '#64748b';
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No territory data', width / 2, height / 2);
      return;
    }

    const padding = { top: 25, right: 20, bottom: 40, left: 55 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const maxVal = Math.max(...Object.values(regionSums), 5000) * 1.15;

    // Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#64748b';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';

    for (let i = 0; i <= 3; i++) {
      const y = padding.top + (chartH / 3) * i;
      const val = maxVal - (maxVal / 3) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
      ctx.fillText(formatShortCurrency(val), padding.left - 8, y + 4);
    }

    // Bars
    const barWidth = Math.min(chartW / regions.length * 0.55, 42);
    const step = chartW / regions.length;

    regions.forEach((region, index) => {
      const val = regionSums[region];
      const barH = (val / maxVal) * chartH;
      const x = padding.left + (step * index) + (step - barWidth) / 2;
      const y = padding.top + chartH - barH;

      // Bar gradient
      const barGrad = ctx.createLinearGradient(0, y, 0, y + barH);
      barGrad.addColorStop(0, '#38bdf8');
      barGrad.addColorStop(1, '#0284c7');

      ctx.fillStyle = barGrad;
      // Draw rounded top bar
      const radius = 4;
      ctx.beginPath();
      ctx.moveTo(x, y + barH);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.lineTo(x + barWidth - radius, y);
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
      ctx.lineTo(x + barWidth, y + barH);
      ctx.closePath();
      ctx.fill();

      // Top value label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(formatShortCurrency(val), x + barWidth / 2, y - 6);

      // Bottom label (abbreviate long region names)
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      const shortRegion = region === 'North America' ? 'N. Amer' :
                          region === 'Asia Pacific' ? 'APAC' :
                          region === 'Latin America' ? 'LATAM' :
                          region === 'Middle East' ? 'M. East' : region;
      ctx.fillText(shortRegion, x + barWidth / 2, height - 12);
    });
  }

  // --- Render Channel Distribution Bars ---
  function renderChannelDistribution(dataset) {
    const validData = dataset.filter(d => d.status !== 'Refunded');
    const channelSums = {};
    let total = 0;

    validData.forEach(d => {
      channelSums[d.channel] = (channelSums[d.channel] || 0) + d.amount;
      total += d.amount;
    });

    const channelColors = {
      'Direct Sales': '#2563eb',
      'Online / Self-Serve': '#10b981',
      'Channel Partner': '#8b5cf6',
      'Referral': '#f59e0b'
    };

    const channels = ['Direct Sales', 'Online / Self-Serve', 'Channel Partner', 'Referral'];

    channelDistributionEl.innerHTML = channels.map(ch => {
      const amount = channelSums[ch] || 0;
      const pct = total > 0 ? ((amount / total) * 100).toFixed(1) : 0;
      const barColor = channelColors[ch] || '#3b82f6';

      return `
        <div class="channel-bar-item">
          <div class="channel-bar-header">
            <span class="channel-name">${ch}</span>
            <span class="channel-metric">${formatCurrency(amount)} (${pct}%)</span>
          </div>
          <div class="channel-progress-track">
            <div class="channel-progress-fill" style="width: ${pct}%; background-color: ${barColor};"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- Render Top Performing Products ---
  function renderTopProducts(dataset) {
    const validData = dataset.filter(d => d.status !== 'Refunded');
    const productStats = {};

    validData.forEach(d => {
      if (!productStats[d.product]) {
        productStats[d.product] = { name: d.product, revenue: 0, count: 0 };
      }
      productStats[d.product].revenue += d.amount;
      productStats[d.product].count += 1;
    });

    const sortedProducts = Object.values(productStats)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 4);

    if (sortedProducts.length === 0) {
      topProductsListEl.innerHTML = '<div style="color: #64748b; font-size: 13px; text-align: center; padding: 20px;">No sales records found</div>';
      return;
    }

    topProductsListEl.innerHTML = sortedProducts.map((p, idx) => `
      <div class="product-row">
        <div class="product-info">
          <div class="product-rank">#${idx + 1}</div>
          <div>
            <div class="product-title">${p.name}</div>
            <div class="product-sales-count">${p.count} transaction${p.count > 1 ? 's' : ''}</div>
          </div>
        </div>
        <div class="product-amount">${formatCurrency(p.revenue)}</div>
      </div>
    `).join('');
  }

  // --- Render Data Table & Pagination ---
  function renderTable(tableData) {
    const totalEntries = tableData.length;
    const totalPages = Math.ceil(totalEntries / pageSize) || 1;

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * pageSize;
    const pageItems = tableData.slice(startIndex, startIndex + pageSize);

    // Update table info text
    if (totalEntries === 0) {
      tableInfoEl.textContent = 'Showing 0 of 0 entries';
      tableBodyEl.innerHTML = `
        <tr>
          <td colspan="9" style="text-align: center; padding: 32px; color: #64748b;">
            No transactions matching current filter criteria.
          </td>
        </tr>
      `;
      paginationControlsEl.innerHTML = '';
      return;
    }

    const endIndex = Math.min(startIndex + pageSize, totalEntries);
    tableInfoEl.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${totalEntries} entries`;

    // Render table rows
    tableBodyEl.innerHTML = pageItems.map(item => {
      const statusClass = item.status === 'Completed' ? 'status-completed' :
                          item.status === 'Processing' ? 'status-processing' : 'status-refunded';

      return `
        <tr>
          <td><span class="order-code">${item.id}</span></td>
          <td>${formatDate(item.date)}</td>
          <td><span class="customer-name">${item.customer}</span></td>
          <td>${item.product}</td>
          <td><span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${CATEGORY_COLORS[item.category] || '#64748b'}; margin-right: 6px;"></span>${item.category}</td>
          <td>${item.region}</td>
          <td class="text-right" style="font-weight: 600; color: #ffffff;">${formatCurrency(item.amount)}</td>
          <td><span class="status-badge ${statusClass}">${item.status}</span></td>
          <td class="text-center">
            <button class="btn-action-delete" data-id="${item.id}" title="Delete Record">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Attach row delete listeners
    tableBodyEl.querySelectorAll('.btn-action-delete').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const id = this.getAttribute('data-id');
        deleteTransaction(id);
      });
    });

    // Render Pagination Controls
    let paginationHtml = `
      <button class="page-btn" id="prevPageBtn" ${currentPage === 1 ? 'disabled' : ''}>Prev</button>
    `;

    for (let p = 1; p <= totalPages; p++) {
      if (totalPages > 6 && Math.abs(p - currentPage) > 2 && p !== 1 && p !== totalPages) {
        if (p === 2 || p === totalPages - 1) {
          paginationHtml += `<span style="color: #64748b; padding: 0 4px;">...</span>`;
        }
        continue;
      }
      paginationHtml += `
        <button class="page-btn ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>
      `;
    }

    paginationHtml += `
      <button class="page-btn" id="nextPageBtn" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
    `;

    paginationControlsEl.innerHTML = paginationHtml;

    // Attach pagination listeners
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    if (prevBtn) prevBtn.addEventListener('click', () => { if (currentPage > 1) { currentPage--; refreshDashboard(); } });
    if (nextBtn) nextBtn.addEventListener('click', () => { if (currentPage < totalPages) { currentPage++; refreshDashboard(); } });

    paginationControlsEl.querySelectorAll('.page-btn[data-page]').forEach(btn => {
      btn.addEventListener('click', function () {
        currentPage = parseInt(this.getAttribute('data-page'), 10);
        refreshDashboard();
      });
    });
  }

  // --- Delete Transaction ---
  function deleteTransaction(id) {
    if (!confirm(`Are you sure you want to delete order ${id}?`)) return;
    transactions = transactions.filter(t => t.id !== id);
    saveData();
    showToast(`Order ${id} removed successfully`, 'danger');
    refreshDashboard();
  }

  // --- Master Refresh Function ---
  function refreshDashboard() {
    const { periodFiltered, tableFiltered } = getDashboardData();
    renderKPIs(periodFiltered);
    renderTrendChart(periodFiltered);
    renderCategoryChart(periodFiltered);
    renderRegionChart(periodFiltered);
    renderChannelDistribution(periodFiltered);
    renderTopProducts(periodFiltered);
    renderTable(tableFiltered);
  }

  // --- Export CSV Handler ---
  function exportToCSV() {
    const { tableFiltered } = getDashboardData();
    if (tableFiltered.length === 0) {
      showToast('No records to export', 'danger');
      return;
    }

    const headers = ['Order ID', 'Date', 'Customer', 'Product', 'Category', 'Region', 'Channel', 'Amount', 'Cost', 'Status'];
    const rows = tableFiltered.map(item => [
      `"${item.id}"`,
      `"${item.date}"`,
      `"${item.customer.replace(/"/g, '""')}"`,
      `"${item.product.replace(/"/g, '""')}"`,
      `"${item.category}"`,
      `"${item.region}"`,
      `"${item.channel}"`,
      item.amount,
      item.cost || 0,
      `"${item.status}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', url);
    downloadAnchor.setAttribute('download', `sales_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);

    showToast(`Exported ${tableFiltered.length} records to CSV`, 'success');
  }

  // --- Reset Sample Data ---
  function resetSampleData() {
    if (!confirm('Reset dashboard data to the original sample dataset? Any newly added transactions will be cleared.')) return;
    transactions = [...INITIAL_TRANSACTIONS];
    saveData();
    currentPage = 1;
    showToast('Dashboard data restored to default demo state', 'info');
    refreshDashboard();
  }

  // --- Modal Open/Close Logic ---
  function openModal() {
    // Default date to today (2026-11-01)
    formDateInput.value = '2026-11-01';
    transactionModal.classList.add('active');
  }

  function closeModal() {
    transactionModal.classList.remove('active');
    newTransactionForm.reset();
  }

  // --- Form Submission for New Transaction ---
  function handleFormSubmit(e) {
    e.preventDefault();

    const customer = document.getElementById('formCustomer').value.trim();
    const product = document.getElementById('formProduct').value.trim();
    const category = document.getElementById('formCategory').value;
    const region = document.getElementById('formRegion').value;
    const channel = document.getElementById('formChannel').value;
    const amount = parseFloat(document.getElementById('formAmount').value);
    const costInput = document.getElementById('formCost').value;
    const cost = costInput ? parseFloat(costInput) : amount * 0.3;
    const date = document.getElementById('formDate').value;
    const status = document.getElementById('formStatus').value;

    if (!customer || !product || isNaN(amount) || !date) {
      alert('Please fill out all required fields.');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newRecord = {
      id: `ORD-${randomNum}`,
      date,
      customer,
      product,
      category,
      region,
      channel,
      amount,
      cost,
      status
    };

    transactions.unshift(newRecord);
    saveData();
    closeModal();
    currentPage = 1;
    refreshDashboard();
    showToast(`Transaction ${newRecord.id} recorded successfully!`, 'success');
  }

  // --- Event Listeners Initialization ---
  function initEvents() {
    // Time Period Filter
    timeBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        timeBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentPeriod = this.getAttribute('data-period');
        currentPage = 1;
        refreshDashboard();
      });
    });

    // Search input (with debounce)
    let searchTimeout;
    searchInputEl.addEventListener('input', function () {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        searchQuery = searchInputEl.value;
        currentPage = 1;
        refreshDashboard();
      }, 150);
    });

    // Table Filters
    statusFilterEl.addEventListener('change', function () {
      statusFilter = this.value;
      currentPage = 1;
      refreshDashboard();
    });

    categoryFilterEl.addEventListener('change', function () {
      categoryFilter = this.value;
      currentPage = 1;
      refreshDashboard();
    });

    // Table Sort Headers
    document.querySelectorAll('.data-table th[data-sort]').forEach(th => {
      th.addEventListener('click', function () {
        const col = this.getAttribute('data-sort');
        if (sortColumn === col) {
          sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          sortColumn = col;
          sortDirection = 'desc';
        }
        refreshDashboard();
      });
    });

    // Modal controls
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelModalBtn.addEventListener('click', closeModal);
    transactionModal.addEventListener('click', function (e) {
      if (e.target === transactionModal) closeModal();
    });

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && transactionModal.classList.contains('active')) {
        closeModal();
      }
    });

    newTransactionForm.addEventListener('submit', handleFormSubmit);

    // Header actions
    exportCsvBtn.addEventListener('click', exportToCSV);
    resetDataBtn.addEventListener('click', resetSampleData);

    // Responsive Canvas Re-render on Resize
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        refreshDashboard();
      }, 200);
    });
  }

  // --- Initialization ---
  function init() {
    loadData();
    initEvents();
    refreshDashboard();
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
