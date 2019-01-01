import React, { Component } from "react";

import Cards from "./components/Cards/index";
import Slot from "./components/Slots/index";
import char from "./data/characters.json";
import Slider from "react-slick";
import "./base.scss";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slotsFilled: 0,
            arr: char.character,
            status: "",
            keyArray: { key1: null, key2: null },
            filled: false
        };
    }

    handleSelection = key => {
        this.setState(prevState => {
            const { key1, key2 } = prevState.keyArray;
            if (key1 !== key && key1 !== null && key2 === null) {
                return {
                    ...prevState,
                    keyArray: { key1, key2: key },
                    filled: true
                };
            } else if (key1 !== null && key2 !== null) {
                alert("You've selected 2 options already");
                return {
                    ...prevState,
                    keyArray: { key1, key2 },
                    filled: true
                };
            } else if (key2 !== key && key2 !== null && key1 === null) {
                return {
                    ...prevState,
                    keyArray: { key1: key, key2 },
                    filled: true
                };
            } else if (key1 === null) {
                return {
                    ...prevState,
                    keyArray: { key1: key, key2: null },
                    filled: false
                };
            }
            return;
        });
    };

    updateSlots = key => {
        this.setState(prevState => {
            const { key1, key2 } = prevState.keyArray;
            if (key1 === key) {
                return {
                    ...prevState,
                    keyArray: { key1: null, key2 },
                    filled: false
                };
            }
            return {
                ...prevState,
                keyArray: { key2: null, key1 },
                filled: false
            };
        });
    };
    // resetSlots = () => {
    //     this.setState({ slotsFilled: 0 });
    // };
    // checkSlots = () => {
    //     return this.state.slotsFilled < 2;
    // };

    render() {
        const { arr, keyArray, filled } = this.state;
        let characters = [];
        let chars = [];
        for (let i = 0; i < arr.length - 65; i++) {
            characters.push(
                <Cards
                    key={keyArray}
                    id={i}
                    name={arr[i].name}
                    handler={this.handleSelection}
                    color={arr[i].color}
                    filled={filled}
                />
            );
            chars.push(
                <Cards
                    key={keyArray}
                    id={i}
                    name={arr[i].name}
                    handler={this.updateSlots}
                    color={arr[i].color}
                />
            );
        }

        let selectedCard = "";
        if (keyArray.key1 !== null) {
            // eslint-disable-next-line
            selectedCard = chars.filter(card => {
                if (card.props.id === keyArray.key1) {
                    return card;
                }
            });
        }
        let selectedCard2 = "";
        if (keyArray.key2 !== null) {
            // eslint-disable-next-line
            selectedCard2 = chars.filter(card => {
                if (card.props.id === keyArray.key2) {
                    return card;
                }
            });
        }
        // console.log(selectedCard, selectedCard2);

        const settings = {
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            centerMode: true,
            slidesToScroll: 1,
            focusOnSelect: filled ? false : true
        };
        return (
            <div>
                <header>
                    <div className="main-container">
                        Super Smash Bros Matchups
                    </div>
                </header>
                <div className="main-container">
                    <h2>Choose two characters</h2>
                    <Slider {...settings}>
                        {characters.map(character => {
                            return (
                                <div
                                    className="characters"
                                    key={character.props.id}
                                >
                                    {character}
                                </div>
                            );
                        })}
                    </Slider>
                    <div className="slots">
                        <Slot name={selectedCard} id="slot-1" />
                        <Slot name={selectedCard2} id="slot-2" />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
