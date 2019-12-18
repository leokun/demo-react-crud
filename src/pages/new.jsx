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
                this.setState({__desc: response.data})
            })
        if (this.props.match.params.hasOwnProperty) {
            axios.get('http://api.crud.react:8000/collaborator/' + this.props.match.params.id)
            .then((response) => {
                this.setState({...this.state, ...response.data})
                console.log(this.state)
                this.forceUpdate()
            })
        }
    }

    showInputs() {
        if (this.state.__desc != null) return this.state.__desc.map((item, index) => {
            console.log(this.state[item.name])
            return (
                <div className="field" key={index}>
                    <label className="label" htmlFor={item.name}>{item.name}</label>
                    <div className="control">
                        <input className="input"
                            name={item.name}
                            type={item.type}
                            placeholder={item.placeholder}
                            value={this.state[item.name]}
                            onChange={this.onChange}
                        />
                    </div>
                </div>
            )
        })
    }

    onChange = e => { this.setState({ [e.target.name]: e.target.value }) }

    onSubmit = (dispatch, e) => {
        e.preventDefault()
        const payload = this.state
        payload.id = Math.random()
        delete payload.__desc
        if (dispatch({type: 'CREATE_COLLABORATOR', payload: payload})) this.props.history.push('/collabs')
    }

    render() {
        return (
            <Consumer>
                {value => {
                    return <div className="container">
                        <h1 className="title">Créer un collaborateurs</h1>
                        <form className="column is-half" onSubmit={this.onSubmit.bind(this, value.dispatch)}>
                            {this.showInputs()}
                            <div className="field is-grouped">
                                <div className="control">
                                    <button className="button is-link">Valider</button>
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
