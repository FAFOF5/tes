import { Chart, RadialLinearScale, RadarController, PointElement, LineElement, Filler } from 'chart.js';
import { VarkScores } from '../types';

Chart.register(RadialLinearScale, RadarController, PointElement, LineElement, Filler);

export function renderRadarChart(canvasId: string, vark: VarkScores): Chart | null {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
  if (!canvas) return null;

  return new Chart(canvas, {
    type: 'radar',
    data: {
      labels: ['بصري', 'سمعي', 'تدويني', 'تطبيقي'],
      datasets: [
        {
          label: 'بنيتك الإدراكية',
          data: [vark.visual, vark.auditory, vark.reading, vark.kinesthetic],
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          borderColor: '#10b981',
          borderWidth: 2,
        },
      ],
    },
  });
}
