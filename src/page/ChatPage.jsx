import React from 'react';
import classes from './ChatPage.module.css';
import Header from '../components/LayoutComponents/Header';
import Footer from '../components/LayoutComponents/Footer';
import LLMChatList from '../components/ChatPageComponents/LLMChatList';

const ChatPage = () => {

    
    return (
        <>
            <Header/>
            <div className={classes.pageWrapper}>
                <LLMChatList />
            </div>
            <Footer/>
        </>
    );
};

export default ChatPage;