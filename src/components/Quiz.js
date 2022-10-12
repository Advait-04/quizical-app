import React from "react";
import "./../styles/quiz.css";
import { decode } from "html-entities";

export default function Quiz(props) {
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    const options = shuffleArray([
        ...props.incorrect_answers,
        props.correct_answer,
    ]);

    const optionElements = options.map((option, idx) => {
        return (
            <button className="option-button" id={`btn-${idx}`}>
                {decode(option)}
            </button>
        );
    });

    return (
        <div>
            <p className="quiz-question">{props.question}</p>
            <div className="quiz-options">{optionElements}</div>
            <hr />
        </div>
    );
}
