import { Editor } from "@tinymce/tinymce-react";

export default function TinyMCE({ setContent, content }) {
  return (
    <Editor
      apiKey="shr4ebbg4q013zmsd1tvhpy2okxwa8frfpg8gi6llkx3m5x5"
      value={content}
      onEditorChange={(newValue) => setContent(newValue)}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
}
