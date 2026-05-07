import "highlight.js/styles/github-dark.css";
import { lessons } from "./data/lessons.js";
import { renderSidebar } from "./render/sidebar.js";
import { renderWorkspace } from "./render/workspace.js";
import "./styles.css";
import {
  loadActiveLesson,
  loadProgress,
  saveActiveLesson,
  saveProgress
} from "./utils/storage.js";

const state = {
  activeLessonId: loadActiveLesson(lessons),
  activeTab: "explain",
  isLessonPickerOpen: false,
  progress: loadProgress(lessons)
};

const root = document.querySelector("#root");

function getActiveLesson() {
  return lessons.find((lesson) => lesson.id === state.activeLessonId) ?? lessons[0];
}

function keepActiveLessonVisible() {
  const lessonNav = document.querySelector(".lesson-nav");
  const activeLessonButton = lessonNav?.querySelector("[data-active-lesson='true']");

  if (!lessonNav || !activeLessonButton || lessonNav.clientHeight === 0) {
    return;
  }

  const navRect = lessonNav.getBoundingClientRect();
  const buttonRect = activeLessonButton.getBoundingClientRect();
  const edgePadding = 8;

  if (buttonRect.top < navRect.top + edgePadding) {
    lessonNav.scrollTop -= navRect.top + edgePadding - buttonRect.top;
    return;
  }

  if (buttonRect.bottom > navRect.bottom - edgePadding) {
    lessonNav.scrollTop += buttonRect.bottom - navRect.bottom + edgePadding;
  }
}

function render() {
  const previousLessonNavScrollTop = document.querySelector(".lesson-nav")?.scrollTop;
  const activeLesson = getActiveLesson();

  root.innerHTML = `
    <main class="app-shell">
      ${renderSidebar({
        lessons,
        activeLesson,
        progress: state.progress,
        isLessonPickerOpen: state.isLessonPickerOpen
      })}
      ${renderWorkspace({
        lesson: activeLesson,
        activeTab: state.activeTab,
        progress: state.progress
      })}
    </main>
  `;

  const lessonNav = document.querySelector(".lesson-nav");

  if (lessonNav && typeof previousLessonNavScrollTop === "number") {
    lessonNav.scrollTop = previousLessonNavScrollTop;
  }

  keepActiveLessonVisible();
}

function setActiveLesson(lessonId) {
  state.activeLessonId = lessonId;
  state.activeTab = "explain";
  state.isLessonPickerOpen = false;
  saveActiveLesson(lessonId);
  render();
  window.scrollTo({ top: 0 });
}

function setActiveTab(tabId) {
  state.activeTab = tabId;
  state.isLessonPickerOpen = false;
  render();
}

function markDone() {
  const lesson = getActiveLesson();

  if (state.progress[lesson.id]) {
    return;
  }

  state.progress = {
    ...state.progress,
    [lesson.id]: true
  };
  state.isLessonPickerOpen = false;
  saveProgress(state.progress);
  render();
}

root.addEventListener("click", (event) => {
  const lessonButton = event.target.closest("[data-lesson-id]");
  const tabButton = event.target.closest("[data-tab-id]");
  const actionButton = event.target.closest("[data-action]");

  if (actionButton?.dataset.action === "toggle-lesson-picker") {
    state.isLessonPickerOpen = !state.isLessonPickerOpen;
    render();
    return;
  }

  if (lessonButton) {
    setActiveLesson(lessonButton.dataset.lessonId);
    return;
  }

  if (tabButton) {
    setActiveTab(tabButton.dataset.tabId);
    return;
  }

  if (actionButton?.dataset.action === "mark-done") {
    markDone();
    return;
  }

  if (state.isLessonPickerOpen && !event.target.closest(".lesson-picker")) {
    state.isLessonPickerOpen = false;
    render();
  }
});

render();
