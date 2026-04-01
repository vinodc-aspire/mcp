export interface ParsedQuestion {
  text: string;
  options: Record<string, string>;
  correct_answer: string | null;
  explanation: string | null;
  number: string;
}

/**
 * Extract `numArgs` brace-delimited arguments after a LaTeX macro.
 * Skips whitespace and `%` comment lines between arguments, handles `\X` escapes,
 * stops at `\end{document}` for the last arg. Returns null on failure.
 */
function extractLatexMacroArguments(
  content: string,
  macroName: string,
  numArgs: number,
): string[] | null {
  const escapedMacro = macroName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`\\\\${escapedMacro}(?:\\s|%[^\\n]*\\n)*`);

  const match = pattern.exec(content);
  if (!match || match.index === undefined) {
    return null;
  }

  const startPos = match.index + match[0].length;
  const args: string[] = [];
  let pos = startPos;
  const len = content.length;

  for (let i = 0; i < numArgs; i++) {
    // Skip whitespace and % comments
    while (pos < len) {
      const wsMatch = content.substring(pos).match(/^\s+/);
      if (wsMatch) {
        pos += wsMatch[0].length;
      } else if (content[pos] === '%') {
        const newlinePos = content.indexOf('\n', pos);
        if (newlinePos === -1) {
          pos = len;
          break;
        }
        pos = newlinePos + 1;
      } else {
        break;
      }
    }

    if (pos >= len || content[pos] !== '{') {
      return null;
    }

    pos++; // move past opening brace
    let braceDepth = 1;
    let argContent = '';
    const isLastArg = i === numArgs - 1;

    while (pos < len && braceDepth > 0) {
      const char = content[pos];

      // Last arg at top-level brace depth: check for \end{document}
      if (isLastArg && braceDepth === 1 && pos + 13 <= len) {
        const remaining = content.substring(pos);
        if (/^\\end\{document\}/.test(remaining)) {
          braceDepth = 0;
          break;
        }
      }

      if (char === '\\') {
        argContent += char;
        pos++;
        if (pos < len) {
          argContent += content[pos];
          pos++;
        }
      } else if (char === '{') {
        braceDepth++;
        argContent += char;
        pos++;
      } else if (char === '}') {
        braceDepth--;
        if (braceDepth > 0) {
          argContent += char;
        }
        pos++;
      } else {
        argContent += char;
        pos++;
      }
    }

    if (braceDepth > 0 && !isLastArg) {
      return null;
    }

    args.push(argContent.trim());
  }

  return args;
}

/**
 * Parse the 4 extracted arguments into a structured question.
 */
function parseQuestionBlock(args: string[]): ParsedQuestion | null {
  if (args.length !== 4) {
    return null;
  }

  const result: ParsedQuestion = {
    text: '',
    options: {},
    correct_answer: null,
    explanation: null,
    number: '',
  };

  const questionText = args[0].trim();
  if (questionText) {
    result.text = questionText;
  }

  const items = args[1].match(/\\item\s+([\s\S]*?)(?=\\item|$)/g);
  const optionKeys = ['A', 'B', 'C', 'D', 'E'];
  let optionIndex = 0;

  if (items) {
    for (const item of items) {
      if (optionIndex >= optionKeys.length) break;
      const optionText = item.replace(/^\\item\s+/, '').replace(/\s+$/, '');
      if (optionText.length > 0) {
        result.options[optionKeys[optionIndex]] = optionText;
        optionIndex++;
      }
    }
  }

  const explanation = args[2].trim();
  if (explanation) {
    result.explanation = explanation;
  }

  const answerMatch = args[3].trim().match(/^([A-E])\)/);
  if (answerMatch) {
    result.correct_answer = answerMatch[1].toUpperCase();
  }

  // Return null if text or options empty
  if (!result.text || Object.keys(result.options).length === 0) {
    return null;
  }

  return result;
}

/**
 * Parse a LaTeX quiz file into structured question data.
 * Finds all \question positions, extracts 4 brace-delimited arguments from each.
 */
export function parseLatex(content: string): ParsedQuestion[] {
  const questions: ParsedQuestion[] = [];

  const questionRegex = /\\question\s*(?=%|$|\n|\{)/gm;
  const matches: { index: number }[] = [];

  let m: RegExpExecArray | null;
  while ((m = questionRegex.exec(content)) !== null) {
    matches.push({ index: m.index });
  }

  const foundCount = matches.length;
  let questionNumber = 1;

  for (const match of matches) {
    const questionContent = content.substring(match.index);

    const args = extractLatexMacroArguments(questionContent, 'question', 4);

    if (args && args.length === 4) {
      const parsed = parseQuestionBlock(args);
      if (parsed) {
        parsed.number = String(questionNumber);
        questions.push(parsed);
        questionNumber++;
      }
    }
  }

  if (foundCount > 0 && questions.length < foundCount) {
    console.warn(
      `LaTeX parsing: Found ${foundCount} \\question commands but only parsed ${questions.length} questions`,
    );
  }

  return questions;
}
