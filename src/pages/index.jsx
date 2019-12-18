import React, { Component } from 'react'

import { Consumer } from '../context'

const axios = require('axios').default 

export default class index extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        axios.get('http://api.crud.react:8000/collaborators')
            .then((response)=>{
                this.setState({collaborators: response.data})
                console.log(response.data)
            })
        axios.get('http://api.crud.react:8000/collaborator/desc')
            .then((response)=>{
                this.setState({desc: response.data})
            })
    }

    getHeaders() {
        if (this.state.desc != null) return <thead>
            <tr>
                {this.state.desc.map((elem,index)=> <th key={index}>{elem.title}</th>)}
            </tr>
        </thead>
        return <></>
    }

    getBody() {
        if (this.state.desc != null)return <tbody>
            {this.state.collaborators.map((collabo, index) => 
            <tr key={index} onClick={this.editCollabo.bind(this, collabo.id)}>
                {this.state.desc.map((elem)=> 
                    <td key={elem.name + "_" + index}>{collabo[elem.name]}</td>)}
            </tr>)}
        </tbody>
    }

    newPage = () => {
        this.props.history.push('/collabs/new')
    }

    editCollabo = (id, e) => {
        this.props.history.push('/collabs/edit/'+id)
    }
    render() {
        return (
            <Consumer>
                {value => {
                    return <div className="table-container">
                        <h1 className="title">Liste des collaborateurs</h1>
                        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                            {this.getHeaders()}
                            {this.getBody()}
                        </table>

                        <div className="control">
                            <button className="button is-link" onClick={this.newPage}>nouveau</button>
                        </div>
                    </div>
                }}
            </Consumer>
            
        )
    }
}
