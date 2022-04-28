import React from "react";
import "./Form.css";
import Axios from "axios";
import { useHistory } from 'react-router-dom';

function Form() {
    const [address, setAddress] = React.useState("");
    const [maxRadius, setMaxRadius] = React.useState(0);
    const [location, setLocation] = React.useState("");
    const history = useHistory();

    const submit = () => {
        Axios.post("http://localhost:3001/test", {
            address: address, 
            maxRadius: maxRadius, 
            location: location
        }).then((response) => {
            const data = encodeURIComponent(JSON.stringify(response.data));
            history.push('/display?data='+ data);
        }).catch(err => {
            console.log(err);
        })

        history.push('/');

    }

    return (
        <div>
            <div className="formContainer">
                <h1>Form</h1>
                <p>Instructions: Input your current address, and a maximum distance that you are willing to travel to (in km). Then specify what type of location you’d like to travel to. (Ex: Supermarket, Park, Hotel, etc). Submit to find your results.</p>
                <div class = 'form-group'>
                    <input type = 'text' class="form-control" onChange={(event) => setAddress(event.target.value)} placeholder="Enter Current Address"/>
                </div>

                <div class = 'form-group'>
                    <br></br><input type = 'number' class="form-control" onChange={(event) => setMaxRadius(event.target.value)}  placeholder="Enter Search Radius"/>
                </div>

                <div class = 'form-group'>
                    <br></br><input type = 'text' class="form-control" onChange={(event) => setLocation(event.target.value)} placeholder="Enter Location Type"/>
                </div>
                <br></br><button class="btn btn-primary" onClick={submit}>Submit</button>
            </div>
        </div>
    )
}




export default Form; 














































