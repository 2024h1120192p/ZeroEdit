// src/components/MainScreen/Header.jsx

import React, { useState } from 'react';

import { useDocument } from '@automerge/automerge-repo-react-hooks';
import { updateText } from '@automerge/automerge/next';

const Header = ({
    handleOpenDarkModeSettings,
    handleOpenShareLink,
    handleFileSave,
    globalThemeDark,
    IDEVars
}) => {
    // const setFileName = (e) => {
    //     console.log(e.target.value);
    //     IDEVars.fileName.set(e.target.value); 
    // }

    return (
        <div id="Main-Screen-Header" className='d-flex align-items-center w-100 border-bottom'>
            <h2 className='text-start pe-4'>
                ZeroEdit
            </h2>

            <div className="g-2">
                <b style={{ alignSelf: 'center' }}>File :</b> &nbsp;
                <input
                    type="text"
                    placeholder="Enter file name"
                    value={IDEVars.fileName.value}
                    onChange={(e) => IDEVars.fileName.set(e.target.value)}
                    style={{ padding: '5px', fontSize: '14px' }}
                />
                &nbsp;
                <button name="saveFile" id="saveFile" onClick={handleFileSave} className={`${(globalThemeDark && 'text-light')}`}>
                    <i className='bi bi-floppy fs-5'></i>
                    &nbsp;
                    Save
                </button>
                &nbsp;
                <button name="Compile/Run" id="Compile/Run" className='text-success'>
                    <i className='bi bi-play-circle-fill fs-5'></i>
                    &nbsp;
                    Run
                </button>
                &nbsp;
                <button name="Compile/Run" id="Compile/Run" className='text-danger'>
                    <i className='bi bi-stop-circle-fill fs-5'></i>
                    &nbsp;
                    Stop
                </button>
            </div>

            <div style={{ marginLeft: 'auto', alignSelf: 'right' }}>
                <button name="shareLink" id="shareLink" onClick={handleOpenShareLink} className={`${(globalThemeDark && 'text-light')}`}>
                    <i className='bi bi-link fs-3'></i>
                </button>
                <button name="threeDots" id="threeDots" onClick={handleOpenDarkModeSettings} className={`${(globalThemeDark && 'text-light')}`}>
                    <i className='bi bi-three-dots fs-3'></i>
                </button>
            </div>

        </div>
    );
}

export default Header;