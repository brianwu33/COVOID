import React from "react";
import "./Home.css";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";


function Home() {
    return (
        <div>
            <img src="https://cdn.discordapp.com/attachments/798946367816073237/800212898075901962/city.png"></img>
            <div class = "line">
            </div>
            <div class="white">
                                <p>This web app takes in the user's location, destination, and gives recommendations on which destinations are the furthest from COVID Testing Centers & hospitals.</p>
            </div>
            {/* <a href="/form"><button class="button">Start</button></a> */}
            <Link to="/form"><button class="button">Start</button></Link>
            
        </div>
    )
}

export default Home;