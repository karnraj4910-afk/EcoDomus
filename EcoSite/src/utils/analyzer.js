import * as turf from '@turf/turf';
import { wetlands, waterways } from '../data/environmentalData';

export const analyzeSite = (siteCenter, projectType) => {
  const point = turf.point([siteCenter.lng, siteCenter.lat]);
  const nearestWaterway = turf.nearestPointOnLine(waterways.features[0], point);
  const waterwayDistanceMeters = turf.distance(point, nearestWaterway, { units: 'meters' });
  const isInsideWetland = turf.booleanPointInPolygon(point, wetlands.features[0]);

  let overallRisk = 'LOW';
  if (isInsideWetland || waterwayDistanceMeters < 100) {
    overallRisk = 'HIGH';
  } else if (waterwayDistanceMeters < 300) {
    overallRisk = 'MEDIUM';
  }

  return {
    overallRisk,
    waterwayDistanceMeters,
    isInsideWetland
  };
};