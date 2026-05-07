const activeLessonKey = "webpack-practice-lab:active-lesson";
const progressKey = "webpack-practice-lab:progress";

export function loadActiveLesson(lessons) {
  const savedId = window.localStorage.getItem(activeLessonKey);
  return lessons.find((lesson) => lesson.id === savedId)?.id ?? lessons[0].id;
}

export function saveActiveLesson(lessonId) {
  window.localStorage.setItem(activeLessonKey, lessonId);
}

export function loadProgress(lessons) {
  const fallback = Object.fromEntries(lessons.map((lesson) => [lesson.id, false]));

  try {
    const savedProgress = JSON.parse(window.localStorage.getItem(progressKey) ?? "{}");
    return { ...fallback, ...savedProgress };
  } catch {
    return fallback;
  }
}

export function saveProgress(progress) {
  window.localStorage.setItem(progressKey, JSON.stringify(progress));
}
