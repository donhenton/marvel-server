import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {topPosition, leftPosition} from './../../utils/DOMPositionUtils';


/**
 * simple infinite scroll
 * adapted from 
 * https://github.com/RealScout/redux-infinite-scroll 
 *  
 * Note that for this to work the css for 'infinite-scroll' must have a 
 * fixed height
 * 
 * PROPS:
 * 
 

    threshold:              this close to bottom or less then fire request for more

    hasMore:                keep the callbacks active, false means you're done
                            and the scroll listener will noop

    freezeWhileLoading:     set this to halt scroll listening 
                            while outside object gets stuff, then set it back

    loadMoreCallback:       function to call when you need more


    In a wrapping component, use this as below. The wrapping component contains
    the list of items to scroll, and the method that is loadMoreCallback above

     <SimpleInfiniteScroll containerHeight="200px"  
     hasMore={this.state.hasMore} 
     freezeWhileLoading={this.state.isLoading}  
     loadMore={this._loadMore.bind(this)} >

          {this.state.items}

     </SimpleInfiniteScroll>
 * 
 * 
 * 
 */
export default class SimpleInfiniteScroll extends React.Component {

    constructor(props) {
        super(props);
        this.scrollFunction = this.scrollListener.bind(this);
    }

    componentDidMount() {
        this.attachScrollListener();
    }

    componentDidUpdate() {
        this.attachScrollListener();
    }
    _findElement() {
        return  ReactDOM.findDOMNode(this);
    }

    attachScrollListener() {
        if (!this.props.hasMore || this.props.freezeWhileLoading)
            return;
        let el = this._findElement();
        el.addEventListener('scroll', this.scrollFunction, true);   
        el.addEventListener('resize', this.scrollFunction, true);
        this.scrollListener();
    }

    getBottomPosition() {
        let el = ReactDOM.findDOMNode(this);

        let topScrollPos = el.scrollTop;
        let totalContainerHeight = el.scrollHeight;
        let containerFixedHeight = el.offsetHeight;
        let bottomScrollPos = topScrollPos + containerFixedHeight;

        return (totalContainerHeight - bottomScrollPos);
    }

    scrollListener() {
        // This is to prevent the upcoming logic from toggling a load more before
        // any data has been passed to the component
        
        if (this.props.children.length <= 0)
            return;

        let bottomPosition = this.getBottomPosition();

        if (bottomPosition < Number(this.props.threshold)) {
            this.detachScrollListener();
            this.props.loadMoreCallback();
        }
    }

    detachScrollListener() {
        let el = this._findElement();
        el.removeEventListener('scroll', this.scrollFunction, true);
        el.removeEventListener('resize', this.scrollFunction, true);
    }

    componentWillUnmount() {
        this.detachScrollListener();
    }

    

    render()
    {
        return (
                <div className='infinite-scroll'>
                
                    {this.props.children}
                     
                </div>

                )
    }

}

SimpleInfiniteScroll.propTypes = {
    
    threshold:  PropTypes.number, 
    hasMore:  PropTypes.bool, 
    freezeWhileLoading:  PropTypes.bool, 
    loadMoreCallback:  PropTypes.func.isRequired  ,
    children:  PropTypes.array

}

SimpleInfiniteScroll.defaultProps = {

    
    threshold: 100,
    hasMore: true,
    freezeWhileLoading: false ,
    children: []

    }