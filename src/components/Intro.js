import React from "react";
import "./../styles/intro.css";

export default function Intro(props) {
    return (
        <div className="intro-main">
            <h1 className="intro-title">Quizzical</h1>
            <p className="intro-desc">Just a 5 question random Quiz!</p>
            <button className="start-button" onClick={props.startGame}>
                Start quiz
            </button>
        </div>
    );
}
