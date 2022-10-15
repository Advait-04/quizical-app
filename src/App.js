import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Intro from "./components/Intro";
import Quiz from "./components/Quiz";
import { decode } from "html-entities";
import { nanoid } from "nanoid";

function App() {
    const [isStart, setIsStart] = useState(false);
    const [quizObjects, setQuizObjects] = useState([]);
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        fetch(
            "https://opentdb.com/api.php?amount=5&category=31&difficulty=easy&type=multiple"
        )
            .then((res) => res.json())
            .then((data) =>
                setQuizObjects(
                    data.results.map((itm) => {
                        const optionsArray = shuffleArray([
                            ...itm.incorrect_answers,
                            itm.correct_answer,
                        ]);

                        return {
                            question: itm.question,
                            options: optionsArray,
                            correct_answer: itm.correct_answer,
                            id: nanoid().slice(0, 5),
                        };
                    })
                )
            );
    }, []);

    function startGame() {
        setIsStart(!isStart);
    }

    function handleSubmit() {
        setSubmit(!submit);
    }

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    const quizElements = quizObjects.map((itm) => {
        return (
            <Quiz
                key={itm.id}
                id={itm.id}
                question={decode(itm.question)}
                answer={itm.correct_answer}
                options={itm.options}
                isSubmit={submit}
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
            {isStart && (
                <div className="main-content">
                    <div className="quiz-section">{quizElements}</div>
                    <div className="submit-button-div">
                        <button
                            className="submit-button"
                            onClick={handleSubmit}
                        >
                            Check answers
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default App;
