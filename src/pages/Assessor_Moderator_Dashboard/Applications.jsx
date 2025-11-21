import React, { useState, useMemo } from 'react';
import { 
    FaListAlt, 
    FaSearch, 
    FaSortAmountDown, 
    FaCheckCircle, 
    FaClock, 
    FaTimesCircle, 
    FaBriefcase,
    FaHourglassHalf // For Pending
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const mockApplications = [
    {
        id: 101,
        jobTitle: "ETDP Assessor Needed - Johannesburg",
        sdpName: "Global Skills Academy",
        status: "Shortlisted",
        dateApplied: "2025-10-25",
        viewDetails: "/job-details/101",
    },
    {
        id: 102,
        jobTitle: "Plumbing Moderator - Pretoria West",
        sdpName: "Tshwane Trade Centre",
        status: "Rejected",
        dateApplied: "2025-10-20",
        viewDetails: "/job-details/102",
    },
    {
        id: 103,
        jobTitle: "IT Technician Assessor",
        sdpName: "TechPro Training",
        status: "Pending",
        dateApplied: "2025-11-01",
        viewDetails: "/job-details/103",
    },
    {
        id: 104,
        jobTitle: "Civil Engineering Moderator",
        sdpName: "Infrastructure Educators",
        status: "Hired",
        dateApplied: "2025-09-15",
        viewDetails: "/job-details/104",
    },
    {
        id: 105,
        jobTitle: "Generic Management Assessor",
        sdpName: "Corporate Skills Hub",
        status: "Pending",
        dateApplied: "2025-11-10",
        viewDetails: "/job-details/105",
    },
];

// Helper function to map status to styling and icon
const getStatusInfo = (status) => {
    switch (status) {
        case "Shortlisted":
            return { icon: FaCheckCircle, color: "text-green-600", bg: "bg-green-100", label: "Shortlisted" };
        case "Pending":
            return { icon: FaHourglassHalf, color: "text-yellow-600", bg: "bg-yellow-100", label: "Awaiting Review" };
        case "Rejected":
            return { icon: FaTimesCircle, color: "text-red-600", bg: "bg-red-100", label: "Rejected" };
        case "Hired":
            return { icon: FaBriefcase, color: "text-blue-600", bg: "bg-blue-100", label: "Hired" };
        default:
            return { icon: FaClock, color: "text-gray-500", bg: "bg-gray-100", label: "Unknown" };
    }
};

const Applications = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState(mockApplications);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    // Memoized list filtering and sorting
    const filteredApplications = useMemo(() => {
        let list = applications.filter(app => {
            const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  app.sdpName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = filterStatus === 'All' || app.status === filterStatus;
            return matchesSearch && matchesStatus;
        });

        // Simple sort by dateApplied (latest first)
        return list.sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied));

    }, [applications, searchTerm, filterStatus]);

    // Extract unique statuses for filter options
    const uniqueStatuses = useMemo(() => {
        const statuses = mockApplications.map(app => app.status);
        return ['All', ...new Set(statuses)];
    }, []);

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-6">

                {/* --- Header --- */}
                <h1 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6 flex items-center gap-3">
                    <FaListAlt className="text-blue-600" /> My Job Applications
                </h1>

                {/* --- Filter and Search Bar --- */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    
                    {/* Search Input */}
                    <div className="relative flex-grow w-full md:w-1/3">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by job title or SDP..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        />
                    </div>

                    {/* Status Filter Dropdown */}
                    <div className="flex items-center space-x-2 w-full md:w-auto">
                        <span className="text-gray-600 font-medium whitespace-nowrap"><FaSortAmountDown /> Filter Status:</span>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 transition duration-150"
                        >
                            {uniqueStatuses.map(status => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* --- Application List --- */}
                <div className="space-y-4">
                    {filteredApplications.length > 0 ? (
                        filteredApplications.map((app) => {
                            const statusInfo = getStatusInfo(app.status);
                            
                            return (
                                <div
                                    key={app.id}
                                    className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 bg-white border-l-4 border-blue-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                    {/* Application Details */}
                                    <div className="flex-1 min-w-0 mb-3 md:mb-0">
                                        <h2 className="text-lg font-semibold text-gray-800">{app.jobTitle}</h2>
                                        <p className="text-sm text-gray-600 mt-1">
                                            **SDP:** <span className="font-medium text-blue-700">{app.sdpName}</span>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Applied on: {new Date(app.dateApplied).toLocaleDateString()}
                                        </p>
                                    </div>

                                    {/* Status Badge and Action */}
                                    <div className="flex items-center space-x-4">
                                        {/* Status Badge */}
                                        <div className={`flex items-center px-3 py-1 rounded-full text-xs font-bold ${statusInfo.color} ${statusInfo.bg}`}>
                                            <statusInfo.icon className="mr-1" />
                                            {statusInfo.label}
                                        </div>

                                        {/* View Details Button */}
                                        <button
                                            onClick={() => navigate(app.viewDetails)}
                                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                                        >
                                            View Job Details
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-16 bg-gray-100 rounded-lg border border-dashed border-gray-300">
                            <FaBriefcase className="mx-auto text-gray-400 text-5xl mb-4" />
                            <h2 className="text-xl font-semibold text-gray-700">No Applications Found</h2>
                            <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Applications;