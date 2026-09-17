'use strict';

import { State } from '../config/state.js';
import { Toast } from '../ui/toast.js';

export const Courses = {
    calculate(e) {
        if (e) e.preventDefault();
        State.course.title = document.getElementById('courseName')?.value || 'دورة جديدة';
        State.course.totalHours = parseFloat(document.getElementById('courseHours')?.value) || 66;
        State.course.dailyHours = parseFloat(document.getElementById('dailyCommitment')?.value) || 2;
        State.save();
        this.updateDisplay();
        Toast.show('تم إعادة حساب الخطة بنجاح');
    },
    updateDisplay() {
        const c = State.course;
        const disp = document.getElementById('displayCourseTitle');
        if (disp) disp.textContent = c.title;
        const completed = document.getElementById('completedHoursText');
        if (completed) completed.textContent = c.completedHours;
        const total = document.getElementById('totalCourseHoursText');
        if (total) total.textContent = c.totalHours;
        const pct = c.totalHours > 0 ? ((c.completedHours / c.totalHours) * 100).toFixed(1) : 0;
        const bar = document.getElementById('displayProgressBar');
        if (bar) bar.style.width = `${pct}%`;
        const pctText = document.getElementById('completionPercentageText');
        if (pctText) pctText.textContent = `${pct}%`;
    },
    addProgress(hrs) {
        State.course.completedHours = Math.min(State.course.totalHours, State.course.completedHours + hrs);
        State.save();
        this.updateDisplay();
        Toast.show(`تمت إضافة ${hrs} ساعة للإنجاز`);
    },
    reset() {
        State.course.completedHours = 0;
        State.save();
        this.updateDisplay();
        Toast.show('تم إعادة ضبط تقدم الدورة');
    },
    setQuick(name, hours) {
        const cn = document.getElementById('courseName');
        const ch = document.getElementById('courseHours');
        if (cn && ch) { cn.value = name; ch.value = hours; }
        if (window.UI) window.UI.switchTab('courses');
        this.calculate();
    }
};
