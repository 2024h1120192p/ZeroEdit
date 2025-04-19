//Import the Logo
// import logo from './logo.svg';

// Importing CSS and Bootstrap
import './MainIDE.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Container, Row } from 'react-bootstrap';

//Import the React framework
import React, { useEffect, useState } from 'react';

// Importing components
import MainScreen from './components/MainScreen/MainScreen';
import SideBar from './components/SideBar/SideBar';

import { Text } from 'automerge'
import { useDocument } from '@automerge/automerge-repo-react-hooks';
import { updateText } from '@automerge/automerge/next';

function MainIDE({ DarkTheme, docUrl }) {
    const [doc, changeDoc] = useDocument(docUrl);
    const [outputContent, setOutputContent] = useState("Something Cool");

    const setFileName = (value) => changeDoc((d) => {
        d.fileName = value;
    });
    
    const setEditorContent = (value) => changeDoc((d) => {
        d.fileContent = value;
    });

    const IDEVars = {
        fileName: {
            value: doc?.fileName ?? "somethingcool.js",
            set: setFileName
        },
        editorContent: {
            value: doc?.fileContent ?? "console.log('Something Cool')",
            set: setEditorContent
        },
        outputContent: {
            value: outputContent,
            set: setOutputContent
        },
    }

    return (
        <Container className={`App px-0 ${(DarkTheme.global.value && "bg-dark text-light") || "bg-light text-dark"}`} fluid>
            <Row className='mx-0'>
                <SideBar colSize={2} DarkTheme={DarkTheme} IDEVars={IDEVars} docUrl={docUrl} />
                <MainScreen colSize={10} DarkTheme={DarkTheme} IDEVars={IDEVars} docUrl={docUrl} />
            </Row>
        </Container>
    );
}

export default MainIDE;
