import { useState } from "react";

function Submit() {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(false);
  }

  return (
    <div className="Submit">
      {submitted ? <h1 id="submitted">Form Submitted</h1> : null}
      <form onSubmit={handleSubmit}>
        <input
          required
          id="text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Submit;
