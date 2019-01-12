import React, { Component } from "react";
import "./style.scss";

class Stats extends Component {
    render() {
        const { slot1, slot2 } = this.props;
        return (
            <div id="statistics">
                <div className="main-container stats">
                    <div className="row">
                        <span className="name">Universe</span>
                        <div className="result-cont">
                            <span className="results">{slot1.universe}</span>
                            <span className="results">{slot2.universe}</span>
                        </div>
                    </div>
                    <div className="row">
                        <span className="name">Tier</span>
                        <div className="result-cont">
                            <span className="results">{slot1.tier}</span>
                            <span className="results">{slot2.tier}</span>
                        </div>
                    </div>
                    <div className="row">
                        <span className="name">Air Speed</span>
                        <div className="result-cont">
                            <span className="results">{slot1.air_speed}</span>
                            <span className="results">{slot2.air_speed}</span>
                        </div>
                    </div>
                    <div className="row">
                        <span className="name">Dash Speed</span>
                        <div className="result-cont">
                            <span className="results">{slot1.dash_speed}</span>
                            <span className="results">{slot2.dash_speed}</span>
                        </div>
                    </div>
                    <div className="row">
                        <span className="name">Fall Speed</span>
                        <div className="result-cont">
                            <span className="results">{slot1.fall_speed}</span>
                            <span className="results">{slot2.fall_speed}</span>
                        </div>
                    </div>
                    <div className="row">
                        <span className="name">Run Speed</span>
                        <div className="result-cont">
                            <span className="results">{slot1.run_speed}</span>
                            <span className="results">{slot2.run_speed}</span>
                        </div>
                    </div>
                    <div className="row">
                        <span className="name">Weight</span>
                        <div className="result-cont">
                            <span className="results">{slot1.weight}</span>
                            <span className="results">{slot1.weight}</span>
                        </div>
                    </div>
                    <div className="row">
                        <span className="name">Best Spirit Combination</span>
                        <div className="row stat-box">
                            <div className="name">Primary Slot</div>
                            <div className="result-cont">
                                <div className="results">
                                    {slot1.spirits[0].primary}
                                </div>
                                <div className="results">
                                    {slot2.spirits[0].primary}
                                </div>
                            </div>
                        </div>
                        <div className="row stat-box">
                            <div className="name">Slot 1</div>
                            <div className="result-cont">
                                <div className="results">
                                    {slot1.spirits[1].slot_1}
                                </div>
                                <div className="results">
                                    {slot2.spirits[1].slot_1}
                                </div>
                            </div>
                        </div>
                        <div className="row stat-box">
                            <div className="name">Slot 2</div>
                            <div className="result-cont">
                                <div className="results">
                                    {slot1.spirits[2].slot_2}
                                </div>
                                <div className="results">
                                    {slot2.spirits[2].slot_2}
                                </div>
                            </div>
                        </div>
                        <div className="row stat-box">
                            <div className="name">Slot 3</div>
                            <div className="result-cont">
                                <div className="results">
                                    {slot1.spirits[3].slot_3}
                                </div>
                                <div className="results">
                                    {slot2.spirits[3].slot_3}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <span className="name">How To Unlock</span>
                        <div className="row stat-box">
                            <div className="name">World of Light</div>
                            <div className="result-cont">
                                <div className="results">
                                    {slot1.unlock[0].wofl}
                                </div>
                                <div className="results">
                                    {slot2.unlock[0].wofl}
                                </div>
                            </div>
                        </div>
                        <div className="row stat-box">
                            <div className="name">Versus Mode</div>
                            <div className="result-cont">
                                <div className="results">
                                    {slot1.unlock[2].vs_mode}
                                </div>
                                <div className="results">
                                    {slot2.unlock[2].vs_mode}
                                </div>
                            </div>
                        </div>
                        <div className="row stat-box">
                            <div className="name">Classic Mode</div>
                            <div className="result-cont">
                                <div className="results">
                                    {slot1.unlock[1].classic_mode}
                                </div>
                                <div className="results">
                                    {slot2.unlock[1].classic_mode}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <span className="name">Moves</span>
                        <div className="row stat-box">
                            <div className="name">Classic Mode</div>
                            <div className="results" />
                            <div className="results" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Stats;
