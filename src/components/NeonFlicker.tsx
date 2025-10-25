import { useMemo } from "react";

export const NeonFlickerText = ({ text }: { text: string }) => {
  const letters = useMemo(() => {
    return text.split("").map((letter, index) => {
      if (letter === " ") {
        return (
          <span
            className="neon-letter"
            key={index}
            style={{ margin: "0 0.25em" }}
          >
            {" "}
          </span>
        );
      }
      const delay = Math.random() * 2;

      return (
        <span
          className="neon-letter"
          key={index}
          style={{ animationDelay: `${delay}s` }}
        >
          {letter}
        </span>
      );
    });
  }, [text]);

  return <span className="neon-text">{letters}</span>;
};
