import React, { Component } from 'react'




export class Attributes extends Component {
  render() {
    const {attributes, onAttributeSelect, selectedAttributes} = this.props;    
    console.log(selectedAttributes)
    
    return attributes && attributes.map((attribute, index) => {
      const isColorAttribute = (attribute.id === 'Color');
        return (
          <div className='choice--container' key={index}>
            <h4 className='container--subtitle'>{attribute.name}:</h4>
            <div className='choices--container'>
              {attribute.items.map(({value, id}) => {
                  const colorStyle = {
                    backgroundColor: `${value}`,
                    border: 'none',
                  };
                  const otherStyle = {
                    border: `1px solid ${value}`,
                    color: `${value}`,
                  };
                  return <button
                      key={id}
                      className="choice--btn"
                      style={isColorAttribute ?  colorStyle: otherStyle}
                      onClick = {() => onAttributeSelect(attribute.id, value)}
                    >
                      {isColorAttribute ? null : value}
                    </button>
              })}
            </div>
          </div>
        )
      })
  }
}

export default Attributes