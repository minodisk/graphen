declare module "react-ace" {
  export interface ReactAceProps {
    name?: string; // Unique Id to be used for the editor
    placeholder?: string; // Placeholder text to be displayed when editor is empty
    mode?: string; // Language for parsing and code highlighting
    theme?: string; // theme to use
    value?: string; // value you want to populate in the code highlighter
    defaultValue?: string; // Default value of the editor
    height?: string; // CSS value for height
    width?: string; // CSS value for width
    className?: string; // custom className
    fontSize?: number; // pixel value for font-size
    showGutter?: boolean; // show gutter
    showPrintMargin?: boolean; // show print margin
    highlightActiveLine?: boolean; // highlight active line
    focus?: boolean; // whether to focus
    cursorStart?: number; // the location of the cursor
    wrapEnabled?: boolean; // Wrapping lines
    readOnly?: boolean; // make the editor read only
    minLines?: number; // Minimum number of lines to be displayed
    maxLines?: number; // Maximum number of lines to be displayed
    enableBasicAutocompletion?: boolean; // Enable basic autocompletion
    enableLiveAutocompletion?: boolean; // Enable live autocompletion
    enableSnippets?: boolean; // Enable snippets
    tabSize?: number; // tabSize
    debounceChangePeriod?: number; // A debounce delay period for the onChange event
    onLoad?: Function; // called on editor load. The first argument is the instance of the editor
    onBeforeLoad?: Function; // called before editor load. the first argument is an instance of ace
    onChange?: Function; // occurs on document change it has 2 arguments the value and the event.
    onCopy?: Function; // triggered by editor copy event, and passes text as argument
    onPaste?: Function; // Triggered by editor paste event, and passes text as argument
    onSelectionChange?: Function; // triggered by editor selectionChange event, and passes a Selection as it's first argument and the event as the second
    onCursorChange?: Function; // triggered by editor changeCursor event, and passes a Selection as it's first argument and the event as the second
    onFocus?: Function; // triggered by editor focus event
    onBlur?: Function; // triggered by editor blur event.It has two arguments event and editor
    onInput?: Function; // triggered by editor input event
    onScroll?: Function; // triggered by editor scroll event
    onValidate?: Function; // triggered, when annotations are changed
    editorProps?: object; // properties to apply directly to the Ace editor instance
    setOptions?: object; // options to apply directly to the Ace editor instance
    keyboardHandler?: string; // corresponding to the keybinding mode to set (such as vim or emacs)
    commands?: Array<any>; // new commands to add to the editor
    annotations?: Array<any>; // annotations to show in the editor i.e. [{ row: 0, column: 2, type: 'error', text: 'Some error.'}], displayed in the gutter
    markers?: Array<any>; // markers to show in the editor, i.e. [{ startRow: 0, startCol: 2, endRow: 1, endCol: 20, className: 'error-marker', type: 'background' }]. Make sure to define the class (eg. ".error-marker") and set position: absolute for it.
    style?: object; // camelCased properties
  }

  const ReactAce: React.SFC<ReactAceProps>;

  export default ReactAce;
}
