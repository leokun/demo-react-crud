import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Page404 extends Component {
    render() {
        return (
            <div>
                Erreur : Page not found !
                <div>
                Essayez un des liens suivants<br/>
                <Link to='/collab'>/collab</Link><br />
                <Link to='/collabsSansTitle'>/collabsSansTitle</Link><br />
                <Link to='/collabs/new'>/collabs/new</Link>
                </div> 
            </div>
        )
    }
}
