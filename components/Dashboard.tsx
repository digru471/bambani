import React, { useState, useEffect, useMemo } from 'react';
import { User, Shipment, Page } from '../App';
import { api } from '../api';
import { SpinnerIcon, SearchIcon, ShoppingCartIcon, TruckIcon, ClockIcon, ArchiveBoxIcon, ChevronDownIcon, ChevronUpIcon } from './IconComponents';

interface DashboardProps {
  user: User;
  onNavigate: (page: Page, data?: any) => void;
}

interface StatCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  bgColor: string;
  details?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, count, icon, bgColor, details }) => (
  <div className={`p-4 rounded-lg text-white ${bgColor}`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-3xl font-bold">{count}</p>
        <p className="font-semibold">{title}</p>
        {details && <p className="text-xs mt-1">{details}</p>}
      </div>
      <div className="text-4xl opacity-70">{icon}</div>
    </div>
  </div>
);

const ChartContainer: React.FC<{ title: string; filterOptions: string[]; children: React.ReactNode; }> = ({ title, filterOptions, children }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
    <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-700 text-center flex-grow">{title}</h3>
        <select className="text-sm border-gray-300 rounded-md shadow-sm">
            {filterOptions.map(opt => <option key={opt}>{opt}</option>)}
        </select>
    </div>
    <div className="h-64 flex items-center justify-center border-t pt-2">{children}</div>
  </div>
);

const LineChartPlaceholder: React.FC<{dataPoints: number}> = ({ dataPoints }) => {
    const dates = Array.from({length: dataPoints}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (dataPoints - 1 - i));
        return `${date.getDate()}-${date.toLocaleString('default', { month: 'short' })}`;
    });

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-grow w-full relative">
                <svg width="100%" height="100%" viewBox="0 0 500 200" preserveAspectRatio="none">
                    <path d="M 0 150 Q 50 100, 100 130 T 200 120 T 300 160 T 400 110 T 500 140" stroke="#f87171" fill="none" strokeWidth="2"/>
                    <circle cx="100" cy="130" r="3" fill="#f87171" />
                    <circle cx="200" cy="120" r="3" fill="#f87171" />
                    <circle cx="300" cy="160" r="3" fill="#f87171" />
                    <circle cx="400" cy="110" r="3" fill="#f87171" />
                    <circle cx="500" cy="140" r="3" fill="#f87171" />
                </svg>
            </div>
            <div className="flex justify-between text-xs text-gray-500 px-2">
                {dates.map((date, i) => i % Math.floor(dataPoints/6) === 0 && <span key={date}>{date}</span>)}
            </div>
        </div>
    );
};

const EmptyChartPlaceholder: React.FC<{ message: string }> = ({ message }) => (
    <div className="text-center text-gray-400">
        <p>{message}</p>
    </div>
);

type SortableKeys = 'trackingId' | 'courier' | 'origin' | 'destination' | 'status';

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'In Transit' | 'Delivered'>('All');
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys | null; direction: 'ascending' | 'descending' }>({
    key: null,
    direction: 'ascending',
  });

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        // In a real app, this would fetch all shipments for the user,
        // but for demo, we can fetch all and filter by user on client
        const allShipments = await api.getAllShipments();
        const userShipments = allShipments.filter(s => s.userId === user.id || user.role === 'admin');
        setShipments(userShipments);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch shipments.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchShipments();
  }, [user.id, user.role]);

  const stats = useMemo(() => {
    const statusCounts = shipments.reduce((acc, s) => {
        const status = s.status.toLowerCase();
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {} as {[key: string]: number});

    const pendingCount = (statusCounts['in transit'] || 0) + (statusCounts['out for delivery'] || 0);
    
    return {
        booking: statusCounts['booked'] || 0,
        delivered: statusCounts['delivered'] || 0,
        pending: pendingCount,
        pendingDetails: `INTRANSIT ${statusCounts['in transit'] || 0}  OFD ${statusCounts['out for delivery'] || 0}`,
        ndr: 0, // Mocked as no data
    };
  }, [shipments]);

  const sortedAndFilteredShipments = useMemo(() => {
    let sortableItems = [...shipments];

    // Filtering
    if (filterStatus !== 'All') {
      sortableItems = sortableItems.filter(s => s.status === filterStatus);
    }

    // Sorting
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const valA = a[sortConfig.key!];
        const valB = b[sortConfig.key!];
        
        if (valA < valB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableItems;
  }, [shipments, filterStatus, sortConfig]);

  const requestSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIcon = (key: SortableKeys) => {
    if (sortConfig.key !== key) {
        return <ChevronDownIcon className="w-4 h-4 text-gray-300" />;
    }
    if (sortConfig.direction === 'ascending') {
        return <ChevronUpIcon className="w-4 h-4 text-gray-600" />;
    }
    return <ChevronDownIcon className="w-4 h-4 text-gray-600" />;
  };

  const SortableHeader: React.FC<{ sortKey: SortableKeys; children: React.ReactNode; }> = ({ sortKey, children }) => (
    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      <button onClick={() => requestSort(sortKey)} className="flex items-center space-x-1 group focus:outline-none">
        <span className={`${sortConfig.key === sortKey ? 'text-gray-900' : 'group-hover:text-gray-800'}`}>{children}</span>
        {getSortIcon(sortKey)}
      </button>
    </th>
  );


  if (isLoading) {
    return (
      <main className="flex justify-center items-center min-h-[calc(100vh-128px)] bg-gray-100">
        <SpinnerIcon className="animate-spin h-8 w-8 text-blue-600" />
      </main>
    );
  }

  if (error) {
     return <main className="flex justify-center items-center min-h-[calc(100vh-128px)] bg-gray-100"><p className="text-center text-red-600 p-8">{error}</p></main>
  }
  
  return (
    <main className="min-h-screen bg-gray-100 p-4">
        <div className="container mx-auto">
            {/* Header */}
            <div className="bg-slate-700 text-white p-3 rounded-t-lg shadow-md flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-lg font-semibold">Dashboard</h2>
                <div className="flex items-center gap-2 flex-wrap">
                    <input type="date" defaultValue="2025-10-01" className="bg-white text-gray-800 border-gray-300 rounded-md shadow-sm text-sm p-1.5"/>
                    <input type="date" defaultValue="2025-10-16" className="bg-white text-gray-800 border-gray-300 rounded-md shadow-sm text-sm p-1.5"/>
                    <button className="bg-red-500 hover:bg-red-600 p-2 rounded-md">
                        <SearchIcon className="w-5 h-5"/>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white p-4 rounded-b-lg shadow-md">
                <h3 className="font-semibold text-gray-800 mb-4">Shipment Details</h3>
                
                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatCard title="BOOKING" count={stats.booking} icon={<ShoppingCartIcon />} bgColor="bg-teal-500" />
                    <StatCard title="DELIVERED" count={stats.delivered} icon={<TruckIcon />} bgColor="bg-green-500" />
                    <StatCard title="PENDING" count={stats.pending} icon={<ClockIcon />} bgColor="bg-yellow-500" details={stats.pendingDetails} />
                    <StatCard title="NDR" count={stats.ndr} icon={<ArchiveBoxIcon />} bgColor="bg-red-500" />
                </div>
                
                {/* Charts */}
                <div className="space-y-6">
                    <ChartContainer title="Day Wise Shipment Status" filterOptions={['30 Days', '15 Days', '7 Days']}>
                        <LineChartPlaceholder dataPoints={30} />
                    </ChartContainer>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <ChartContainer title="Month - Total Shipment" filterOptions={['3 Months', '6 Months', '1 Year']}>
                            <EmptyChartPlaceholder message="Monthly shipment data will be shown here." />
                        </ChartContainer>
                        <ChartContainer title="Status - Total Shipment" filterOptions={['Life Time', 'This Year']}>
                             <EmptyChartPlaceholder message="Shipment status distribution will be shown here." />
                        </ChartContainer>
                        <ChartContainer title="Country - Total Shipment" filterOptions={['Life Time', 'This Year']}>
                             <EmptyChartPlaceholder message="Shipment country distribution will be shown here." />
                        </ChartContainer>
                    </div>

                     <ChartContainer title="SHIPMENT BOOKING/STATUS TREND" filterOptions={['30 Days', '15 Days', '7 Days']}>
                        <LineChartPlaceholder dataPoints={30} />
                    </ChartContainer>
                </div>
            </div>

             {/* Shipments List with Filters */}
            <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                    <h3 className="text-xl font-semibold text-gray-800">Your Shipments</h3>
                    <div className="flex space-x-2" role="group">
                        {(['All', 'In Transit', 'Delivered'] as const).map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                    filterStatus === status
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                                aria-pressed={filterStatus === status}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {sortedAndFilteredShipments.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <SortableHeader sortKey="trackingId">Tracking ID</SortableHeader>
                                    <SortableHeader sortKey="courier">Courier</SortableHeader>
                                    <SortableHeader sortKey="origin">Origin</SortableHeader>
                                    <SortableHeader sortKey="destination">Destination</SortableHeader>
                                    <SortableHeader sortKey="status">Status</SortableHeader>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sortedAndFilteredShipments.map(shipment => (
                                    <tr 
                                      key={shipment.id} 
                                      onClick={() => onNavigate('shipment-detail', shipment.id)} 
                                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                                      tabIndex={0}
                                      onKeyPress={(e) => e.key === 'Enter' && onNavigate('shipment-detail', shipment.id)}
                                      aria-label={`View details for shipment ${shipment.trackingId}`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{shipment.trackingId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.courier}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.origin}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.destination}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                shipment.status === 'In Transit' || shipment.status === 'Out for Delivery' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {shipment.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p>No shipments found for the selected status.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </main>
  );
};

export default Dashboard;