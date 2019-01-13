import React, { Component } from "react";

import Cards from "./components/Cards/index";
import Slot from "./components/Slots/index";
import char from "./data/characters.json";
import Slider from "react-slick";
import "./base.scss";
import Stats from "./components/Stats/Stats";
import Spinner from "./components/Spinner/Spinner";

import firebase from "firebase";
import { IconDownArrow } from "./components/svg";

const projectId = "super-smash-matchups";

var config = {
    apiKey: "AIzaSyDUAeMJRPkI2Rn5cgujTRzWupryJmo-J4o",
    authDomain: `${projectId}.firebaseapp.com`,
    databaseURL: `${projectId}.firebaseio.com`,
    storageBucket: `${projectId}.appspot.com`
};
firebase.initializeApp(config);
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slotsFilled: 0,
            arr: char.character,
            status: "",
            keyArray: { key1: null, key2: null },
            filled: false,
            fetched: false,
            displayAnim: false
        };
    }

    componentDidMount() {
        const { arr } = this.state;
        const storage = firebase.storage().ref();

        for (let key in arr) {
            const storageRef = storage.child(`img/${arr[key].name}.png`);

            storageRef
                .getDownloadURL()
                .then(url => {
                    const newArr = [...arr];
                    newArr[key].image = url;
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            fetched: true,
                            arr: newArr
                        };
                    });
                })
                .catch(function(error) {
                    console.log({ error });
                });
        }

        window.addEventListener("scroll", this.listenToScroll);
    }

    listenToScroll = e => {
        const { key1, key2 } = this.state.keyArray;
        if (key1 !== null && key2 !== null) {
            const statsScroll = this.Stats._reactInternalFiber.child.stateNode
                .offsetTop;
            if (window.pageYOffset > statsScroll) {
                this.setState(prevState => {
                    return { ...prevState, displayAnim: false };
                });
            }
        }
    };

    componentWillUnmount() {
        window.removeEventListener("scroll", this.listenToScroll);
    }

    handleSelection = key => {
        this.setState(prevState => {
            const { key1, key2 } = prevState.keyArray;
            if (key1 !== key && key1 !== null && key2 === null) {
                return {
                    ...prevState,
                    keyArray: { key1, key2: key },
                    filled: true,
                    displayAnim: true
                };
            } else if (key1 !== null && key2 !== null) {
                return {
                    ...prevState,
                    keyArray: { key1, key2 },
                    filled: true,
                    displayAnim: true
                };
            } else if (key2 !== key && key2 !== null && key1 === null) {
                return {
                    ...prevState,
                    keyArray: { key1: key, key2 },
                    filled: true,
                    displayAnim: true
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

    render() {
        const { arr, keyArray, filled, fetched, displayAnim } = this.state;
        let characters = [];
        let chars = [];

        for (let i = 0; i < arr.length; i++) {
            characters.push(
                <Cards
                    key={arr[i].name.toString()}
                    id={i}
                    name={arr[i].name}
                    handler={this.handleSelection}
                    image={arr[i].image}
                    filled={filled}
                />
            );
            chars.push(
                <Cards
                    key={arr[i].name.toString()}
                    id={i}
                    name={arr[i].name}
                    handler={this.updateSlots}
                    image={arr[i].image}
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

        const settings = {
            infinite: true,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 5,
            focusOnSelect: filled ? false : true,
            responsive: [
                {
                    breakpoint: 1540,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 860,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 520,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        const renderStats = keyArray.key1 !== null && keyArray.key2 !== null;

        if (!fetched) {
            return <Spinner text={"Loading..."} />;
        }
        return (
            <div>
                <header>
                    <div className="main-container">
                        <h2>Super Smash Bros Matchups</h2>
                    </div>
                </header>
                <div className="main-container images">
                    <p>
                        Compare characters from the Super Smash Bros. Ultimate
                        character list
                    </p>
                    <h2>Choose two characters:</h2>
                    <div style={{ padding: "30px" }}>
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
                    </div>
                    <div className="slots">
                        <h2>Selected Characters:</h2>
                        {keyArray.key1 !== null || keyArray.key2 !== null ? (
                            <p>Click on a slot to remove a character</p>
                        ) : null}
                        <Slot name={selectedCard} id="slot-1" />
                        <Slot name={selectedCard2} id="slot-2" />
                    </div>
                    {renderStats && displayAnim ? (
                        <div className="arrow bounce">
                            <IconDownArrow />
                        </div>
                    ) : null}
                </div>

                {renderStats ? (
                    <Stats
                        ref={ref => (this.Stats = ref)}
                        slot1={arr[keyArray.key1]}
                        slot2={arr[keyArray.key2]}
                    />
                ) : null}
            </div>
        );
    }
}

export default App;
