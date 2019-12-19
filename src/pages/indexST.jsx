import React, { Component } from 'react'

import { Consumer } from '../context'

import index from './index'

export default class indexST extends index {

    getHeaders() {
        return <></>
    }

    //getBody() {
    //    if (this.state.desc != null)return <tbody>
    //        {this.state.collaborators.map((collabo, index) => 
    //        <tr key={index} onClick={this.editCollabo.bind(this, collabo.id)}>
    //            {this.state.desc.map((elem)=> 
    //                <td key={elem.name + "_" + index}>{collabo[elem.name]}</td>)}
    //        </tr>)}
    //    </tbody>
    //}

}
