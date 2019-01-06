import React, { Component } from "react";

import Cards from "./components/Cards/index";
import Slot from "./components/Slots/index";
import char from "./data/characters.json";
import Slider from "react-slick";
import "./base.scss";
import Stats from "./components/Stats/Stats";
import { Actions } from "./store/actions/index";
import { connect } from "react-redux";
import Spinner from "./components/Spinner/Spinner";
import firebase from "firebase";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slotsFilled: 0,
            arr: char.character,
            status: "",
            keyArray: { key1: null, key2: null },
            filled: false,
            images: [],
            fetched: false
        };
    }

    // static getStateFromDerivedProps(props, state){}

    componentDidMount() {
        const { arr } = this.state;
        console.log("mounted");
        // this.props.dispatch(Actions.fetch({ arr: arr }));

        const storage = firebase.storage().ref();

        const imgUrl = [];
        for (let key in arr) {
            const storageRef = storage.child(`img/${arr[key].name}.png`);

            storageRef
                .getDownloadURL()
                .then(function(url) {
                    imgUrl.push({ key: arr[key].name, url: url });
                    arr[key].image = url;
                })
                .catch(function(error) {
                    console.log({ error });
                });
        }

        setTimeout(() => {
            this.setState({ images: imgUrl, fetched: true });
        }, 2000);
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

    render() {
        const { arr, keyArray, filled, fetched } = this.state;
        let characters = [];
        let chars = [];

        for (let i = 0; i < arr.length; i++) {
            characters.push(
                <Cards
                    key={keyArray}
                    id={i}
                    name={arr[i].name}
                    handler={this.handleSelection}
                    image={arr[i].image}
                    filled={filled}
                />
            );
            chars.push(
                <Cards
                    key={keyArray}
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
            speed: 50,
            slidesToShow: 3,
            centerMode: true,
            slidesToScroll: 1,
            focusOnSelect: filled ? false : true
        };
        if (fetched) {
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
                    {keyArray.key1 !== null && keyArray.key2 !== null ? (
                        <Stats
                            slot1={arr[keyArray.key1]}
                            slot2={arr[keyArray.key2]}
                        />
                    ) : null}
                </div>
            );
        }
        return <Spinner text={"Loading..."} />;
    }
}

const mapStateToProps = state => {
    const { url } = state.fetch_reducer;
    return { url };
};
export default connect(mapStateToProps)(App);
