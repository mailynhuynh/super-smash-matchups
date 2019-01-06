import React, { Component } from "react";
import "./style.scss";

class Stats extends Component {
    render() {
        const { slot1, slot2 } = this.props;
        return (
            <div className="container">
                <div className="col1">
                    <p>Universe:</p>
                    <p>Tier:</p>
                    <p>Air-Speed:</p>
                    <p>Dash-Speed:</p>
                    <p>Fall-Speed:</p>
                    <p>Run-Speed:</p>
                    <span>
                        Spirits:
                        <ul>
                            <li>primary:</li>
                            <li>slot-1:</li>
                            <li>slot-2:</li>
                            <li>slot-3:</li>
                        </ul>
                    </span>
                    <p>Weight:</p>
                    <span>
                        Unlock:
                        <ul>
                            <li>wofl:</li>
                            <li>classic-mode:</li>
                            <li>vs-mode:</li>
                        </ul>
                    </span>
                </div>

                <div className="col2">
                    <p>{slot1.universe}</p>

                    <p>{slot1.tier}</p>
                    <p>{slot1.air_speed}</p>
                    <p>{slot1.dash_speed}</p>
                    <p>{slot1.fall_speed}</p>
                    <p>{slot1.run_speed}</p>
                    <span>
                        <br />
                        <ul>
                            <li>{slot1.spirits[0].primary}</li>
                            <li>{slot1.spirits[1].slot_1}</li>
                            <li>{slot1.spirits[2].slot_2}</li>
                            <li>{slot1.spirits[3].slot_3}</li>
                        </ul>
                    </span>
                    <p>{slot1.weight}</p>
                    <span>
                        <br />
                        <ul>
                            <li>{slot1.unlock[0].wofl} </li>
                            <li>{slot1.unlock[1].classic_mode}</li>
                            <li>{slot1.unlock[2].vs_mode}</li>
                        </ul>
                    </span>
                </div>

                <div className="col3">
                    <p>{slot2.universe}</p>

                    <p>{slot2.tier}</p>
                    <p>{slot2.air_speed}</p>
                    <p>{slot2.dash_speed}</p>
                    <p>{slot2.fall_speed}</p>
                    <p>{slot2.run_speed}</p>
                    <span>
                        <br />
                        <ul>
                            <li>{slot2.spirits[0].primary}</li>
                            <li>{slot2.spirits[1].slot_1}</li>
                            <li>{slot2.spirits[2].slot_2}</li>
                            <li>{slot2.spirits[3].slot_3}</li>
                        </ul>
                    </span>
                    <p>{slot2.weight}</p>
                    <span>
                        <br />
                        <ul>
                            <li>{slot2.unlock[0].wofl} </li>
                            <li>{slot2.unlock[1].classic_mode}</li>
                            <li>{slot2.unlock[2].vs_mode}</li>
                        </ul>
                    </span>
                </div>
            </div>
        );
    }
}

export default Stats;
