import React, { Component } from "react"

const Context = React.createContext()
const axios = require('axios').default 


const reducer = (state, action) => {

    switch(action.type) {
        case 'CREATE_COLLABORATOR':
            axios.put('http://api.crud.react:8000/collaborator', action.payload)
            .then((response) => {
                return true
            })

            return false
        case 'DELETE_COLLABORATOR':
            return {
                collaborators: state.collaborators.filter(collaborator => 
                    collaborator.id !== action.payload)
            }
        default:
            return state
    }

}


export class Provider extends Component {
    
    state = {

        collaborators: [],
        
        desc: null,

        dispatch: action => {
            this.setState(state => reducer(state, action))
        }

    }


    render() {
        return <Context.Provider value={this.state}>
            {this.props.children}
        </Context.Provider>
    }

}

export const Consumer = Context.Consumer