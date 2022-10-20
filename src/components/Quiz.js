import React, { useEffect, useState } from "react";
import "./../styles/quiz.css";
import { decode } from "html-entities";

export default function Quiz(props) {
    const [validationObject, setValidationObject] = useState([]);
    const [isHeld, setIsHeld] = useState(false);
    const [selectedCorrect, setSelectedCorrect] = useState([]);

    useEffect(() => {
        setValidationObject(() => {
            return props.options.map((option, id) => {
                return {
                    name: option,
                    id: id,
                    isHeld: isHeld,
                };
            });
        });
    }, []);

    useEffect(() => {
        for (let i = 0; i < validationObject.length; i++) {
            if (
                validationObject[i].name === props.answer &&
                validationObject[i].isHeld &&
                !selectedCorrect.includes(validationObject[i].name)
            ) {
                props.setCount(props.count + 1);
                setSelectedCorrect([
                    ...selectedCorrect,
                    validationObject[i].name,
                ]);
            }
        }
    });

    function handleClick(id) {
        setValidationObject((validationObject) => {
            return validationObject.map((option) => {
                if (option.id === id) {
                    return {
                        ...option,
                        isHeld: !option.isHeld,
                    };
                } else {
                    return {
                        ...option,
                    };
                }
            });
        });
    }

    const optionElements = validationObject.map((option, idx) => {
        let style;

        if (props.isSubmit) {
            if (props.answer === option.name) {
                style = {
                    backgroundColor: "#94d7a2",
                    border: "1px solid #f5f7fb",
                    color: "#293264",
                };
            } else {
                if (option.isHeld) {
                    style = {
                        backgroundColor: "#f8bcbc",
                        border: "1px solid #f5f7fb",
                        color: "#293264",
                    };
                } else {
                    style = {
                        backgroundColor: "#f5f7fb",
                        border: "1px solid #d6dbf5",
                        color: "#d6dbf5",
                    };
                }
            }
        } else {
            style = {
                backgroundColor: option.isHeld ? "#d6dbf5" : "#f5f7fb",
            };
        }

        return (
            <button
                key={idx}
                className="option-button"
                id={`btn-${option.id}-${idx}`}
                onClick={() => handleClick(option.id)}
                style={style}
            >
                {decode(option.name)}
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
