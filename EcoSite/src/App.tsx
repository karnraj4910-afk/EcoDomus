import { useEffect, useState } from 'react';
import { MapViewer } from './components/MapViewer';
import { RiskReport } from './components/RiskReport';
import { analyzeSite } from './utils/analyzer';

function App() {
  const [siteCenter, setSiteCenter] = useState({ lat: 40.748, lng: -73.985 });
  const [projectType, setProjectType] = useState('Building');
  const [analysisResult, setAnalysisResult] = useState({
    overallRisk: 'LOW',
    waterwayDistanceMeters: 0,
    isInsideWetland: false,
  });

  useEffect(() => {
    const result = analyzeSite(siteCenter, projectType);
    setAnalysisResult(result);
  }, [siteCenter, projectType]);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      <div className="w-[70%] h-full">
        <MapViewer siteCenter={siteCenter} onSiteChange={setSiteCenter} />
      </div>

      <aside className="w-[30%] h-full overflow-y-auto border-l border-slate-700 bg-slate-900 p-4">
        <RiskReport
          projectType={projectType}
          setProjectType={setProjectType}
          analysisResult={analysisResult}
        />
      </aside>
    </div>
  );
}

export default App;
