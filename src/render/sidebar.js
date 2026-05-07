function formatLessonNumber(index) {
  return String(index + 1).padStart(2, "0");
}

export function renderSidebar({ lessons, activeLesson, progress, isLessonPickerOpen }) {
  const completedCount = Object.values(progress).filter(Boolean).length;
  const percent = Math.round((completedCount / lessons.length) * 100);
  const activeIndex = lessons.findIndex((lesson) => lesson.id === activeLesson.id);

  return `
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="brand">
          <img src="icons/icon-192.png" alt="webpack logo" />
          <div>
            <strong>Webpack</strong>
            <p>Practice Lab</p>
          </div>
        </div>

        <section class="progress-panel" aria-label="学习进度">
          <div class="progress-copy">
            <span>${completedCount}/${lessons.length} 已完成</span>
            <strong>${percent}%</strong>
          </div>
          <div class="progress-track">
            <span style="width: ${percent}%"></span>
          </div>
        </section>

        <div class="lesson-picker">
          <button
            class="lesson-picker-trigger"
            data-action="toggle-lesson-picker"
            aria-expanded="${isLessonPickerOpen}"
            aria-controls="lesson-picker-list"
          >
            <span>${formatLessonNumber(activeIndex)} · ${activeLesson.title}</span>
            <span aria-hidden="true"></span>
          </button>
          <div
            class="lesson-picker-menu ${isLessonPickerOpen ? "is-open" : ""}"
            id="lesson-picker-list"
            role="listbox"
            aria-label="选择课程"
          >
            ${lessons
              .map((lesson, index) => {
                const isActive = lesson.id === activeLesson.id;
                const isDone = progress[lesson.id];

                return `
                  <button
                    class="lesson-picker-option ${isActive ? "is-active" : ""}"
                    data-lesson-id="${lesson.id}"
                    role="option"
                    aria-selected="${isActive}"
                  >
                    <span class="picker-check" aria-hidden="true">${isActive ? "✓" : ""}</span>
                    <span>${formatLessonNumber(index)} · ${lesson.title}</span>
                    ${isDone ? `<small>已完成</small>` : ""}
                  </button>
                `;
              })
              .join("")}
          </div>
        </div>
      </div>

      <nav class="lesson-nav" aria-label="课程列表">
        ${lessons
          .map((lesson, index) => {
            const isActive = lesson.id === activeLesson.id;
            const isDone = progress[lesson.id];

            return `
              <button class="lesson-link ${isActive ? "is-active" : ""}" data-lesson-id="${lesson.id}" ${isActive ? 'data-active-lesson="true"' : ""}>
                <span class="lesson-number">${formatLessonNumber(index)}</span>
                <span class="lesson-details">
                  <small>${lesson.level}</small>
                  <span class="lesson-title">${lesson.title}</span>
                </span>
                ${
                  isDone
                    ? `<span class="lesson-state" aria-label="已完成"><span aria-hidden="true">✓</span></span>`
                    : ""
                }
              </button>
            `;
          })
          .join("")}
      </nav>
    </aside>
  `;
}
