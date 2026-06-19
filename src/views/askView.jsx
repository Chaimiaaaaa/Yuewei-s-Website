// views/askView.jsx

export function AskView({ inputText, questions, submitting, onInputChangeCB, onSubmitACB }) {
  return (
    <main className="main">
      <p className="ask-intro">
        Ask me Something
      </p>

      <div className="ask-form">
        <textarea
          className="ask-textarea"
          placeholder="It's not working ...hahhaa..."
          value={inputText}
          onChange={(e) => onInputChangeCB(e.target.value)}
          rows={4}
        />
        <button
          className="ask-submit"
          onClick={onSubmitACB}
          disabled={submitting || !inputText.trim()}
        >
          {submitting ? "sending…" : "Send"}
        </button>
      </div>

      {questions.length > 0 && (
        <div className="ask-questions">
          {questions.map((q) => (
            <div key={q.id} className="ask-question">
              <p>{q.text}</p>
              <p className="ask-question-meta">{new Date(q.timestamp).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
