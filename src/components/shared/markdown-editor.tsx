import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  linkPlugin,
  linkDialogPlugin,
  markdownShortcutPlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  ListsToggle,
  CreateLink,
} from "@mdxeditor/editor"
import "@mdxeditor/editor/style.css"
import "./markdown-editor.css"

import { cn } from "@/lib/utils"

type MarkdownEditorProps = {
  /** Markdown initial. Le composant n'est PAS controlled — il garde son état
   *  interne via Lexical et notifie via `onChange`. Pour reset le contenu,
   *  passer une `key` différente depuis le parent. */
  markdown: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function MarkdownEditor({
  markdown,
  onChange,
  placeholder,
  className,
}: MarkdownEditorProps) {
  return (
    <div
      // `dark-theme` active la palette dark interne de MDX Editor (texte
      // clair sur fond sombre). L'admin tourne en permanence en dark (cf
      // index.css : pas de toggle), donc on l'épingle ici.
      className={cn(
        "dark-theme",
        // Reset de la typo Tailwind : MDX Editor a ses propres styles internes
        // pour les headings/listes ; on encadre juste avec la bordure shadcn.
        "rounded-md border bg-background",
        // Cible le contenu de l'éditeur pour aligner avec les autres champs
        // (font-sans, padding cohérent).
        "[&_.mdxeditor]:rounded-md [&_.mdxeditor-toolbar]:rounded-t-md [&_.mdxeditor-toolbar]:border-b",
        "[&_.mdxeditor-root-contenteditable]:min-h-[260px] [&_.mdxeditor-root-contenteditable]:px-4 [&_.mdxeditor-root-contenteditable]:py-3",
        className
      )}
    >
      <MDXEditor
        markdown={markdown}
        onChange={onChange}
        placeholder={placeholder}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          thematicBreakPlugin(),
          // Raccourcis classiques : `# `, `## `, `**bold**`, `- `, `1. ` etc.
          // Tapés au clavier, ils convertissent automatiquement.
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                {/* Underline volontairement exclu : non standard markdown,
                    pas rendu par react-native-markdown-view côté mobile. */}
                <BoldItalicUnderlineToggles options={["Bold", "Italic"]} />
                <BlockTypeSelect />
                <ListsToggle />
                <CreateLink />
              </>
            ),
          }),
        ]}
      />
    </div>
  )
}
