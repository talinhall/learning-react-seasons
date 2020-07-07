import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';
 /*Gets the current location documentation at 
    https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
    This function takes two call backs a success and error
    It takes a few seconds for it to get location but the HTML
    is deplayed way before that that's why functional component is not 
    good for this. in other words by tim function returns location we have
    already renders our app onto the screen. and with functional component
    we have no good way of rerendering it automatically or somehow telling 
    the app componet to paus it's rendering. we want to tell compoent to rerender
    itself. 

this is the functional way 

const App = () => {
    
    window.navigator.geolocation.getCurrentPosition(
        (position) => console.log(position),
        (err) => console.log(err)
    );
    return <div>Hi there!</div>
}; 
class based component is below. when make a class create 
a new class inside of javascipt that has only one method 
insdie of it the render method. however, Recat expects our 
class based component has mnay other methods attached to it.
reason extend React.cpmponet because it allows us to use a ton of
build in functionallty from this other class called React.Compoent
 into our class. Sub-classing React.Component. 
 add class and state in react to solve the problem. 
 state only used in class components. Don't confuse props with state
 state is a JS object that conatins data relavant to a component. updating 
 state on a component causes the componoent to almost instantly rerender.
 (This solves rerendering problem. If we want to get a signel component to 
    rerender we update it's state.) 
 state must be initialized when a compoentn is created. state can 
 only be updated using the function 'setState'.
*/
class App extends React.Component{
    //javscript function. Anytime instance of this classs is
    //created the constructor is callled. Same props object 
    //saw with a functonal componets. 
    /*
    constructor (props){
        //have to put
        super(props); //make sure React.components constructor function gets called.
        //initalizing state object.initalize property inside object of latitude wiht default value
        //this is the only time we do direct assignment to the.state
        this.state = {lat: null, errorMessage: ''};
        
    }*/
    //alternitive way of initiallizing state rather than a constructor method show above.
    //babel makes the constructor for you anyways. 
    state = {lat:null, errorMessage: ''};
    /*
    //this part of lifecycle method. when after component gets rendered onto screen
    //these are lifecyce methods. 
    componentDidMount(){
        console.log("my compoent was rendered to the screen");
    }
    //goes unto here when get setState 
    componentDidUpdate(){
        console.log('My componet was jsut updated it  rerendered');
    }
    */
    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({lat:position.coords.latitude}),
            err => this.setState({errorMessage: err.message})
        );
    }
        /*window.navigator.geolocation.getCurrentPosition(
            (position) => {
                //updating the state here. this will cause component ot instatntly rerender
                //called setState. 
                //thie a call back so everything will be running and then wehn get success it will
                //go her update the state and then render the compoennt again. 
                this.setState({lat: position.coords.latitude});
            },
            (err) => {
                this.setState({errorMessage: err.message});
            }
        );*/
        /*
        const mySuccess = (position) => {
            console.log(position);
            this.setState({lat: position.coords.latitude});
        }
        const myFail = (err) => {
            this.setState({errorMessage: err.message});
        }
        window.navigator.geolocation.getCurrentPosition(mySuccess, myFail);*/
    
    //helper function fro render
    renderContent(){
        //conditional rendering
          //{} because refernecing javascript variable in JSX
       /* return (
            <div> 
                Latitude: {this.state.lat}<br/>
                Error: {this.state.errorMessage}
            </div>
        );*/
        if(this.state.errorMessage && !this.state.lat){
            return <div> Error: {this.state.errorMessage}</div>;
        }
        if(!this.state.errorMessage && this.state.lat){
           // return <div> Latitude: {this.state.lat}</div>;
           return <SeasonDisplay lat={this.state.lat}/>
        }
        return <div> <Spinner message = "Please Accept location request"/></div>;
    }
    //react says we have to define render. render method gets called
    //a lot so shoulnd't do the get current positon   
    render(){ 
        //console.log(this.state);
        return(
            <div className ="border red">
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render(
   
    <App/>,
    document.querySelector('#root')
);