import React, { FC, useEffect, useMemo, useState } from 'react';
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote,
    FormattingToolbarPositioner,
    HyperlinkToolbarPositioner,
    SideMenuPositioner,
    SlashMenuPositioner,
    ToggledStyleButton,
    Toolbar,
    ToolbarButton,
    useEditorContentChange,
    useEditorSelectionChange, } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useTheme } from './Providers/ThemeProvider';
import { Document } from '@/types';

interface EditorProps{
    onChange:(val:string)=>void;
    document:Document;
    editable?:boolean;
}

const Editor:FC<EditorProps> = ({onChange,document,editable}) => {
    
    
    const { theme } = useTheme();
    const editor: BlockNoteEditor = useBlockNote({
        editable,
        initialContent:document.content?JSON.parse(document.content) as PartialBlock[]:undefined,
        onEditorContentChange:e=>onChange(JSON.stringify(e.topLevelBlocks,null,2)),
    });
    
    return (
        <div>
            <BlockNoteView editor={editor} theme={theme==='dark'? 'dark':'light'}  >
                <FormattingToolbarPositioner
                        editor={editor}
                        formattingToolbar={CustomFormattingToolbar}
                    />
                <HyperlinkToolbarPositioner editor={editor} />
                <SlashMenuPositioner editor={editor} />
                <SideMenuPositioner editor={editor} />
            </BlockNoteView>
        </div>
    )
}

export default Editor;



const CustomFormattingToolbar = (props: { editor: BlockNoteEditor }) => {
    // Tracks whether the text & background are both blue.
    const [isSelected, setIsSelected] = useState<boolean>(
    props.editor.getActiveStyles().textColor === "blue" &&
        props.editor.getActiveStyles().backgroundColor === "blue"
    );

    // Updates state on content change.
    useEditorContentChange(props.editor, () => {
    setIsSelected(
        props.editor.getActiveStyles().textColor === "blue" &&
        props.editor.getActiveStyles().backgroundColor === "blue"
    );
    });

    // Updates state on selection change.
    useEditorSelectionChange(props.editor, () => {
    setIsSelected(
        props.editor.getActiveStyles().textColor === "blue" &&
        props.editor.getActiveStyles().backgroundColor === "blue"
    );
    });

    return (
    <Toolbar>
        {/*Default button to toggle bold.*/}
        <ToggledStyleButton editor={props.editor} toggledStyle={"bold"} />
        {/*Default button to toggle italic.*/}
        <ToggledStyleButton editor={props.editor} toggledStyle={"italic"} />
        {/*Default button to toggle underline.*/}
        <ToggledStyleButton editor={props.editor} toggledStyle={"underline"} />
        <ToggledStyleButton editor={props.editor} toggledStyle={"strike"} />
        {/*Custom button to toggle blue text & background color.*/}
        <ToolbarButton
        mainTooltip={"Blue Text & Background"}
        onClick={() => {
            props.editor.toggleStyles({
            textColor: "blue",
            backgroundColor: "blue",
            });
        }}
        isSelected={isSelected}>
        Blue
        </ToolbarButton>
    </Toolbar>
    );
};