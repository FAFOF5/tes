
import { State } from './config/state';
import { ApiVaultEngine } from './modules/vault';
import { PSYCHOMETRIC_BATTERIES, getMasterImperialBattery } from './modules/psychometrics';
import { BlueprintGenerator } from './modules/blueprint';
import { AiEngine } from './modules/ai';
import { FlowTimerEngine, BrownNoiseSynthesizer, ContinuousSpeechService } from './modules/workspace';
import { Chart, RadialLinearScale, RadarController, PointElement, LineElement, Filler } from 'chart.js';
import confetti from 'canvas-confetti';

Chart.register(RadialLinearScale, RadarController, PointElement, LineElement, Filler);

const flowTimer = new FlowTimerEngine();
const brownNoise = new BrownNoiseSynthesizer();
const speechService = new ContinuousSpeechService();

let currentBatteryQuestions: any[] = [];
let currentQuestionIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  State.load();
  updateVaultUI();
  renderTestGrid('all');
  renderMasterBlueprint();

  // Tab navigation
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = (e.currentTarget as HTMLElement).dataset.tab;
      if (target) switchTab(target);
    });
  });

  // Flow timer controls
  document.getElementById('timerStartBtn')?.addEventListener('click', () => {
    const running = flowTimer.toggle(
      (m, s, pct) => {
        const display = document.getElementById('timerDisplay');
        if (display) display.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        const circle = document.getElementById('timerProgressCircle') as any;
        if (circle) circle.style.strokeDashoffset = 578 - (pct / 100) * 578;
      },
      () => {
        confetti({ particleCount: 80 });
        showToast('أحسنت! اكتملت ركعة التركيز الفائق');
      }
    );
    const startBtn = document.getElementById('timerStartBtn');
    if (startBtn) startBtn.innerHTML = running ? `<i class="fa-solid fa-pause ml-1"></i> إيقاف` : `<i class="fa-solid fa-play ml-1"></i> بدء الجلسة`;
  });

  // Brown noise toggle
  document.getElementById('brownNoiseBtn')?.addEventListener('click', () => {
    const active = brownNoise.toggle();
    const txt = document.getElementById('brownNoiseText');
    if (txt) txt.textContent = active ? 'إيقاف ضوضاء التركيز (Brown Noise)' : 'تشغيل ضوضاء التركيز (Brown Noise)';
  });

  // Voice dictation toggle
  document.getElementById('dictationBtn')?.addEventListener('click', () => {
    const active = speechService.toggle((text) => {
      const textarea = document.getElementById('workspaceNotesTextarea') as HTMLTextAreaElement;
      if (textarea) textarea.value += '\n' + text;
    });
    const txt = document.getElementById('micStatusText');
    if (txt) txt.textContent = active ? 'جاري الاستماع المستمر...' : 'تحدث بالمايك (إملاء مستمر)';
  });

  // AI Form Submit
  document.getElementById('aiChatForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('aiChatInput') as HTMLInputElement;
    const text = input.value.trim();
    if (!text) return;

    appendChat('user', text);
    input.value = '';

    const reply = await AiEngine.sendMessage(text);
    appendChat('ai', reply);
  });
});

function switchTab(tabId: string) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.getElementById(`tab-${tabId}`)?.classList.remove('hidden');
  if (tabId === 'blueprint') renderRadars();
}

function updateVaultUI() {
  const badge = document.getElementById('navKeyStatusBadge');
  if (badge) badge.textContent = ApiVaultEngine.getActiveTypeLabel();
}

function renderTestGrid(category: string) {
  const grid = document.getElementById('testsCardGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const list = category === 'all' ? PSYCHOMETRIC_BATTERIES : PSYCHOMETRIC_BATTERIES.filter(b => b.category === category);
  list.forEach(battery => {
    const card = document.createElement('div');
    card.className = "glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4";
    card.innerHTML = `
      <div class="space-y-3">
        <h3 class="text-sm font-bold text-white">${battery.title}</h3>
        <p class="text-xs text-slate-400">${battery.desc}</p>
      </div>
      <button onclick="window.startBattery('${battery.id}')" class="w-full py-2.5 bg-slate-900 hover:bg-brand-600 hover:text-slate-950 text-brand-400 font-bold rounded-xl text-xs border border-brand-500/30 transition-all flex items-center justify-center gap-2">
        <i class="fa-solid fa-play"></i> بدء الفحص التخصصي
      </button>
    `;
    grid.appendChild(card);
  });
}

function renderMasterBlueprint() {
  const b = BlueprintGenerator.generateExhaustiveReport();
  const oceanBox = document.getElementById('blueprintOceanText');
  if (oceanBox) oceanBox.innerHTML = b.oceanAnalysis;
  const iqBox = document.getElementById('blueprintIqText');
  if (iqBox) iqBox.innerHTML = b.iqAnalysis;
  const hbdiBox = document.getElementById('blueprintHbdiText');
  if (hbdiBox) hbdiBox.innerHTML = b.hbdiAnalysis;
  const strengthsBox = document.getElementById('blueprintStrengthsText');
  if (strengthsBox) strengthsBox.innerHTML = b.strengthsAnalysis;
  const fixesBox = document.getElementById('blueprintFixesText');
  if (fixesBox) fixesBox.innerHTML = b.frictionFixes;
  const studyBox = document.getElementById('blueprintStudyStrategyText');
  if (studyBox) studyBox.innerHTML = b.studyStrategy;
}

function renderRadars() {
  const p = State.data.profile;
  const ctxL = (document.getElementById('radarLearningChart') as HTMLCanvasElement)?.getContext('2d');
  if (ctxL) {
    new Chart(ctxL, {
      type: 'radar',
      data: {
        labels: ['تحليلي (A)', 'تنظيمي (B)', 'مشاعري (C)', 'إبداعي (D)', 'بصري', 'حركي'],
        datasets: [{
          data: [p.hbdi.analyticalA, p.hbdi.sequentialB, p.hbdi.interpersonalC, p.hbdi.creativeD, p.vark.visual, p.vark.kinesthetic],
          backgroundColor: 'rgba(6, 182, 212, 0.25)',
          borderColor: '#06b6d4'
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
}

function appendChat(sender: 'user' | 'ai', msg: string) {
  const win = document.getElementById('aiChatWindow');
  if (!win) return;
  const div = document.createElement('div');
  div.className = `flex gap-3 ${sender === 'user' ? 'justify-end' : ''}`;
  div.innerHTML = sender === 'user' ? 
    `<div class="chat-bubble-user p-3 text-xs max-w-[85%]">${msg}</div>` : 
    `<div class="chat-bubble-ai p-3 text-xs max-w-[85%]">${msg}</div>`;
  win.appendChild(div);
  win.scrollTop = win.scrollHeight;
}

function showToast(msg: string) {
  const toast = document.getElementById('toastNotification');
  const txt = document.getElementById('toastMessage');
  if (toast && txt) {
    txt.textContent = msg;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);
  }
}

(window as any).startBattery = (id: string) => {
  const battery = id === 'master' ? getMasterImperialBattery() : PSYCHOMETRIC_BATTERIES.find(b => b.id === id);
  if (!battery) return;
  currentBatteryQuestions = battery.questions;
  currentQuestionIndex = 0;
  document.getElementById('testExecutionModal')?.classList.remove('hidden');
};
