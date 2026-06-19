// ─────────────────────────────────────────
//  portfolioModel.js  –  application state
// ─────────────────────────────────────────

export const model = {
  currentPage: "home",      // "home" | "work" | "art" | "now" | "about"
  currentSubTab: null,      // sidebar selection (project id / art category / year / about section)

  // Ask-me box
  questions: [],
  questionPromiseState: {},

  setCurrentPage(page) {
    this.currentPage = page;
    this.currentSubTab = null;
  },

  setCurrentSubTab(subTab) {
    this.currentSubTab = subTab;
  },

  // question: { id, text, timestamp }
  addQuestion(question) {
    this.questions = [...this.questions, question];
  },

  setQuestions(questions) {
    this.questions = questions;
  },
};
