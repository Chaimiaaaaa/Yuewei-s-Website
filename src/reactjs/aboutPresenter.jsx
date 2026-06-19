// reactjs/aboutPresenter.jsx
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { AboutView } from "../views/aboutView.jsx";
import { AskView } from "../views/askView.jsx";

export const About = observer(function About({ model }) {
  const [searchParams] = useSearchParams();
  const [inputText, setInputText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const tab = searchParams.get("tab") || model.currentSubTab || "profile";

  async function onSubmitACB() {
    if (!inputText.trim()) return;
    setSubmitting(true);
    const question = {
      id: Date.now().toString(),
      text: inputText.trim(),
      timestamp: Date.now(),
    };
    model.addQuestion(question);
    setInputText("");
    setSubmitting(false);
  }

  function onInputChangeCB(value) {
    setInputText(value);
  }

  if (tab === "ask") {
    return (
      <AskView
        inputText={inputText}
        questions={model.questions}
        submitting={submitting}
        onInputChangeCB={onInputChangeCB}
        onSubmitACB={onSubmitACB}
      />
    );
  }

  return <AboutView />;
});
