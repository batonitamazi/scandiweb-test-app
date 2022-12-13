import React, { Component } from 'react'


class ImageSlider extends Component {
    constructor() {
        super();
        this.state = { currentPicture: 0, }
    }
    nextPicture = () => {
        let currentIndex = this.state.currentPicture;
        currentIndex +=1;
        if(currentIndex === this.props.item.length){
            currentIndex = 0;
        }
        this.setState(
           () => ({currentPicture : currentIndex})
        )
    }
    previousPicture = () => {
        let currentIndex = this.state.currentPicture;
        currentIndex -=1;
        if(currentIndex === -1){
            currentIndex = this.props.item.length -1;
        }
        this.setState(
            () => ({currentPicture : currentIndex})
        )
    }
    render() {
        const { item } = this.props
        return (
            <>
                <img className="cart--item--image" src={item[this.state.currentPicture]} alt="mini product" />
                {item.length > 1 ? (
                    <div className='arrows--container'>
                        <div className='arrow--container' onClick={() => this.previousPicture()}>
                            <img src='./assets/arrow.svg' alt='arrow ' />
                        </div>
                        <div className='arrow--container' onClick={() => this.nextPicture()}>
                            <img src='./assets/arrow.svg' alt='arrow ' className='arrow-rotated'  />
                        </div>
                    </div>
                ) : null}
            </>
        )
    }
}

export default ImageSlider