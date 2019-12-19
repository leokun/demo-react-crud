import React, { Component } from 'react'

import { Consumer } from '../context'



const axios = require('axios').default 

export default class NewCollab extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.title= 'Créer un collaborateurs'
    }

    componentDidMount() {
        axios.get('http://api.crud.react:8000/collaborator/desc')
            .then((response) => {
                this.setState({__desc: response.data})
            })
        if (this.props.match.params.hasOwnProperty('id')) {
            axios.get('http://api.crud.react:8000/collaborator/' + this.props.match.params.id)
            .then((response) => {
                this.setState({...this.state, ...response.data})
                this.title = "Editer le collaborateurs"
                console.log(this.state);
                this.forceUpdate()
            })
        }
    }

    showInputs() {
        if (this.state.__desc != null) return this.state.__desc.map((item, index) => {
            //console.log(item);
            if (item['form-visible']!==false) return (
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
            return null
        })
    }

    onChange = e => { this.setState({ [e.target.name]: e.target.value }) }

    onClean = e => { 
        let newState = {}
        let dummy = {}
        if (this.state.__desc != null)  dummy = this.state.__desc.map((item, index) => {newState[item.name] = ''}) 
        this.setState(newState)
    }

    onSubmit = (dispatch, e) => {
        e.preventDefault()
        const payload = this.state
        let retourOk = false
        delete payload.__desc
        if(payload.hasOwnProperty('id')) {
            retourOk = dispatch({type: 'UPDATE_COLLABORATOR', payload: payload})
        }
        else {
            payload.id = this.appState.last_id + 1
            retourOk = dispatch({type: 'CREATE_COLLABORATOR', payload: payload})
        }
        if (retourOk)this.props.history.push('/collabs')
    }

    getButtonSecondary = (dispatch) => {
        if (this.props.match.params.hasOwnProperty('id')) {
            return <div className="control">
                <button type="reset" className="button is-link is-danger" onClick={this.onDelete.bind(this, dispatch)}>Supprimer</button>
            </div>
        }
        return <div className="control">
            <button type="button" className="button is-link is-ligh" onClick={this.onClean}>Effacer</button>
        </div>
}

    onDelete = (dispatch, e) => {
        if (dispatch({type: 'DELETE_COLLABORATOR', payload: this.props.match.params.id})) this.props.history.push('/collabs')
    }

    render() {
        return (
            <Consumer>
                {value => {
                    this.appState = value
                    return <div className="container">
                        <h1 className="title">{this.title}</h1>
                        <form className="column is-half" onSubmit={this.onSubmit.bind(this, value.dispatch)}>
                            {this.showInputs()}
                            <div className="field is-grouped">
                                <div className="control">
                                    <button type="submit" className="button is-link">Valider</button>
                                </div>
                                
                                {this.getButtonSecondary(value.dispatch)}
                            </div>
                        </form>
                    </div>
                }}
            </Consumer>
            
        )
    }
}
