import React, { Component } from "react"

const Context = React.createContext()


const reducer = (state, action) => {

    switch(action.type) {
        case 'CREATE_COLLABORATOR':
            return {
                collaborators: state.collaborators.append(action.payload)
            }
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