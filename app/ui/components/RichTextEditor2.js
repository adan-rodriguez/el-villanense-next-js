"use client";

import styles from "@/app/styles/RichEditorText.module.css";
import { useEffect, useRef, useState } from "react";

const commands = [
  {
    cmd: "bold",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bold" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7 5h6a3.5 3.5 0 0 1 0 7h-6z"></path><path d="M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7"></path></svg>',
    tooltip: "Negrita",
  },
  {
    cmd: "underline",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-underline" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7 5v5a5 5 0 0 0 10 0v-5"></path><path d="M5 19h14"></path></svg>',
    tooltip: "Subrayado",
  },
  {
    cmd: "italic",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-italic" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M11 5l6 0"></path><path d="M7 19l6 0"></path><path d="M14 5l-4 14"></path></svg>',
    tooltip: "Cursiva",
  },
  {
    cmd: "strikeThrough",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-strikethrough" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 12l14 0"></path><path d="M16 6.5a4 2 0 0 0 -4 -1.5h-1a3.5 3.5 0 0 0 0 7h2a3.5 3.5 0 0 1 0 7h-1.5a4 2 0 0 1 -4 -1.5"></path></svg>',
    tooltip: "Tachar",
  },
  {
    cmd: "formatBlock",
    values: [
      ["h1", "h1"],
      ["h2", "h2"],
      ["h3", "h3"],
      ["h4", "h4"],
      ["h5", "h5"],
      ["h6", "h6"],
    ],
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heading" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7 12h10"></path><path d="M7 5v14"></path><path d="M17 5v14"></path><path d="M15 19h4"></path><path d="M15 5h4"></path><path d="M5 19h4"></path><path d="M5 5h4"></path></svg>',
    tooltip: "Encabezados",
  },
  {
    cmd: "fontSize",
    values: [
      ["1", "10px"],
      ["2", "13px"],
      ["3", "16px"],
      ["4", "18px"],
      ["5", "24px"],
      ["6", "32px"],
      ["7", "48px"],
    ],
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-text-size" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 7v-2h13v2"></path><path d="M10 5v14"></path><path d="M12 19h-4"></path><path d="M15 13v-1h6v1"></path><path d="M18 12v7"></path><path d="M17 19h2"></path></svg>',
    tooltip: "Tamaño de letra",
  },
  {
    cmd: "createLink",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 15l6 -6"></path><path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464"></path><path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"></path></svg>',
    tooltip: "Insertar link",
  },
  {
    cmd: "unlink",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link-off" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 15l3 -3m2 -2l1 -1"></path><path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464"></path><path d="M3 3l18 18"></path><path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"></path></svg>',
    tooltip: "Quitar link",
  },
  {
    cmd: "insertImage",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-photo" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M15 8h.01"></path><path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z"></path><path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5"></path><path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3"></path></svg>',
    tooltip: "Insertar imagen",
  },
  {
    cmd: "subscript",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-subscript" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 7l8 10m-8 0l8 -10"></path><path d="M21 20h-4l3.5 -4a1.73 1.73 0 0 0 -3.5 -2"></path></svg>',
    tooltip: "Subíndice",
  },
  {
    cmd: "superscript",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-superscript" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 7l8 10m-8 0l8 -10"></path><path d="M21 11h-4l3.5 -4a1.73 1.73 0 0 0 -3.5 -2"></path></svg>',
    tooltip: "Superíndice",
  },
  {
    cmd: "insertHTML",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-code" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7 8l-4 4l4 4"></path><path d="M17 8l4 4l-4 4"></path><path d="M14 4l-4 16"></path></svg>',
    tooltip: "Insertar HTML",
  },
  {
    cmd: "insertUnorderedList",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-list" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 6l11 0"></path><path d="M9 12l11 0"></path><path d="M9 18l11 0"></path><path d="M5 6l0 .01"></path><path d="M5 12l0 .01"></path><path d="M5 18l0 .01"></path></svg>',
    tooltip: "Insertar lista desordenada",
  },
  {
    cmd: "insertOrderedList",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-list-numbers" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M11 6h9"></path><path d="M11 12h9"></path><path d="M12 18h8"></path><path d="M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4"></path><path d="M6 10v-6l-2 2"></path></svg>',
    tooltip: "Insertar lista ordenada",
  },
  {
    cmd: "justifyLeft",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-align-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 6l16 0"></path><path d="M4 12l10 0"></path><path d="M4 18l14 0"></path></svg>',
    tooltip: "Alinear a la izquierda",
  },
  {
    cmd: "justifyCenter",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-align-center" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 6l16 0"></path><path d="M8 12l8 0"></path><path d="M6 18l12 0"></path></svg>',
    tooltip: "Alinear al centro",
  },
  {
    cmd: "justifyRight",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-align-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 6l16 0"></path><path d="M10 12l10 0"></path><path d="M6 18l14 0"></path></svg>',
    tooltip: "Alinear a la derecha",
  },
  {
    cmd: "justifyFull",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-align-justified" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 6l16 0"></path><path d="M4 12l16 0"></path><path d="M4 18l12 0"></path></svg>',
    tooltip: "Justificar",
  },
  // {
  //   cmd: "indent",
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-indent-increase" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M20 6l-11 0"></path><path d="M20 12l-7 0"></path><path d="M20 18l-11 0"></path><path d="M4 8l4 4l-4 4"></path></svg>',
  //   tooltip: "Aumentar sangría",
  // },
  // {
  //   cmd: "outdent",
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-indent-decrease" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M20 6l-7 0"></path><path d="M20 12l-9 0"></path><path d="M20 18l-7 0"></path><path d="M8 8l-4 4l4 4"></path></svg>',
  //   tooltip: "Disminuir sangría",
  // },
  // {
  //   cmd: "undo",
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-back-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 14l-4 -4l4 -4"></path><path d="M5 10h11a4 4 0 1 1 0 8h-1"></path></svg>',
  //   tooltip: "Deshacer",
  // },
  // {
  //   cmd: "redo",
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-forward-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M15 14l4 -4l-4 -4"></path><path d="M19 10h-11a4 4 0 1 0 0 8h1"></path></svg>',
  //   tooltip: "Rehacer",
  // },
  // {
  //   cmd: "insertHorizontalRule",
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-separator" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 12l0 .01"></path><path d="M7 12l10 0"></path><path d="M21 12l0 .01"></path></svg>',
  //   tooltip: "Insertar separador horizontal",
  // },
  // {
  //   cmd: "selectAll",
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-select-all" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M8 8m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z"></path><path d="M12 20v.01"></path><path d="M16 20v.01"></path><path d="M8 20v.01"></path><path d="M4 20v.01"></path><path d="M4 16v.01"></path><path d="M4 12v.01"></path><path d="M4 8v.01"></path><path d="M4 4v.01"></path><path d="M8 4v.01"></path><path d="M12 4v.01"></path><path d="M16 4v.01"></path><path d="M20 4v.01"></path><path d="M20 8v.01"></path><path d="M20 12v.01"></path><path d="M20 16v.01"></path><path d="M20 20v.01"></path></svg>',
  //   tooltip: "Seleccionar todo",
  // },
  {
    cmd: "removeFormat",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clear-formatting" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M17 15l4 4m0 -4l-4 4"></path><path d="M7 6v-1h11v1"></path><path d="M7 19l4 0"></path><path d="M13 5l-4 14"></path></svg>',
    tooltip: "Remover formato",
  },
  // {
  //   cmd: "backColor",
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-highlight" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 19h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path><path d="M12.5 5.5l4 4"></path><path d="M4.5 13.5l4 4"></path><path d="M21 15v4h-8l4 -4z"></path></svg>',
  // },
  // {
  //   cmd: "foreColor",
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-text-color" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 15v-7a3 3 0 0 1 6 0v7"></path><path d="M9 11h6"></path><path d="M5 19h14"></path></svg>',
  // },
  // {
  //   cmd: "contentReadOnly",
  // },
  // {
  //   cmd: "copy",
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-copy" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path><path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path></svg>',
  // },
  // {
  //   cmd: "cut",
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cut" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path><path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path><path d="M9.15 14.85l8.85 -10.85"></path><path d="M6 4l8.85 10.85"></path></svg>',
  // },
  // {
  //   cmd: "decreaseFontSize",
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-text-decrease" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 19v-10.5a3.5 3.5 0 1 1 7 0v10.5"></path><path d="M4 13h7"></path><path d="M21 12h-6"></path></svg>',
  // },
  // {
  //   cmd: "delete",
  // },
  // {
  //   cmd: "enableInlineTableEditing",
  // },
  // {
  //   cmd: "enableObjectResizing",
  // },
  // {
  //   cmd: "fontName",
  //   values: [
  //     ["Arial", "Arial"],
  //     ["Verdana", "Verdana"],
  //     ["Tahoma", "Tahoma"],
  //   ],
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-typography" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 20l3 0"></path><path d="M14 20l7 0"></path><path d="M6.9 15l6.9 0"></path><path d="M10.2 6.3l5.8 13.7"></path><path d="M5 20l6 -16l2 0l7 16"></path></svg>',
  // },
  // {
  //   cmd: "forwardDelete",
  // },
  // {
  //   cmd: "heading",
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heading" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7 12h10"></path><path d="M7 5v14"></path><path d="M17 5v14"></path><path d="M15 19h4"></path><path d="M15 5h4"></path><path d="M5 19h4"></path><path d="M5 5h4"></path></svg>',
  // },
  // {
  //   cmd: "hiliteColor",
  // },
  // {
  //   cmd: "increaseFontSize",
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-text-increase" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 19v-10.5a3.5 3.5 0 1 1 7 0v10.5"></path><path d="M4 13h7"></path><path d="M18 9v6"></path><path d="M21 12h-6"></path></svg>',
  // },
  // {
  //   cmd: "insertBrOnReturn",
  // },
  // {
  //   cmd: "insertParagraph",
  // },
  // {
  //   cmd: "insertText",
  // },
  // {
  //   cmd: "paste",
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clipboard-copy" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h3m9 -9v-5a2 2 0 0 0 -2 -2h-2"></path><path d="M13 17v-1a1 1 0 0 1 1 -1h1m3 0h1a1 1 0 0 1 1 1v1m0 3v1a1 1 0 0 1 -1 1h-1m-3 0h-1a1 1 0 0 1 -1 -1v-1"></path><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path></svg>',
  // },
];

export default function RichEditorText({ content, setContent }) {
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [cursorPosition, setCursorPosition] = useState({});
  const [cursorPositionCollapsed, setCursorPositionCollapsed] = useState({});

  const buttonsContainerRef = useRef();
  const richEditorTextRef = useRef();

  const handleClick = (e) => {
    e.stopPropagation();

    const button = e.target.closest("button[data-command]");
    const cmd = button.dataset.command;

    if (buttonsContainerRef.current.querySelector(`#select-${cmd}`)) {
      buttonsContainerRef.current.querySelector(`#select-${cmd}`).remove();
      return;
    }

    if (buttonsContainerRef.current.querySelector("select")) {
      buttonsContainerRef.current.querySelector("select").remove();
    }

    const {
      anchorNode,
      anchorOffset,
      /* focusNode, focusOffset, */ isCollapsed,
    } = window.getSelection();
    if (!anchorNode) return; // el cursor no estaba en ningun lado

    const positionsNodes = [];
    let node = anchorNode;
    while (node !== richEditorTextRef.current) {
      if (!node.parentElement) return; // el cursor no estaba en el editor de texto
      let i = 0;
      const { childNodes } = node.parentElement;
      for (i; i < childNodes.length; i++) {
        if (childNodes[i] === node) break;
      }
      positionsNodes.unshift(i);
      node = node.parentElement;
    }

    if (isCollapsed) {
      setCursorPositionCollapsed({
        cursorPositionNode: positionsNodes,
        cursorPositionOffset: anchorOffset,
        cmd,
      });
      return;
    }

    const range = window.getSelection().getRangeAt(0);
    const span = document.createElement("span");
    span.style.fontWeight = "bold";

    try {
      range.surroundContents(span);
      return;
    } catch {
      console.log("a");
      const fragment = range.extractContents();
      span.appendChild(fragment);
      anchorNode.parentNode.insertBefore(span, anchorNode.nextSibling);
      // const { textContent } = anchorNode;
      // const min = Math.min(anchorOffset, focusOffset);
      // const max = Math.max(anchorOffset, focusOffset);
      // const textoAntes = textContent.slice(0, min);
      // const textoSeleccionado = textContent.slice(min, max);
      // const textoDespues = textContent.slice(max);
      // focusNode.textContent = textoAntes;
      // span.textContent = textoSeleccionado;
      // focusNode.parentNode.insertBefore(span, focusNode.nextSibling);
      // focusNode.parentNode.insertBefore(
      //   document.createTextNode(textoDespues),
      //   span.nextSibling
      // );

      // const positionsNodes = [];
      // let node = span.childNodes[0];
      // while (node !== richEditorTextRef.current) {
      //   let i = 0;
      //   const { childNodes } = node.parentElement;
      //   for (i; i < childNodes.length; i++) {
      //     if (childNodes[i] === node) break;
      //   }
      //   positionsNodes.unshift(i);
      //   node = node.parentElement;
      // }

      // setCursorPosition({
      //   cursorPositionNode: positionsNodes,
      //   cursorPositionOffset: textoSeleccionado.length,
      // });

      // const { innerHTML } = richEditorTextRef.current;

      // setUndoStack((prevUndoStack) => [
      //   ...prevUndoStack,
      //   {
      //     content: innerHTML,
      //     cursorPositionNode: positionsNodes,
      //     cursorPositionOffset: textoSeleccionado.length,
      //   },
      // ]);

      // setRedoStack([]);

      // setContent(innerHTML);
      // return;
    }
  };

  useEffect(() => {
    let { cursorPositionNode = [], cursorPositionOffset } = cursorPosition;
    if (cursorPosition.length === 0) return;
    let node = richEditorTextRef.current;
    for (let i = 0; i < cursorPositionNode.length; i++) {
      const n = node.childNodes[cursorPositionNode[i]];
      //   if (n) {
      //     node = n;
      //   } else {
      //     break;
      //   }
      node = n;
    }

    window.getSelection().setPosition(node, cursorPositionOffset);
  }, [content]);

  useEffect(() => {
    if (Object.keys(cursorPositionCollapsed).length === 0) return;
    let node = richEditorTextRef.current;
    let { cursorPositionNode = [], cursorPositionOffset } =
      cursorPositionCollapsed;
    for (let i = 0; i < cursorPositionNode.length; i++) {
      const n = node.childNodes[cursorPositionNode[i]];
      //   if (n) {
      //     node = n;
      //   } else {
      //     break;
      //     }
      node = n;
    }
    window.getSelection().setPosition(node, cursorPositionOffset);
  }, [cursorPositionCollapsed.cursorPositionNode]);

  return (
    <div
      className={styles.container}
      onClick={(e) => {
        if (e.target.tagName === "OPTION") return;
        if (buttonsContainerRef.current.querySelector("select")) {
          buttonsContainerRef.current.querySelector("select").remove();
        }
      }}
    >
      <div
        ref={buttonsContainerRef}
        className={styles.buttons_container}
        id="buttons-container"
      >
        {commands.map(({ cmd, tooltip, icon }) => (
          <button
            key={cmd}
            type="button"
            title={tooltip}
            data-command={cmd}
            dangerouslySetInnerHTML={{ __html: icon }}
            onClick={handleClick}
          />
        ))}
      </div>
      <div className={styles.buttons_undo_redo_container}>
        <button
          type="button"
          {...(undoStack.length > 1 && { title: "Deshacer" })}
          disabled={!(undoStack.length > 1)}
          onClick={() => {
            if (undoStack.length > 1) {
              const undoStackCopy = [...undoStack];
              const elem = undoStackCopy.pop();
              setUndoStack(undoStackCopy);
              setRedoStack((prevRedoStack) => [...prevRedoStack, elem]);
              const { content, cursorPositionNode, cursorPositionOffset } =
                undoStack[undoStack.length - 2];
              setContent(content);
              setCursorPosition({
                cursorPositionNode,
                cursorPositionOffset,
              });
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-arrow-back-up"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M9 14l-4 -4l4 -4"></path>
            <path d="M5 10h11a4 4 0 1 1 0 8h-1"></path>
          </svg>
        </button>
        <button
          type="button"
          {...(redoStack.length > 0 && { title: "Rehacer" })}
          disabled={!(redoStack.length > 0)}
          onClick={() => {
            if (redoStack.length > 0) {
              const redoStackCopy = [...redoStack];
              const elem = redoStackCopy.pop();
              setRedoStack(redoStackCopy);
              setUndoStack((prevUndoStack) => [...prevUndoStack, elem]);
              const { content, cursorPositionNode, cursorPositionOffset } =
                redoStack[redoStack.length - 1];
              setContent(content);
              setCursorPosition({
                cursorPositionNode,
                cursorPositionOffset,
              });
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-arrow-forward-up"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M15 14l4 -4l-4 -4"></path>
            <path d="M19 10h-11a4 4 0 1 0 0 8h1"></path>
          </svg>
        </button>
      </div>
      <div
        className={styles.rich_text_editor}
        contentEditable="true"
        ref={richEditorTextRef}
        dangerouslySetInnerHTML={{ __html: content || "<p><br></p>" }}
        onInput={async (e) => {
          const clipboard = await navigator.clipboard.readText();
          const { length: clipboardLength } = clipboard;

          const { focusNode, focusOffset } = window.getSelection();

          let positionsNodes = [];
          let node = focusNode;
          while (node !== richEditorTextRef.current) {
            let i = 0;
            const { childNodes } = node.parentElement;
            for (i; i < childNodes.length; i++) {
              if (childNodes[i] === node) break;
            }
            positionsNodes.unshift(i);
            node = node.parentElement;
          }

          node = focusNode;

          const { data } = e.nativeEvent; // valor ingresado por teclado o null si es un valor pegado

          if (
            JSON.stringify(positionsNodes) ===
              JSON.stringify(cursorPositionCollapsed.cursorPositionNode) &&
            focusOffset ===
              cursorPositionCollapsed.cursorPositionOffset +
                (data ? 1 : clipboardLength)
          ) {
            let { textContent } = focusNode;
            console.log(textContent);
            console.log(focusOffset);
            let textoAntes = textContent.slice(
              0,
              focusOffset - (data ? 1 : clipboardLength)
            );
            let textoDespues = textContent.slice(focusOffset);
            focusNode.textContent = textoAntes;
            let span = document.createElement("span");
            span.style.fontWeight = "bold";
            span.textContent = data ?? clipboard;
            focusNode.parentNode.insertBefore(span, focusNode.nextSibling);
            focusNode.parentNode.insertBefore(
              document.createTextNode(textoDespues),
              span.nextSibling
            );
            setCursorPositionCollapsed({});
            node = span;
          }

          let newPositionsNodes = [];
          while (node !== richEditorTextRef.current) {
            let i = 0;
            const { childNodes } = node.parentElement;
            for (i; i < childNodes.length; i++) {
              if (childNodes[i] === node) break;
            }
            newPositionsNodes.unshift(i);
            node = node.parentElement;
          }

          const isEqualsPositions =
            JSON.stringify(positionsNodes) ===
            JSON.stringify(newPositionsNodes);

          setCursorPosition({
            cursorPositionNode: newPositionsNodes,
            cursorPositionOffset: isEqualsPositions ? focusOffset : 1,
          });

          const { innerHTML } = e.target;

          if (undoStack.length === 0) {
            setUndoStack([
              {
                content: content || "<p><br></p>",
                cursorPositionNode: newPositionsNodes,
                cursorPositionOffset: content
                  ? isEqualsPositions
                    ? focusOffset - 1
                    : 1
                  : 0,
              },
              {
                content: innerHTML,
                cursorPositionNode: newPositionsNodes,
                cursorPositionOffset: isEqualsPositions ? focusOffset : 1,
              },
            ]);
          } else {
            setUndoStack((prevUndoStack) => [
              ...prevUndoStack,
              {
                content: innerHTML,
                cursorPositionNode: newPositionsNodes,
                cursorPositionOffset: isEqualsPositions ? focusOffset : 1,
              },
            ]);
          }

          setRedoStack([]);

          setContent(innerHTML);
        }}
        onKeyDown={(e) => {
          if (e.key === "Backspace" && e.target.innerHTML === "<p><br></p>") {
            e.preventDefault();
          }
        }}
      />
    </div>
  );
}
