import React from "react";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import Intro from "./components/Intro";
import Quiz from "./components/Quiz";
import { decode } from "html-entities";

function App() {
    const [isStart, setIsStart] = useState(false);
    const [quizObjects, setQuizObjects] = useState([]);

    useEffect(() => {
        fetch(
            "https://opentdb.com/api.php?amount=5&category=31&difficulty=easy&type=multiple"
        )
            .then((res) => res.json())
            .then((data) => setQuizObjects(data.results));
    }, []);

    function startGame() {
        setIsStart(!isStart);
    }

    console.log(quizObjects);

    const quizElements = quizObjects.map((itm) => {
        return (
            <Quiz
                question={decode(itm.question)}
                correct_answer={itm.correct_answer}
                incorrect_answers={itm.incorrect_answers}
            />
        );
    });

    return (
        <main>
            <div className="blob" id="blob-1">
                <img src={require("./imgs/blob-1.png")} alt="blob" />
            </div>
            <div className="blob" id="blob-2">
                <img src={require("./imgs/blob-2.png")} alt="blob" />
            </div>
            {!isStart && <Intro startGame={startGame} />}
            {isStart && <div className="main-content">{quizElements}</div>}
        </main>
    );
}

export default App;
