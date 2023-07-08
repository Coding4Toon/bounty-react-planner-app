import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable';
import { quote } from '../quote';

export default function MyCustomWidget() {

    //Quote
    const [myQuote, setMyQuote] = useState(1);

    //Kanban
    const [board, setBoard] = useState([])
    useEffect(() => {
        let data = window.localStorage.getItem("data")
        if (data) {
            setBoard(JSON.parse(data))
        } else {
            //Initial state
            setBoard([
                {
                    id: 1,
                    title: 'To Do',
                    cards: [
                        {
                            id: 1,
                            title: 'New Task',
                        },

                    ]
                },
                {
                    id: 2,
                    title: 'In Progress',
                    cards: []
                },
                {
                    id: 3,
                    title: 'Completed',
                    cards: []
                }
            ])
        }
    }, [])

    useEffect(() => {
        if (board.length > 0) window.localStorage.setItem("data", JSON.stringify(board))
    }, [board])
    return (
        <div>
            {/* Display random quotes */}
            <div style={styles.quoteStyle}>
                <div>{quote.find(quote => quote.id === myQuote)?.content}</div>
                <div>{quote.find(quote => quote.id === myQuote)?.author}</div>
            </div>
            {/* Display Kanban */}
            <div style={styles.boardContainer}>
                {board.map((list) => {
                    return (
                        <div id={`list_${list.id}`} key={list.id} className="list-container" style={styles.listContainer}>
                            <h2>{list.title}</h2>
                            {list.cards.map((card) => {
                                return (
                                    <Draggable
                                        key={card.id}
                                        onStop={(e,) => {
                                            let allLists = document.querySelectorAll('.list-container');
                                            for (let i = 0; i < allLists.length; i++) {
                                                let list = allLists[i];
                                                let rect = list.getBoundingClientRect();
                                                let data = {
                                                    x: e.clientX,
                                                    y: e.clientY
                                                }
                                                let flag = false
                                                if (data.x > rect.left && data.x < rect.right && data.y > rect.top && data.y < rect.bottom) {
                                                    let final_list_id = list.id.split('_')[1];
                                                    let final_card_id = card.id;
                                                    let temp_boards = [...board]
                                                    for (let boardIndex = 0; boardIndex < temp_boards.length; boardIndex++) {
                                                        for (let cardIndex = 0; cardIndex < temp_boards[boardIndex].cards.length; cardIndex++) {
                                                            if (temp_boards[boardIndex].cards[cardIndex].id === final_card_id) {
                                                                temp_boards[boardIndex].cards.splice(cardIndex, 1)
                                                            }
                                                        }
                                                    }
                                                    for (let boardIndex = 0; boardIndex < temp_boards.length; boardIndex++) {
                                                        if (temp_boards[boardIndex].id === parseInt(final_list_id)) {
                                                            temp_boards[boardIndex].cards.push(card)
                                                        }
                                                    }
                                                    flag = true
                                                    setBoard(temp_boards)
                                                }
                                            }

                                        }}
                                    >
                                        <div style={styles.cardContainer}>
                                            <input type={"text"} style={styles.title} className='text-input' value={card.title}
                                                onChange={(e) => {
                                                    let temp_boards = [...board]
                                                    for (let i = 0; i < temp_boards.length; i++) {
                                                        for (let j = 0; j < temp_boards[i].cards.length; j++) {
                                                            if (temp_boards[i].cards[j].id === card.id) {
                                                                temp_boards[i].cards[j].title = e.target.value
                                                            }
                                                        }
                                                    }
                                                    setBoard(temp_boards)

                                                }}
                                            />
                                        </div>
                                    </Draggable>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <div className='timer-controls' style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: '10px', }}>

                {/* Button to add new task in to do list  */}
                <button
                    style={{
                        background: "none",
                        border: "none",
                        color: "white",
                        fontSize: "15px",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        let temp_boards = [...board];
                        const randomIndex = Math.floor(Math.random() * quote.length) + 1;
                        temp_boards[0].cards.push({
                            id: new Date().getTime(),
                            title: 'New Task',
                        })
                        setBoard(temp_boards);
                        setMyQuote(randomIndex);

                    }}
                >+ New Task To Do</button>

                {/* Button to reset Kanban and start from scratch */}
                <button
                    style={{
                        background: "none",
                        border: "none",
                        color: "white",
                        fontSize: "15px",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        setBoard([
                            {
                                id: 1,
                                title: 'To Do',
                                cards: [
                                    {
                                        id: 1,
                                        title: 'New Task',
                                    },

                                ]
                            },
                            {
                                id: 2,
                                title: 'In Progress',
                                cards: []
                            },
                            {
                                id: 3,
                                title: 'Completed',
                                cards: []
                            }
                        ])
                    }}
                >Reset</button>

            </div>
        </div>

    );
}

// Style for Kanban
const styles = {
    boardContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '25px'
    },
    listContainer: {
        borderRadius: '5px',
        padding: '10px',
        width: '7vw',
        minHeight: "20vh",
        fontSize: "20px",
        fontWeight: "bold",
    },
    cardContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px 0',
        minHeight: "50px",
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
        display: "flex",
        flexDirection: "column",

    },
    title: {
        padding: 0,
        margin: 0,
        border: "none",
        fontSize: "12px",
    },
    newCard: {
        backgroundColor: '#efaeae',
        color: '#ffffff',
        border: 'none',
        width: "100%",
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        outline: 'none'

    },

    quoteStyle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: '25px',
        fontSize: "15px",
        fontWeight: "bold",
        textAlign: 'center',
    },
}