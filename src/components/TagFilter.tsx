import { Button } from "@/components/ui/button";

interface Props {
  tags: string[];
  selected?: string | null;
  onSelect: (tag: string | null) => void;
}

export default function TagFilter({ tags, selected, onSelect }: Props) {
  const isAllSelected = selected == null;

  const baseBtn =
    "py-2 px-3 rounded-none cursor-pointer hover:bg-red-500 " +
    "focus:outline-none focus-visible:border-white focus-visible:ring-white";

  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        type="button"
        onClick={() => onSelect(null)}
        aria-pressed={isAllSelected}
        className={`${baseBtn} ${isAllSelected ? "bg-red-600 text-white " : "bg-red-900 text-muted-foreground"}`}
      >
        All
      </Button>

      {tags.map((tag) => {
        const isSelected = selected === tag;
        return (
          <Button
            key={tag}
            type="button"
            onClick={() => onSelect(tag)}
            aria-pressed={isSelected}
            className={`${baseBtn} ${isSelected ? "bg-red-600 text-white" : "bg-red-900 text-muted-foreground"}`}
          >
            {"#" + tag}
          </Button>
        );
      })}
    </div>
  );
}
