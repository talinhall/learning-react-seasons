import './SeasonDisplay.css';
import React from 'react';

//using semantic Ui icons to the display
//like snowflakes

const seasonConfig = {
    summer: {
        text: "Let's hit the beach!",
        iconName: 'sun'
    },
    winter: {
        text: "Burr, it's cold!",
        iconName: 'snowflake'
    }
};
const getSeason = (lat, month) => {
    if(month> 2 && month<9){
        //this says if lat is greater than 0 return summer otherwise
        //return winter
        return lat > 0 ? 'summer' : 'winter';
    }
    else{
        return lat > 0 ? 'winter' : 'summer';
    }
};

const SeasonDisplay = (props) => {
    //console.log(props.lat);
    // this is how you get month new Date().getMonth() the months starts with 0
    //so january is 0 februaury 1 ect
    
    const season = getSeason(props.lat, new Date().getMonth());
    //const text = season === 'winter' ? 'Burr, it\'s chilly' : 'Lets hit the beach';
    //const icon = season === 'winter' ? 'snowflake' : 'sun';
    //return object with text and iconNeam {text,iconName}
    const { text, iconName} = seasonConfig[season];
    return (
    <div className= {`season-display ${season}`}> 
    {/**   <i className = "snowflake icon"/
      the way its done now is it takes the name of the value of icon then 
      className icon this called string template>*/}
       <i className = {` icon-left massive ${iconName} icon`}/>
       <h1>{text}</h1> 
       <i className = {`icon-right massive ${iconName} icon`}/>
    </div>
    );
};

export default SeasonDisplay;


