import { highlightCode } from "../utils/code-highlight.js";

const tabs = [
  { id: "explain", label: "讲解" },
  { id: "review", label: "复盘" }
];

function renderHeader(lesson) {
  return `
    <header class="lesson-header">
      <div>
        <p class="eyebrow">${lesson.level}</p>
        <h1>${lesson.title}</h1>
        <p>${lesson.summary}</p>
      </div>
    </header>
  `;
}

function renderTabs(activeTab) {
  return `
    <div class="tabs" role="tablist" aria-label="课程内容">
      ${tabs
        .map(
          (tab) => `
            <button
              class="${activeTab === tab.id ? "is-active" : ""}"
              data-tab-id="${tab.id}"
              role="tab"
              aria-selected="${activeTab === tab.id}"
            >
              ${tab.label}
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderKeyPoints(lesson) {
  return `
    <aside class="lesson-summary" aria-label="本节要点">
      <h2>要点</h2>
      <ul>
        ${lesson.keyPoints.map((point) => `<li>${point}</li>`).join("")}
      </ul>
    </aside>
  `;
}

function renderCodeExamples(lesson) {
  return `
    <section class="code-examples" aria-label="代码示例">
      <h2>代码示例</h2>
      ${lesson.examples
        .map(
          (example) => `
            <figure class="code-card">
              <figcaption>
                <span>${example.title}</span>
                <small>${example.language}</small>
              </figcaption>
              <pre><code class="hljs language-${example.language}">${highlightCode(
                example.code,
                example.language
              )}</code></pre>
            </figure>
          `
        )
        .join("")}
    </section>
  `;
}

function renderExplain(lesson) {
  return `
    <article class="lesson-explain">
      <h2>核心讲解</h2>
      <div class="lesson-copy">
        ${lesson.details.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      </div>
    </article>
    ${renderKeyPoints(lesson)}
    ${renderCodeExamples(lesson)}
  `;
}

function renderReview(lesson, progress) {
  const isDone = Boolean(progress[lesson.id]);

  return `
    <section class="review-panel">
      <div>
        <h2>复盘</h2>
      </div>
      <ol class="review-list">
        ${lesson.review
          .map((item, index) => {
            const question = typeof item === "string" ? item : item.question;
            const answer =
              typeof item === "string" ? lesson.reviewAnswers?.[index] : item.answer;

            return `
              <li>
                <p>${question}</p>
                ${
                  answer
                    ? `
                      <details>
                        <summary>参考答案</summary>
                        <p>${answer}</p>
                      </details>
                    `
                    : ""
                }
              </li>
            `;
          })
          .join("")}
      </ol>
      <button
        class="done-button ${isDone ? "is-done" : ""}"
        data-action="mark-done"
        ${isDone ? "disabled" : ""}
      >
        <span aria-hidden="true">${isDone ? "✓" : "+"}</span>
        ${isDone ? "已完成" : "标记完成"}
      </button>
    </section>
  `;
}

function renderTabContent({ lesson, activeTab, progress }) {
  if (activeTab === "review") {
    return renderReview(lesson, progress);
  }

  return renderExplain(lesson);
}

export function renderWorkspace({ lesson, activeTab, progress }) {
  return `
    <section class="workspace">
      ${renderHeader(lesson)}
      ${renderTabs(activeTab)}
      <article class="lesson-content">
        ${renderTabContent({ lesson, activeTab, progress })}
      </article>
    </section>
  `;
}
