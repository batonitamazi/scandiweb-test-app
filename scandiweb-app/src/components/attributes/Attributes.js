import React, { Component } from 'react'




export class Attributes extends Component {
  render() {
    const { attributes, onAttributeSelect, activeAttributes, isCart, isSmall } = this.props;
    return attributes && attributes.map((attribute, index) => {
      return (
        <div className={isCart ? 'choice--container--cart' : 'choice--container'} key={index}>
          <h4 className='container--subtitle'>{attribute.name}:</h4>
          <div className={isCart ? 'choices--container--cart' : 'choices--container'}>
            {activeAttributes && attribute.items.map(({ value, id }) => {
              switch (attribute.id) {
                case "Color":
                  return (
                    <button
                      className={String(value) === String(activeAttributes[`${attribute.id}`]) ?
                        isSmall ? 'color--btn-small-active' : 'color--btn-active'
                        : isSmall ? 'color--btn-small' : 'color--btn'}
                      style={{ backgroundColor: `${value}` }}
                      onClick={onAttributeSelect ? () => onAttributeSelect(attribute.id, value) : null}
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
                          ? isSmall ? 'choice--btn-small-active' : 'choice--btn-active'
                          : isSmall ? 'choice--btn-small' : 'choice--btn'
                      }
                      onClick={onAttributeSelect ? () => onAttributeSelect(attribute.id, value) : null}
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

