import React, { FC, useEffect, useMemo, useState } from 'react';
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
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
            <BlockNoteView editor={editor} theme={theme==='dark'? 'dark':'light'}  />
        </div>
    )
}

export default Editor