import React, { Component } from "react"

const Context = React.createContext()
const axios = require('axios').default 


const reducer = (state, action) => {

    switch(action.type) {

        case 'GET_COLLABORATOR_DESC':

            axios.get('http://api.crud.react:8000/collaborator/desc')
            .then((response) => {
                this.setState({desc: response.data})
            })
            return []

        case 'GET_COLLABORATORS':

            axios.get('http://api.crud.react:8000/collaborators')
            .then((response) => {
                let max = 0
                response.data.forEach(collaborator => {
                    max = collaborator.id > max ? collaborator.id : max
                });

                this.setState({collaborators: response.data})
                return state

            })
            return []

        case 'CREATE_COLLABORATOR':

            axios.put('http://api.crud.react:8000/collaborator', action.payload)
            .then(() => {
                this.setState({last_id: this.state.last_id +1 })
                return true
            })
            return false

        case 'UPDATE_COLLABORATOR':

            axios.post('http://api.crud.react:8000/collaborator/' + action.payload.id, action.payload)
            .then(() => {
                return true
            })
            return false

        case 'DELETE_COLLABORATOR':

            axios.delete('http://api.crud.react:8000/collaborator/' + action.payload)
            .then(() => {
                return true
            })
            return false

        default:
            return state
    }

}


export class Provider extends Component {
    
    state = {

        collaborators: [],

        desc: null,

        last_id: 0,

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