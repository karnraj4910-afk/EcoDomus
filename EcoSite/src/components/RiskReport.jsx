import React from 'react';

export const RiskReport = ({ projectType, setProjectType, analysisResult }) => {
  const getRiskColor = (risk) => {
    switch (risk) {
      case 'HIGH':
        return 'bg-red-500';
      case 'MEDIUM':
        return 'bg-yellow-500';
      case 'LOW':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Environmental Risk Assessment</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
        >
          <option value="Building">Building</option>
          <option value="Parking Lot">Parking Lot</option>
          <option value="Road">Road</option>
          <option value="Sports Field">Sports Field</option>
        </select>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Risk Assessment</h3>
        <div className="flex items-center">
          <span className="mr-2">Overall Risk:</span>
          <span className={`px-2 py-1 rounded text-white ${getRiskColor(analysisResult.overallRisk)}`}>
            {analysisResult.overallRisk}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <p>Distance to nearest waterway: {analysisResult.waterwayDistanceMeters.toFixed(2)} meters</p>
      </div>

      {analysisResult.isInsideWetland && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Warning: Project site is inside a wetland area!
        </div>
      )}
    </div>
  );
};