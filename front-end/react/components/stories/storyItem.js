import React from 'react';
import { Component } from 'react';




export default class StoryItem extends Component {

    constructor(props)
    {
        super(props);

    }
    
    getComicsList()
    {
         let comics = [];
        let cc = 0;
        this.props.storyItem.comics.forEach(c => {
           comics.push(  <li className="comic-list-item" key={'comic_key_'+cc+"_"+this.props.storyItem.id}>
                 
                <span className='name'>{c.name} {this.props.storyItem.comics.length}</span>
            </li>)
            cc++;

        })
        
        return <ul className='creator-list-items'>{comics}</ul>
    }

    getCreatorList()
    {
        let creators = [];
        let cc = 0;
        this.props.storyItem.creators.forEach(c => {
           creators.push(  <li className="creator-list-item" key={'key_'+cc+"_"+this.props.storyItem.id}>
                <span className='role'>{c.role}:</span>
                <span className='name'>{c.name}</span>
            </li>)
            cc++;

        })
        
        return <ul className='creator-list-items'>{creators}</ul>
    }

    getDescription()
    {
        if (this.props.storyItem.description && this.props.storyItem.description.length > 0)
        {

            return (
                    <div className='story-description-block'>
                        
                        <div className='sub-head'>Description: </div> 
                        <div className='indent story-description'>{this.props.storyItem.description}</div>
                    </div>
                    )


        }

    }

    render()
    {
        return <div className='story-item'>
            <div className='story-title'>
                {this.props.storyItem.title}  
            </div>
            <div className='indent'>
                {this.getDescription()}   
                <div className='sub-head'>Creators</div>
                <div className='indent creator-list'>
                    {this.getCreatorList()}
                </div>
                <div className='sub-head'>Comics</div>
                 <div className='indent comics-list'>
                    {this.getComicsList()}
                </div>
            </div>
        </div>
    }

}