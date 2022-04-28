import React from "react";
import "./Display1.css";

function Display() {
    const [addresses, setAddresses] = React.useState(JSON.parse(Object.fromEntries(new URLSearchParams(window.location.search)).data).addresses);
    const [names, setNames] = React.useState(JSON.parse(Object.fromEntries(new URLSearchParams(window.location.search)).data).names);
    const [closestFive, setClosestFive] = React.useState(JSON.parse(Object.fromEntries(new URLSearchParams(window.location.search)).data).closestFive);

    var addressArray = [];
    var nameArray = [];
    var closestFiveArray = [];

    for(let count = 0; count < closestFive.length; count++){
        addressArray.push(<h4>{addresses[count]}</h4>);
        nameArray.push(<h4>{names[count]}</h4>);
        closestFiveArray.push(<h4>{closestFive[count].text}</h4>);
    }

    // function selectionSort(inputArr) { 
    //     let n = inputArr.length;
            
    //     for(let i = 0; i < n; i++) {
    //         // Finding the smallest number in the subarray
    //         let min = i;
    //         for(let j = i+1; j < n; j++){
    //             if(inputArr[j] < inputArr[min]) {
    //                 min=j; 
    //             }
    //          }
    //          if (min != i) {
    //              // Swapping the elements
    //              let tmp = inputArr[i]; 
    //              inputArr[i] = inputArr[min];
    //              inputArr[min] = tmp;      
    //         }
    //     }
    //     return inputArr;
    // }


    return ( 
        <div>
            <div className="resultContainer">
                <div className="addressColumn">{addressArray}</div>
                <div className="nameColumn">{nameArray}</div>
                <div className="closestFiveColumn">{closestFiveArray}</div>
            </div>
        </div>
    )
}

export default Display;