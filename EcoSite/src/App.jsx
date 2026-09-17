import React, { useState, useEffect } from 'react';
import { MapViewer } from './components/MapViewer';
import { RiskReport } from './components/RiskReport';
import { analyzeSite } from './utils/analyzer';

export default function App() {
  const [siteCenter, setSiteCenter] = useState({ lat: 40.748, lng: -73.985 });
  const [projectType, setProjectType] = useState('Building');
  const [analysisResult, setAnalysisResult] = useState({
    overallRisk: 'LOW',
    waterwayDistanceMeters: 0,
    isInsideWetland: false
  });

  useEffect(() => {
    const result = analyzeSite(siteCenter, projectType);
    setAnalysisResult(result);
  }, [siteCenter, projectType]);

  return (
    <div className="flex h-screen">
      <div className="w-7/12">
        <MapViewer siteCenter={siteCenter} onSiteChange={setSiteCenter} />
      </div>
      <div className="w-5/12 p-4 overflow-y-auto">
        <RiskReport 
          projectType={projectType} 
          setProjectType={setProjectType} 
          analysisResult={analysisResult} 
        />
      </div>
    </div>
  );
}