import { OrderLog } from '../types';

const VISITOR_COUNT_KEY = 'vibe_check_visitor_count';
const WHATSAPP_CLICKS_KEY = 'vibe_check_whatsapp_clicks';
const ORDER_LOGS_KEY = 'vibe_check_order_logs';
const SESSION_VISITED_KEY = 'vibe_check_session_visited';

export function getVisitorCount(): number {
  const stored = localStorage.getItem(VISITOR_COUNT_KEY);
  if (!stored) {
    // Initial baseline realistic visits
    const initial = 1420;
    localStorage.setItem(VISITOR_COUNT_KEY, initial.toString());
    return initial;
  }
  return parseInt(stored, 10);
}

export function recordVisit(): number {
  let count = getVisitorCount();
  const sessionVisited = sessionStorage.getItem(SESSION_VISITED_KEY);
  if (!sessionVisited) {
    count += 1;
    localStorage.setItem(VISITOR_COUNT_KEY, count.toString());
    sessionStorage.setItem(SESSION_VISITED_KEY, 'true');
  }
  return count;
}

export function getWhatsAppClicks(): number {
  const stored = localStorage.getItem(WHATSAPP_CLICKS_KEY);
  if (!stored) {
    const initial = 384;
    localStorage.setItem(WHATSAPP_CLICKS_KEY, initial.toString());
    return initial;
  }
  return parseInt(stored, 10);
}

export function recordWhatsAppClick(logDetails?: Partial<OrderLog>): number {
  const current = getWhatsAppClicks() + 1;
  localStorage.setItem(WHATSAPP_CLICKS_KEY, current.toString());

  const logs = getOrderLogs();
  const newLog: OrderLog = {
    id: `VC-${Date.now().toString().slice(-6)}`,
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    type: logDetails?.type || 'direct_chat',
    items: logDetails?.items || 'Direct Menu WhatsApp Inquiry',
    totalAmount: logDetails?.totalAmount || 0,
    orderMode: logDetails?.orderMode || 'pickup',
    customerName: logDetails?.customerName || 'Customer via Web'
  };

  logs.unshift(newLog);
  // Keep last 50 logs
  localStorage.setItem(ORDER_LOGS_KEY, JSON.stringify(logs.slice(0, 50)));

  return current;
}

export function getOrderLogs(): OrderLog[] {
  const stored = localStorage.getItem(ORDER_LOGS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback
    }
  }

  // Initial seed logs
  const initialLogs: OrderLog[] = [
    {
      id: 'VC-883192',
      timestamp: 'Today, 2:45 PM',
      type: 'menu_order',
      items: '2x OG Crispy Chicken, 1x Biscoff Shake, 1x B**F Loaded Fries',
      totalAmount: 710,
      orderMode: 'rapido',
      customerName: 'Aamir K.'
    },
    {
      id: 'VC-883140',
      timestamp: 'Today, 1:15 PM',
      type: 'catering_inquiry',
      items: 'Bulk Birthday Box (30 Lamb Smash Burgers + 30 Shakes)',
      totalAmount: 11400,
      orderMode: 'catering',
      customerName: 'Zainab Begum'
    },
    {
      id: 'VC-882981',
      timestamp: 'Today, 11:30 AM',
      type: 'item_modal',
      items: '1x Double Smash Lamb, 1x Fizzy Jamun',
      totalAmount: 550,
      orderMode: 'pickup',
      customerName: 'Rahul V.'
    },
    {
      id: 'VC-882650',
      timestamp: 'Yesterday, 9:20 PM',
      type: 'menu_order',
      items: '1x OG Nashville Chicken, 1x Cheezy Chicken Tenders',
      totalAmount: 370,
      orderMode: 'pickup',
      customerName: 'Tariq M.'
    }
  ];

  localStorage.setItem(ORDER_LOGS_KEY, JSON.stringify(initialLogs));
  return initialLogs;
}

export function exportLogsToCSV() {
  const logs = getOrderLogs();
  const headers = ['Order ID', 'Timestamp', 'Lead Type', 'Customer / Note', 'Items Ordered', 'Estimated Total (₹)', 'Fulfillment Mode'];
  
  const rows = logs.map(log => [
    `"${log.id}"`,
    `"${log.timestamp}"`,
    `"${log.type}"`,
    `"${log.customerName || ''}"`,
    `"${(log.items || '').replace(/"/g, '""')}"`,
    log.totalAmount || 0,
    `"${log.orderMode || 'pickup'}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `vibe_check_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
