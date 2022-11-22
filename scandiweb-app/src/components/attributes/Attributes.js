import React, { Component } from 'react'




export class Attributes extends Component {
  render() {
    const { attributes, onAttributeSelect, activeAttributes } = this.props;
    return attributes && attributes.map((attribute, index) => {
      return (
        <div className='choice--container' key={index}>
          <h4 className='container--subtitle'>{attribute.name}:</h4>
          <div className='choices--container'>
            {activeAttributes && attribute.items.map(({ value, id }) => {
              switch (attribute.id) {
                case "Color":
                  return (
                    <button
                      className={String(value)  === String(activeAttributes[`${attribute.id}`]) ? 'color--btn-active' :'color--btn'}
                      style={{ backgroundColor: `${value}`}}
                      onClick = {onAttributeSelect ?  () => onAttributeSelect(attribute.id, value) : null}
                      key={id}
                    >
                    </button>
                  )
                default:
                  return (
                    <button
                      key={id}
                      className={
                        String(value) === String(activeAttributes[`${attribute.id}`])
                        ? 'choice--btn-active'
                          : 'choice--btn'
                      }
                      onClick={onAttributeSelect ?  () => onAttributeSelect(attribute.id, value) : null}
                    >
                      {value}
                    </button>
                  )
              }
            })}
          </div>
        </div>
      )
    })
  }
}

export default Attributes

