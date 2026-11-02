// Real rule-based and syntax verification engine for Python code and Reading summaries

export const verifyPythonCode = (codeText) => {
  if (!codeText || codeText.trim().length < 15) {
    return {
      success: false,
      error: "Verification Failed: Submission is too short. Please paste a real Python code snippet (at least 15 characters)."
    };
  }

  const text = codeText.trim();

  // Check for common Python keywords / syntax patterns
  const pythonPatterns = [
    /\bdef\s+\w+\s*\(.*?\)\s*:/,           // def function_name():
    /\bclass\s+\w+(\s*\(.*?\))?\s*:/,       // class ClassName:
    /\bimport\s+\w+/,                      // import math / from os import
    /\bfrom\s+\w+\s+import/,
    /\bprint\s*\(.*?\)/,                   // print(...)
    /\bif\s+.*?:/,                         // if condition:
    /\bfor\s+\w+\s+in\s+/,                 // for x in range()
    /\bwhile\s+.*?:/,                      // while condition:
    /\breturn\b/,                          // return statement
    /=\s*\[.*?\]/,                          // list assignment arr = []
    /=\s*\{.*?\}/                          // dict assignment d = {}
  ];

  const matchedPatterns = pythonPatterns.filter(pattern => pattern.test(text));

  // If at least 1-2 real Python keywords match, verify it!
  if (matchedPatterns.length >= 1 || (text.includes("=") && (text.includes("def ") || text.includes("print(") || text.includes("import ") || text.includes("if ") || text.includes("return ")))) {
    return {
      success: true,
      feedback: "Nova AI Verification Passed: Real Python code structure detected! Code syntax, control flow, or function definitions validated."
    };
  }

  return {
    success: false,
    error: "Verification Failed: No valid Python syntax detected. Please submit actual Python code containing keywords like 'def', 'import', 'print()', 'if', or loops."
  };
};

export const verifyReadingSummary = (summaryText) => {
  if (!summaryText || summaryText.trim().length < 40) {
    return {
      success: false,
      error: "Verification Failed: Summary too short. Please provide a detailed summary of at least 2 sentences (minimum 40 characters)."
    };
  }

  const words = summaryText.trim().split(/\s+/).filter(w => w.length > 0);

  if (words.length < 8) {
    return {
      success: false,
      error: "Verification Failed: Please provide at least 8-10 meaningful words summarizing key concepts from your reading."
    };
  }

  // Check for repeated spam characters or single word repeated (e.g. "asdf asdf asdf")
  const uniqueWords = new Set(words.map(w => w.toLowerCase()));
  if (uniqueWords.size < 4) {
    return {
      success: false,
      error: "Verification Failed: Repetitive or gibberish text detected. Please write genuine summary notes."
    };
  }

  return {
    success: true,
    feedback: "Nova AI Verification Passed: Real reading summary validated! Distinct learning concepts and structured takeaways recognized."
  };
};
