import React, { Component } from 'react'

import { Consumer } from '../context'

const axios = require('axios').default 

export default class NewCollab extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        axios.get('http://api.crud.react:8000/collaborator/desc')
            .then((response) => {
                this.setState({desc: response.data})
            })
    }

    showInputs() {
        if (this.state.desc != null) return this.state.desc.map((item, index) => {

            return (
                <div className="field" key={index}>
                    <label className="label">{item.name}</label>
                    <div className="control">
                        <input className="input" type={item.type} placeholder={item.placeholder}  />
                    </div>
                </div>
            )
        })
    }

    createCollaborator(dispatch) {
        // Finir ici !!!
    }

    render() {
        return (
            <Consumer>
                {value => {
                    return <div className="container">
                        <h1 className="title">Créer un collaborateurs</h1>
                        <form className="column is-half">
                            {this.showInputs()}
                            <div className="field is-grouped">
                                <div className="control">
                                    <button className="button is-link" onClick={() => this.createCollaborator(value.dispatch)}>Valider</button>
                                </div>
                                <div className="control">
                                    <button className="button is-link is-light">Effacer</button>
                                </div>
                            </div>
                        </form>
                    </div>
                }}
            </Consumer>
            
        )
    }
}
